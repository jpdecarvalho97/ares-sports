'use client'
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function ProductCard({ p }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    // usa o primeiro tamanho disponível (ajuste depois pra escolha do usuário)
    const size = p.sizes?.[0] || "M";
    cart.add(p.id, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="card">
      <div className="imgwrap">
        <img src={p.image} alt={p.name} loading="lazy" />
      </div>
      <div className="pad">
        <div className="kicker">LANÇAMENTO</div>
        <h3 style={{ margin: "6px 0" }}>{p.name}</h3>
        <div className="price">
          <div className="now">R$ {p.price.toFixed(2)}</div>
          {p.oldPrice && <div className="old">R$ {p.oldPrice.toFixed(2)}</div>}
        </div>

        <div className="actions">
          <Link href={`/p/${p.id}`} className="btn btn-dark">Ver detalhes</Link>
          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-red"
            aria-live="polite"
          >
            {added ? "Adicionado!" : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </div>
  );
}
