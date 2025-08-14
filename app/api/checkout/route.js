// app/api/checkout/route.js
import { NextResponse } from "next/server";

/**
 * Espera receber no body:
 * {
 *   customer: { name, email, phone, document, street, number, complement, district, city, state, zipcode },
 *   items: [{ id, name, price, qty, image }],
 *   payment: { method: "pix" | "card" | "boleto", installments?: number },
 *   metadata?: { ... }
 * }
 */
export async function POST(req) {
  try {
    const body = await req.json();

    // 1) montar payload conforme sua configuração na Appmax
    const payload = {
      store_id: process.env.APPMAX_STORE_ID,
      customer: {
        name: body.customer?.name,
        email: body.customer?.email,
        phone: body.customer?.phone,
        document: body.customer?.document?.replace(/[^\d]/g, ""),
        address: {
          street: body.customer?.street,
          number: body.customer?.number,
          complement: body.customer?.complement || "",
          district: body.customer?.district,
          city: body.customer?.city,
          state: body.customer?.state,
          zipcode: body.customer?.zipcode?.replace(/[^\d]/g, ""),
        },
      },
      items: body.items.map((it) => ({
        // use os IDs e descrição dos seus produtos do lib/data.js
        code: it.id,
        name: it.name,
        unit_price: Math.round(Number(it.price) * 100), // centavos
        quantity: Number(it.qty || 1),
        picture: it.image || "",
      })),
      // defina o método que você quer habilitar agora (ex.: "pix")
      payment: {
        method: body.payment?.method || "pix",
        installments: body.payment?.installments || 1,
      },
      metadata: body.metadata || {},
      // URL para onde mandar o cliente depois (sucesso/erro)
      redirect_urls: {
        success: `${process.env.SITE_BASE_URL}/pedido/sucesso`,
        failure: `${process.env.SITE_BASE_URL}/pedido/erro`,
      },
      // URL do seu webhook que receberá atualizações
      webhook_url: `${process.env.SITE_BASE_URL}/api/appmax/webhook`,
    };

    // 2) chamar a API da Appmax (endpoint exato conforme docs do seu app)
    const res = await fetch(`${process.env.APPMAX_API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.APPMAX_API_TOKEN}`,
      },
      body: JSON.stringify(payload),
      // importante em Next 14 p/ não cachear
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: "APPMAX_ERROR", details: errText }, { status: 400 });
    }

    const data = await res.json();

    // A API normalmente retorna um identificador e/ou uma URL de checkout/autorização
    // Exemplos comuns: data.order_id, data.checkout_url, data.qr_code_url (no Pix), etc.
    return NextResponse.json({
      orderId: data.order_id || data.id,
      redirectUrl: data.checkout_url || null,
      pix: {
        qrCodeUrl: data.qr_code_url || null,
        copiaECola: data.qr_code || null,
        expiresAt: data.expires_at || null,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: "SERVER_ERROR", message: e.message }, { status: 500 });
  }
}
