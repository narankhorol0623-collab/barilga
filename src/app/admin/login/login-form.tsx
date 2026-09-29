'use client';
import { useActionState } from 'react';
import { loginAdmin } from '../actions';
export default function LoginForm() {
  const [error, action, pending] = useActionState(loginAdmin, '');
  return <form action={action} className="space-y-4">
    <label className="block text-sm">Имэйл<input name="email" type="email" autoComplete="username" required className="mt-2 min-h-12 w-full rounded-lg border border-slate-400/30 bg-transparent px-3" /></label>
    <label className="block text-sm">Нууц үг<input name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-12 w-full rounded-lg border border-slate-400/30 bg-transparent px-3" /></label>
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
    <button disabled={pending} className="min-h-12 w-full cursor-pointer rounded-lg bg-[#216aab] px-4 font-semibold text-white disabled:opacity-50">{pending ? 'Нэвтэрч байна…' : 'Нэвтрэх'}</button>
  </form>;
}
