
// pages/api/checkout/pix.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createCustomer, createOrder, payWithPix } from '@/lib/appmax';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const { customer, items, shipping = 0, discount = 0 } = req.body as {
      customer: {
        firstname: string; lastname: string; email: string; telephone: string; document_number?: string;
        postcode?: string; address_street?: string; address_street_number?: string;
        address_street_complement?: string; address_street_district?: string;
        address_city?: string; address_state?: string; ip?: string;
      };
      items: Array<{ sku: string; name: string; qty: number; price?: number }>;
      shipping?: number; discount?: number;
    };

    if (!customer || !items?.length) return res.status(400).json({ ok: false, error: 'Dados insuficientes' });

    const c = await createCustomer({
      ...customer,
      products: items.map(it => ({ product_sku: it.sku, product_qty: it.qty })),
      tracking: { utm_source: 'site', utm_medium: 'checkout', utm_campaign: 'pix' },
    }) as any;
    const customer_id = c?.customer_id ?? c?.id ?? c?.data?.customer_id;

    const order = await createOrder({
      products: items.map(it => ({ sku: it.sku, name: it.name, qty: it.qty, ...(it.price ? { price: it.price } : {}) })),
      shipping, discount, customer_id,
    }) as any;
    const order_id = order?.order_id ?? order?.id;

    if (!order_id || !customer_id) throw new Error('Falha ao criar pedido ou cliente');

    const payment = await payWithPix({
      cart: { order_id },
      customer: { customer_id },
      payment: { pix: { document_number: customer.document_number || '00000000000' } },
    });

    res.status(200).json({ ok: true, order_id, customer_id, payment });
  } catch (e: any) {
    console.error('[checkout/pix] error', e);
    res.status(500).json({ ok: false, error: e.message });
  }
}
