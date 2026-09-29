import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const nodeRequire = createRequire(import.meta.url);
function load(file, dependencies = {}) {
  const source = ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(source, { exports, require: name => name in dependencies ? dependencies[name] : nodeRequire(name), console, process, fetch, AbortSignal, URL }, { filename: file });
  return exports;
}
const residence = load('src/lib/residence.ts');
assert.equal(residence.normalizePhone('+976 9911-2233'), '99112233');
assert.equal(residence.normalizePhone('9911223'), '9911223');
let calls = [];
let reply = () => Response.json('request-id');
const actions = load('src/app/master-plan/actions.ts', {
  '@/lib/residence': residence,
  '@/lib/supabase': { supabaseRequest: async (...args) => { calls.push(args); return reply(); } },
});
const state = { success: false, message: '' };
function form(overrides = {}) {
  const f = new FormData();
  for (const [k, v] of Object.entries({ phone: '+976 9911-2233', consent: 'on', block: 'n7', floor: '3', layout: 'B', ...overrides })) f.set(k, v);
  return f;
}
for (const bad of [{ phone: '123' }, { consent: '' }, { block: 'n1' }, { floor: '2' }, { floor: '3.5' }, { floor: '16' }, { layout: 'X' }, { unit: 'x'.repeat(31) }]) {
  assert.equal((await actions.submitInquiry(state, form(bad))).success, false);
}
assert.equal(calls.length, 0, 'Invalid inputs never reach Supabase');
assert.equal((await actions.submitInquiry(state, form({unit: '301'}))).success, true);
assert.deepEqual(JSON.parse(calls[0][1].body), { p_block: 'n7', p_floor: 3, p_layout: 'B', p_phone: '99112233', p_unit: '301' });
assert.equal((await actions.submitInquiry(state, form())).success, true);
assert.equal(JSON.parse(calls[1][1].body).p_unit, null);
reply = () => Response.json({message:'too_many_requests'}, {status:400});
assert.match((await actions.submitInquiry(state, form())).message, /хязгаарт/);
reply = () => Response.json({message:'invalid_selection'}, {status:400});
assert.match((await actions.submitInquiry(state, form())).message, /өөрчлөгдсөн/);
reply = () => { throw new Error('network'); };
assert.equal((await actions.submitInquiry(state, form())).success, false);

let authReply = [Response.json({id:'staff'}), Response.json([{user_id:'staff'}])];
const admin = load('src/lib/admin.ts', {
  'server-only': {}, 'next/headers': { cookies: async () => ({get:()=>undefined}) },
  './supabase': {supabaseRequest: async () => authReply.shift()},
});
assert.equal(await admin.validateAdmin('token'), true);
authReply = [Response.json({id:'visitor'}), Response.json([])];
assert.equal(await admin.validateAdmin('token'), false);
authReply = [Response.json({}, {status:401})];
assert.equal(await admin.validateAdmin('expired'), false);
assert.equal(await admin.getAdminToken(), null);
console.log('Passed: phone validation, tampered selections, exact unit/layout payloads, write failures, admin membership and expired sessions.');
