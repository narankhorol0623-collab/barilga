import 'server-only';

export function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, '');
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)) {
    throw new Error('Supabase is not configured');
  }
  return { url, key };
}

export async function supabaseRequest(path: string, options: RequestInit = {}, token?: string) {
  const { url, key } = supabaseConfig();
  const headers = new Headers(options.headers);
  headers.set('apikey', key);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(`${url}${path}`, { ...options, headers, cache: 'no-store', signal: AbortSignal.timeout(10000) });
}
