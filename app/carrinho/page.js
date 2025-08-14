'use client'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export const metadata = { title: "Carrinho | Ares Sports" };

export default function CarrinhoPage() {
  const cart = useCart();
  const items = cart.items;
  const total = cart.total();

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "24px 0" }}>
        <h1 style={{ marginBottom: 12 }}>Carrinho</h1>

        {items.length === 0 && (
          <p>Seu carrinho está vazio. <Link href="/" className="link">Continuar comprando</Link></p>
        )}

        {items.length > 0 && (
          <>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {items.map((it, idx) => (
                <li key={idx} style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid #eee", borderRadius: 8, padding: 10 }}>
                  <img src={it.image || "/img/placeholder.jpg"} alt={it.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{it.name || it.id}</div>
                    {it.size && <div className="small">Tamanho: {it.size}</div>}
                    <div className="small">Preço: R$ {(Number(it.price)||0).toFixed(2)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="btn" onClick={() => cart.dec(it.id, it.size)}>-</button>
                    <div style={{ minWidth: 24, textAlign: "center" }}>{it.qty}</div>
                    <button className="btn" onClick={() => cart.inc(it.id, it.size)}>+</button>
                  </div>
                  <button className="btn" onClick={() => cart.remove(it.id, it.size)}>Remover</button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Total: R$ {total.toFixed(2)}</strong>
              <Link href="/checkout" className="btn btn-red">Finalizar compra</Link>
            </div>

            <div style={{ marginTop: 10 }}>
              <button className="btn" onClick={cart.clear}>Limpar carrinho</button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
