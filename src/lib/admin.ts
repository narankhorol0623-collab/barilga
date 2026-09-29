import 'server-only';
import { cookies } from 'next/headers';
import { supabaseRequest } from './supabase';

export async function validateAdmin(token: string) {
  const userResponse = await supabaseRequest('/auth/v1/user', {}, token);
  if (!userResponse.ok) return false;
  const user = await userResponse.json();
  if (typeof user.id !== 'string') return false;
  const membership = await supabaseRequest(`/rest/v1/catalog_admins?select=user_id&user_id=eq.${encodeURIComponent(user.id)}`, {}, token);
  if (!membership.ok) return false;
  const rows = await membership.json();
  return Array.isArray(rows) && rows.length === 1;
}

export async function getAdminToken() {
  const token = (await cookies()).get('residence_admin')?.value;
  if (!token) return null;
  return await validateAdmin(token) ? token : null;
}
