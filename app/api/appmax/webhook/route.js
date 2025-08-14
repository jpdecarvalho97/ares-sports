// app/api/appmax/webhook/route.js
import { NextResponse } from "next/server";

/**
 * Appmax envia notificações de eventos (pedido/pagamento).
 * No painel, em Configurações → Apphooks, aponte para esta URL:
 *   https://SEU_DOMINIO/api/appmax/webhook
 * E selecione os eventos de Pedido/Pagamento que deseja receber.
 */
export async function POST(req) {
  try {
    // Se quiser validar assinatura/segredo, use os headers disponibilizados pela Appmax
    // const signature = req.headers.get("x-appmax-signature");

    const payload = await req.json();
    // Exemplos (veja o modelo de payload no painel e nos docs)
    const event = payload?.event; // ex.: "order.approved", "payment.authorized", etc.
    const orderId = payload?.order?.id || payload?.order_id;
    const status  = payload?.order?.status || payload?.status;

    // TODO: atualizar seu banco/pedido aqui:
    // await db.orders.update({ appmaxOrderId: orderId }, { status, lastEvent: event });

    // Se precisar acionar e-mail/WhatsApp/etc., faça aqui.

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
