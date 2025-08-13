
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
    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    const res = await fetch("/api/pix", {
      method:"POST",
      body: JSON.stringify({ ...payload, amount: totalNum })
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
            <p className="small">O QR expira em 30 minutos. Após a confirmação bancária, seu pedido será marcado como <strong>Pago</strong>.</p>
          </div>
        </div>
      )}
    </main>
  );
}
