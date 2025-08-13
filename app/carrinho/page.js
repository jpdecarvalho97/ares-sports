'use client'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/data";
import { CartProvider, useCart, hydrateCartFromQuery } from "@/lib/cart";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function CartInner(){
  const cart = useCart();
  const items = cart.items.map(line=>{
    const p = products.find(x=>x.id===line.id);
    return {...line, p};
  });
  const total = cart.total();

  return (
    <main className="container" style={{padding:"24px 0"}}>
      <h1>Carrinho</h1>
      {items.length===0? <p>Seu carrinho está vazio.</p> : (
        <div className="row row-2">
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tamanho</th>
                  <th>Qtd</th>
                  <th>Preço</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(it=>(
                  <tr key={`${it.id}|${it.size}`}>
                    <td>{it.p?.name}</td>
                    <td>{it.size}</td>
                    <td className="flex">
                      <button className="btn" onClick={()=>cart.dec(it.id, it.size)}>-</button>
                      <span>{it.qty}</span>
                      <button className="btn" onClick={()=>cart.inc(it.id, it.size)}>+</button>
                    </td>
                    <td>R$ {(it.p?.price*it.qty).toFixed(2)}</td>
                    <td><button className="btn alt" onClick={()=>cart.remove(it.id, it.size)}>Remover</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="space" style={{marginTop:16}}>
              <strong>Total</strong>
              <strong>R$ {total.toFixed(2)}</strong>
            </div>
          </div>
          <div>
            <div className="promo">Pagamento 100% por <strong>PIX</strong>. Clique para finalizar.</div>
            <a className="btn alt" href="/checkout">Finalizar com PIX</a>
          </div>
        </div>
      )}
    </main>
  )
}


export default function CartPage(){
  return (
    <CartProvider>
      <Header />
      <CartInner />
      <Footer />
    </CartProvider>
  )
}
