// app/teste-pix/page.js
'use client'

import { useState } from "react";

export default function TestePixPage(){
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [resp, setResp] = useState(null);

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true); setErr(""); setResp(null);
    const form = new FormData(e.currentTarget);
    const items = [{
      sku: "CAMISA-001",
      name: "Camisa Ares",
      qty: Number(form.get("qty") || 1),
      price: Number(form.get("price") || 99.9)
    }];
    const customer = {
      firstname: form.get("firstname") || "Cliente",
      lastname: form.get("lastname") || "Teste",
      email: form.get("email") || "teste@example.com",
      telephone: form.get("telephone") || "+55 11 99999-9999",
      document_number: form.get("document") || "00000000000",
      ip: "127.0.0.1"
    };
    try {
      const r = await fetch("/api/checkout/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, items, shipping: 0, discount: 0 })
      });
      const j = await r.json();
      if(!j.ok) throw new Error(j.error || "Falha ao gerar PIX");
      setResp(j);
    } catch(e){
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "system-ui"}}>
      <h1>Teste PIX (Appmax API)</h1>
      <p style={{opacity:.8}}>Use este formulário para gerar um pagamento PIX de teste via Appmax.</p>

      <form onSubmit={onSubmit} style={{display:"grid", gap:12, marginTop:16}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          <input name="firstname" placeholder="Nome" defaultValue="João" required />
          <input name="lastname" placeholder="Sobrenome" defaultValue="Cliente" required />
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          <input name="email" placeholder="Email" defaultValue="teste@example.com" required />
          <input name="telephone" placeholder="Telefone" defaultValue="+55 11 99999-9999" required />
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          <input name="document" placeholder="CPF/CNPJ (apenas números)" defaultValue="00000000000" required />
          <input name="price" type="number" step="0.01" placeholder="Preço" defaultValue="99.90" required />
        </div>
        <div>
          <input name="qty" type="number" min="1" defaultValue="1" /> Qtde
        </div>
        <button disabled={loading} type="submit">{loading ? "Gerando..." : "Gerar PIX"}</button>
      </form>

      {err && <p style={{color:"crimson"}}>Erro: {err}</p>}

      {resp?.pix && (
        <section style={{marginTop:24, display:"grid", gap:12}}>
          <h2>PIX gerado</h2>
          {resp.pix.qrImage && (
            <img src={resp.pix.qrImage} alt="QR PIX" style={{width:220, height:220, objectFit:"contain", border:"1px solid #eee"}}/>
          )}
          {resp.pix.copiaECola && (
            <div>
              <label>Copia e Cola:</label>
              <textarea readOnly value={resp.pix.copiaECola} style={{width:"100%", height:120}}/>
            </div>
          )}
          <details>
            <summary>Ver resposta completa</summary>
            <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(resp, null, 2)}</pre>
          </details>
        </section>
      )}
    </main>
  )
}
