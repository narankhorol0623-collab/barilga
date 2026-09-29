'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAdminToken, validateAdmin } from '@/lib/admin';
import { supabaseRequest } from '@/lib/supabase';

export async function loginAdmin(_previous: string, form: FormData) {
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  if (!email || !password || email.length > 254 || password.length > 1024) return 'Имэйл, нууц үгээ шалгана уу.';
  try {
    const response = await supabaseRequest('/auth/v1/token?grant_type=password', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }),
    });
    if (!response.ok) return 'Нэвтрэх боломжгүй. Имэйл, нууц үгээ шалгана уу.';
    const session = await response.json();
    if (!session.access_token || !await validateAdmin(session.access_token)) return 'Энэ хэрэглэгч админ эрхгүй байна.';
    (await cookies()).set('residence_admin', session.access_token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/admin',
      maxAge: Math.min(Number(session.expires_in) || 3600, 3600),
    });
  } catch { return 'Холболт амжилтгүй. Дахин оролдоно уу.'; }
  redirect('/admin');
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('residence_admin')?.value;
  cookieStore.set('residence_admin', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/admin', maxAge: 0 });
  if (token) await supabaseRequest('/auth/v1/logout', { method: 'POST' }, token).catch(() => null);
  redirect('/admin/login');
}

export async function markContacted(form: FormData) {
  let success = false;
  try {
    const token = await getAdminToken();
    const id = String(form.get('id') ?? '');
    if (token && /^[0-9a-f-]{36}$/i.test(id)) {
      const response = await supabaseRequest(`/rest/v1/residence_inquiries?id=eq.${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify({ status: 'contacted' }),
      }, token);
      success = response.ok && (await response.json()).length === 1;
    }
  } catch { /* Show a recoverable error without exposing the request or phone number. */ }
  revalidatePath('/admin');
  redirect(success ? '/admin' : '/admin?error=update');
}
