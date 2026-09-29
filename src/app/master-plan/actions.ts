'use server';

import { normalizePhone } from '@/lib/residence';
import { supabaseRequest } from '@/lib/supabase';

export type InquiryState = { success: boolean; message: string };

export async function submitInquiry(_previous: InquiryState, form: FormData): Promise<InquiryState> {
  const phone = normalizePhone(String(form.get('phone') ?? ''));
  const block = String(form.get('block') ?? '');
  const floor = Number(form.get('floor'));
  const layout = String(form.get('layout') ?? '');
  const unit = String(form.get('unit') ?? '') || null;
  if (!/^[0-9]{8}$/.test(phone)) return { success: false, message: 'Утасны 8 оронтой дугаараа оруулна уу.' };
  if (form.get('consent') !== 'on') return { success: false, message: 'Тантай утсаар холбогдох зөвшөөрлөө өгнө үү.' };
  if (block !== 'n7' || !Number.isInteger(floor) || floor < 3 || floor > 15 || !['A','B','C'].includes(layout) || (unit && unit.length > 30)) {
    return { success: false, message: 'Байрны сонголтоо дахин шалгана уу.' };
  }
  try {
    const response = await supabaseRequest('/rest/v1/rpc/submit_residence_inquiry', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_block: block, p_floor: floor, p_layout: layout, p_phone: phone, p_unit: unit }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return { success: false, message: error.message === 'too_many_requests'
        ? 'Өнөөдрийн хүсэлтийн хязгаарт хүрсэн байна. Маргааш дахин оролдоно уу.'
        : error.message === 'invalid_selection' ? 'Энэ байрны сонголт өөрчлөгдсөн байна. Хуудсаа шинэчилнэ үү.'
        : 'Хүсэлтийг хадгалж чадсангүй. Дахин оролдоно уу.' };
    }
    return { success: true, message: 'Хүсэлт хадгалагдлаа. Борлуулалтын ажилтан тантай холбогдоно.' };
  } catch {
    return { success: false, message: 'Холболт амжилтгүй боллоо. Дахин оролдоно уу.' };
  }
}
