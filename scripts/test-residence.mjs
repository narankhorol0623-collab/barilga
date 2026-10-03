import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const nodeRequire = createRequire(import.meta.url);
function load(file, dependencies = {}) {
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(
    source,
    {
      exports,
      require: (name) => name in dependencies ? dependencies[name] : nodeRequire(name),
      console: { log: console.log, warn: console.warn, error: () => {} },
      process,
      fetch,
      AbortSignal,
      URL,
      Response,
    },
    { filename: file },
  );
  return exports;
}

const phones = load("src/app/admin/lib/phones.ts");
assert.equal(phones.normalizePhone("+976 9911-2233"), "99112233");
assert.equal(phones.normalizePhone("88112233"), "88112233");
assert.equal(phones.normalizePhone("12345678"), null);

let calls = [];
let rpcReply = () => Response.json("request-id");
const route = load("src/app/admin/api/submit-phonenumber/route.ts", {
  "@/app/admin/lib/phones": phones,
  "@/lib/supabase": {
    supabaseRequest: async (...args) => {
      calls.push(args);
      return rpcReply();
    },
  },
});
async function submit(body) {
  return route.POST({ json: async () => body });
}

for (const invalid of [
  { phone: "123", consent: true },
  { phone: "99112233", consent: false },
  { phone: "99112233", consent: true, block: "n1", floor: 3, layout: "B" },
  { phone: "99112233", consent: true, block: "n7", floor: 2, layout: "B" },
  { phone: "99112233", consent: true, block: "n7", floor: 3.5, layout: "B" },
  { phone: "99112233", consent: true, block: "n7", floor: 16, layout: "B" },
  { phone: "99112233", consent: true, block: "n7", floor: 3, layout: "X" },
  { phone: "99112233", consent: true, block: "n7", floor: 3, layout: "B", unit: "x".repeat(31) },
]) {
  const response = await submit(invalid);
  assert.equal(response.status, 400);
}
assert.equal(calls.length, 0, "Invalid submissions never reach Supabase");

let response = await submit({ phone: "+976 9911-2233", consent: true });
assert.equal(response.status, 201);
assert.equal(calls[0][0], "/rest/v1/rpc/submit_contact_inquiry");
assert.deepEqual(JSON.parse(calls[0][1].body), { p_phone: "99112233" });

response = await submit({
  phone: "99112233",
  consent: true,
  block: "n7",
  floor: 3,
  layout: "B",
  unit: "301",
});
assert.equal(response.status, 201);
assert.equal(calls[1][0], "/rest/v1/rpc/submit_residence_inquiry");
assert.deepEqual(JSON.parse(calls[1][1].body), {
  p_block: "n7",
  p_floor: 3,
  p_layout: "B",
  p_phone: "99112233",
  p_unit: "301",
});

rpcReply = () => Response.json({ message: "too_many_requests" }, { status: 400 });
response = await submit({ phone: "99112233", consent: true });
assert.equal(response.status, 400);
assert.match((await response.json()).error, /хязгаарт/);

rpcReply = () => Response.json({ message: "invalid_selection" }, { status: 400 });
response = await submit({ phone: "99112233", consent: true, block: "n7", floor: 3, layout: "B" });
assert.match((await response.json()).error, /өөрчлөгдсөн/);

rpcReply = () => { throw new Error("network"); };
response = await submit({ phone: "99112233", consent: true });
assert.equal(response.status, 500);

let authReply = [Response.json({ id: "staff" }), Response.json([{ user_id: "staff" }])];
const admin = load("src/lib/admin.ts", {
  "server-only": {},
  "next/headers": { cookies: async () => ({ get: () => undefined }) },
  "./supabase": { supabaseRequest: async () => authReply.shift() },
});
assert.equal(await admin.validateAdmin("token"), true);
authReply = [Response.json({ id: "visitor" }), Response.json([])];
assert.equal(await admin.validateAdmin("token"), false);
authReply = [Response.json({}, { status: 401 })];
assert.equal(await admin.validateAdmin("expired"), false);
assert.equal(await admin.getAdminToken(), null);

console.log("Passed: phone validation, consent, contact and residence RPCs, tampered selections, rate limits, database failures, admin membership and expired sessions.");
