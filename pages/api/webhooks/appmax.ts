
// pages/api/webhooks/appmax.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: { bodyParser: { sizeLimit: '1mb' } },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const evt = req.body;
    const event = (evt?.event || evt?.type || '').toString();

    if (!event) {
      return res.status(400).json({ received: false, error: 'Evento ausente' });
    }

    if (event === 'OrderApproved') {
      const data = evt.data || evt;
      const orderId = data.id || data.order_id;
      const paidAt = data.paid_at || data.order_paid_at;
      const paymentType = data.payment_type || data.order_payment_type;

      console.log('[Webhook] OrderApproved', { orderId, paidAt, paymentType });
      // TODO: atualizar banco/status do pedido
    }

    res.status(200).json({ received: true });
  } catch (e: any) {
    console.error('[webhooks/appmax] error', e);
    res.status(400).json({ error: e.message });
  }
}
