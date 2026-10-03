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
      jsx: ts.JsxEmit.ReactJSX,
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
assert.equal(await admin.getUserToken(), null);

let loginReply = Response.json({ access_token: "registered-user-token", expires_in: 3600 });
let authorized = true;
const login = load("src/app/admin/api/login/route.ts", {
  "next/server": {
    NextResponse: {
      json: (body, options) => {
        const response = Response.json(body, options);
        response.cookies = { set: (name, value) => response.headers.set("Set-Cookie", `${name}=${value}`) };
        return response;
      },
    },
  },
  "@/lib/supabase": { supabaseRequest: async () => loginReply.clone() },
  "@/lib/admin": { validateAdmin: async () => authorized },
});
let response;
const signIn = (body) => login.POST({ json: async () => body });
response = await signIn({ email: "registered@example.com", password: "correct-password" });
assert.equal(response.status, 200);
assert.match(response.headers.get("Set-Cookie"), /registered-user-token/);
authorized = false;
response = await signIn({ email: "registered@example.com", password: "correct-password" });
assert.equal(response.status, 403);
assert.equal(response.headers.get("Set-Cookie"), null);
loginReply = Response.json({ error: "invalid_credentials" }, { status: 400 });
response = await signIn({ email: "registered@example.com", password: "wrong-password" });
assert.equal(response.status, 401);
assert.equal(response.headers.get("Set-Cookie"), null);
response = await signIn({ email: "registered@example.com", password: "" });
assert.equal(response.status, 400);

let pageToken = null;
let authUnavailable = false;
const dashboard = () => null;
const page = load("src/app/admin/page.tsx", {
  "next/navigation": { redirect: (path) => { throw new Error(`redirect:${path}`); } },
  "@/lib/admin": { getAdminToken: async () => {
    if (authUnavailable) throw new Error("unavailable");
    return pageToken;
  } },
  "./DashboardPage": { default: dashboard },
});
await assert.rejects(page.default(), /redirect:\/admin\/login/);
authUnavailable = true;
await assert.rejects(page.default(), /redirect:\/admin\/login/);
authUnavailable = false;
pageToken = "admin-token";
assert.equal((await page.default()).type, dashboard);

for (const [name, method] of [
  ["create-apartment", "POST"], ["update-apartment", "PATCH"],
  ["delete-apartment", "DELETE"], ["get-apartments", "GET"], ["get-apartment", "GET"],
]) {
  const apartments = [];
  const apartmentModule = { apartments, nextId: () => "new-id" };
  const route = load(`src/app/admin/api/${name}/route.ts`, {
    "next/server": { NextResponse: { json: Response.json } },
    "@/lib/admin": { getAdminToken: async () => null },
    "@/app/admin/lib/apartments": apartmentModule,
    "../../lib/apartments": apartmentModule,
  });
  const reply = await route[method]({
    get url() { throw new Error("Unauthorized request must not be processed"); },
    json: () => { throw new Error("Unauthorized request must not be processed"); },
  });
  assert.equal(reply.status, 401, name);
  assert.equal(apartments.length, 0);
}

console.log("Passed: admin login, unauthorized login, invalid credentials, expired sessions, dashboard redirects and apartment API guards.");
