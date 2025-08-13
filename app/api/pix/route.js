// app/api/pix/route.js
export async function POST(req) {
  try {
    const body = await req.json();
    const amount = Number(body.amount || 0);

    // Dados do pagador (do seu checkout)
    const nome = String(body.nome || "");
    const cpf = String(body.cpf || "").replace(/\D/g, "");
    const email = String(body.email || "");
    const telefone = String(body.telefone || "");

    // Validações simples (melhore conforme sua regra)
    if (!amount || amount <= 0) {
      return Response.json({ error: "Valor inválido." }, { status: 400 });
    }
    if (!nome || !cpf || !email) {
      return Response.json({ error: "Preencha nome, CPF e e-mail." }, { status: 400 });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return Response.json({ error: "MP_ACCESS_TOKEN não configurado." }, { status: 500 });
    }

    const notificationUrl =
      process.env.MP_NOTIFICATION_URL || `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mercadopago`;

    // Cria pagamento PIX no Mercado Pago
    // Doc: retorna qr_code e qr_code_base64 em point_of_interaction.transaction_data
    // Exige payment_method_id: "pix"
    const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transaction_amount: Number(amount.toFixed(2)),
        description: "Pedido Ares Sports",
        payment_method_id: "pix",
        notification_url: notificationUrl,
        external_reference: `ares_${Date.now()}`, // ID do seu pedido
        payer: {
          email,
          first_name: nome, // opcional separar sobrenome
          identification: {
            type: "CPF",
            number: cpf
          }
        }
      })
    });

    const data = await mpRes.json();
    if (!mpRes.ok) {
      console.error("Mercado Pago error:", data);
      return Response.json({ error: "Falha ao criar PIX.", detail: data }, { status: 400 });
    }

    const tx = data?.point_of_interaction?.transaction_data || {};
    const qr_code = tx.qr_code || "";
    const qr_code_base64 = tx.qr_code_base64 || "";

    if (!qr_code || !qr_code_base64) {
      return Response.json({ error: "Não retornou QR do PSP.", detail: data }, { status: 400 });
    }

    // Retorna para o frontend exibir
    return Response.json({
      qr_code,
      qr_code_base64,
      txid: data.id,          // id do payment no MP
      amount: amount.toFixed(2),
      status: data.status
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Erro inesperado." }, { status: 500 });
  }
}
