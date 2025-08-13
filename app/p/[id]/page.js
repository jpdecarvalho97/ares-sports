'use client'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SIZES = ["P","M","G","GG","XG","XGG"];

export default function ProductPage({ params }){
  const p = products.find(x=>x.id===params.id);
  const cart = useCart();
  const router = useRouter();
  const [size, setSize] = useState("");

  if(!p) return <div>Produto não encontrado.</div>;

  function addToCart(){
    if(!size){ alert("Escolha um tamanho."); return; }
    cart.add(p.id, size);
  }
  function buyNow(){
    if(!size){ alert("Escolha um tamanho."); return; }
    cart.add(p.id, size);
    router.push("/carrinho");
  }

  return (
    <>
      <Header />
      <main className="container" style={{padding:"24px 0"}}>
        <div className="row row-2">
          <div>
            <img src={p.image} alt={p.name} style={{width:"100%", borderRadius:12, border:"1px solid #eee"}}/>
          </div>
          <div>
            <div className="kicker">Lançamento</div>
            <h1>{p.name}</h1>
            <div className="price" style={{margin:"8px 0 16px"}}>
              <div className="now">R$ {p.price.toFixed(2)}</div>
              {p.oldPrice && <div className="old">R$ {p.oldPrice.toFixed(2)}</div>}
            </div>

            {/* Seletor de tamanho */}
            <div style={{margin:"12px 0"}}>
              <div className="small" style={{marginBottom:6}}>Tamanho</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                {SIZES.map(s=>(
                  <button
                    key={s}
                    type="button"
                    onClick={()=>setSize(s)}
                    className="btn"
                    style={{
                      background: size===s ? "var(--red)" : "#fff",
                      color: size===s ? "#fff" : "var(--black)",
                      border: "2px solid var(--black)"
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {size==="" && <div className="small" style={{color:"#c00", marginTop:6}}>Selecione um tamanho.</div>}
            </div>

            <div style={{display:"flex", gap:8, marginTop:10}}>
              <button className="btn" onClick={addToCart}>Adicionar ao carrinho</button>
              <button className="btn alt" onClick={buyNow}>Comprar agora</button>
            </div>

            <div style={{ marginTop: 16 }}>
              <a className="btn gray" href="/guia-de-medidas">📏 Guia de medidas</a>
            </div>

            <div style={{marginTop:24}}>
              <h3>Descrição</h3>
              <p>Camisa de alta qualidade, tecido respirável e escudo bordado.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
