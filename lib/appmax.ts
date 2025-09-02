
// lib/appmax.ts
export const APPMAX_BASE = process.env.APPMAX_BASE!;
const ACCESS_TOKEN = process.env.APPMAX_ACCESS_TOKEN!;

if (!APPMAX_BASE || !ACCESS_TOKEN) {
  console.warn('[Appmax] Variáveis de ambiente ausentes. Verifique .env.local');
}

export async function appmaxPost<T>(path: string, body: Record<string, any>): Promise<T> {
  const res = await fetch(`${APPMAX_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'access-token': ACCESS_TOKEN, ...body }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Appmax ${path} ${res.status}: ${txt}`);
  }
  return res.json() as Promise<T>;
}

export const createCustomer = (payload: any) => appmaxPost('/customer', payload);
export const createOrder    = (payload: any) => appmaxPost('/order', payload);
export const payWithPix     = (payload: any) => appmaxPost('/payment/pix', payload);
