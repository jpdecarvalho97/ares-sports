// app/api/checkout/pix/route.js
import { NextResponse } from "next/server";
import { createCustomer, createOrder, payWithPix } from "@/lib/appmax";

export async function POST(req) {
  try {
    const { customer, items, shipping = 0, discount = 0 } = await req.json();

    if (!customer || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ ok: false, error: "Dados insuficientes: customer e items são obrigatórios." }, { status: 400 });
    }

    // 1) Cliente -> customer_id
    const c = await createCustomer({
      ...customer,
      products: items.map(it => ({ product_sku: it.sku, product_qty: it.qty })),
      tracking: { utm_source: "site", utm_medium: "checkout", utm_campaign: "pix" }
    });
    const customer_id = c?.customer_id ?? c?.id ?? c?.data?.customer_id;
    if (!customer_id) throw new Error("Falha ao criar/obter customer_id");

    // 2) Pedido -> order_id
    const order = await createOrder({
      products: items.map(it => ({
        sku: it.sku, name: it.name, qty: it.qty, ...(it.price ? { price: it.price } : {})
      })),
      shipping, discount, customer_id
    });
    const order_id = order?.order_id ?? order?.id;
    if (!order_id) throw new Error("Falha ao criar/obter order_id");

    // 3) PIX
    const payment = await payWithPix({
      cart: { order_id },
      customer: { customer_id },
      payment: { pix: { document_number: customer.document_number || customer.cpf || "00000000000" } }
    });

    // Tentar padronizar campos comuns para o front
    const p = payment || {};
    const copiaECola = p.pix_payload || p?.pix?.payload || p.copy_paste || p?.qrCode?.emv || p?.qr_code || "";
    const qrBase64   = p.qr_image_base64 || p?.qrCode?.image || p?.qr_code_base64 || "";
    const qrImage    = (qrBase64 && !qrBase64.startsWith("data:image")) ? `data:image/png;base64,${qrBase64}` : qrBase64;

    return NextResponse.json({
      ok: true,
      order_id,
      customer_id,
      pix: {
        copiaECola,
        qrImage
      },
      raw: payment
    });
  } catch (e) {
    console.error("[/api/checkout/pix] error", e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
