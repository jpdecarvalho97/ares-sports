'use client'

import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function CheckoutClient(){
  const cart = useCart();
  const [step, setStep] = useState("form");
  const [pix, setPix] = useState(null);

  const totalNum = cart?.total?.() || 0;
  const total = totalNum.toFixed(2);

  
  async function gerarPix(e){
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Customer from form
    const customer = {
      firstname: (data.get("nome") || "").toString().split(" ")[0] || "Cliente",
      lastname:  (data.get("nome") || "").toString().split(" ").slice(1).join(" ") || "Ares",
      email:     (data.get("email") || "").toString(),
      telephone: (data.get("telefone") || "").toString(),
      document_number: (data.get("cpf") || "").toString().replace(/\D/g, ""),
      address_city: (data.get("cidade") || "").toString(),
      address_state: (data.get("uf") || "").toString(),
      postcode: (data.get("cep") || "").toString(),
      address_street: (data.get("rua") || "").toString(),
      address_street_number: (data.get("numero") || "").toString(),
      address_street_complement: (data.get("complemento") || "").toString(),
      address_street_district: (data.get("bairro") || "").toString(),
      ip: "127.0.0.1"
    };

    // Items from cart
    const items = (cart?.items || []).map(it => ({
      sku: it.id,
      name: it.name || it.id,
      qty: Number(it.qty || 1),
      price: Number(it.price || 0)
    }));

    if (!items.length) {
      alert("Seu carrinho está vazio.");
      return;
    }

    try{
      const res = await fetch("/api/checkout/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, items, shipping: 0, discount: 0 })
      });
      const j = await res.json();
      if(!j.ok) throw new Error(j.error || "Falha ao gerar PIX");

      // Adapt response to current UI fields
      const copia = j?.pix?.copiaECola || "";
      const qrImg = j?.pix?.qrImage || "";

      setPix({
        qr_code: copia,
        qr_code_base64: qrImg
      });
      setStep("pix");
    }catch(err){
      console.error(err);
      alert(err.message || "Erro ao gerar PIX");
    }
  }

)
    });
    const out = await res.json();
    setPix(out);
    setStep("pix");
  }

  return (
    <main className="container" style={{padding:"24px 0"}}>
      <h1>Checkout</h1>

      {step==="form" && (
        <form onSubmit={gerarPix} className="row row-3" style={{marginTop:12}}>
          <div>
            <h3>Dados Pessoais</h3>
            <input className="input" required name="nome" placeholder="Nome completo"/>
            <input className="input" required name="cpf" placeholder="CPF" />
            <input className="input" required type="email" name="email" placeholder="E-mail"/>
            <input className="input" required name="telefone" placeholder="Telefone/WhatsApp"/>
          </div>
          <div>
            <h3>Endereço</h3>
            <input className="input" required name="cep" placeholder="CEP"/>
            <input className="input" required name="rua" placeholder="Rua"/>
            <div className="row row-2">
              <input className="input" required name="numero" placeholder="Número"/>
              <input className="input" name="complemento" placeholder="Complemento"/>
            </div>
            <div className="row row-2">
              <input className="input" required name="bairro" placeholder="Bairro"/>
              <input className="input" required name="cidade" placeholder="Cidade"/>
            </div>
            <input className="input" required name="uf" placeholder="UF"/>
          </div>
          <div>
            <h3>Resumo</h3>
            <p>Total: <strong>R$ {total}</strong></p>
            <button className="btn alt" type="submit">Gerar QR Code Pix</button>
            <p className="small" style={{marginTop:8}}>Seus dados são usados apenas para faturamento e entrega (LGPD).</p>
          </div>
        </form>
      )}

      {step==="pix" && pix && (
        <div className="row row-2" style={{marginTop:12}}>
          <div>
            <h3>Escaneie o QR Code</h3>
            <img className="qr" src={pix.qr_code_base64 || pix.qr_code_image} alt="QR Code PIX"/>
          </div>
          <div>
            <h3>Ou use o copia e cola</h3>
            <textarea className="input" rows={6} defaultValue={pix.qr_code} readOnly />
            <div style={{display:"flex", gap:8, marginTop:8}}>
              <button className="btn" onClick={()=>navigator.clipboard.writeText(pix.qr_code)}>Copiar código</button>
              <a className="btn alt" href="/pedido-confirmado">Já paguei</a>
            </div>
            <p className="small">O QR expira em 30 minutos…</p>
          </div>
        </div>
      )}
    </main>
  );
}
async function pagarComAppmax(order) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order), // { customer, items, payment: { method: "pix" } }
  });
  const data = await res.json();

  if (data.redirectUrl) {
    window.location.href = data.redirectUrl; // cartão/checkout hospedado
    return;
  }
  if (data.pix?.qrCodeUrl || data.pix?.copiaECola) {
    // mostre o QR code/“copia e cola” na tela
    setPixData(data.pix);
    return;
  }
  alert("Não foi possível iniciar o pagamento.");
}
