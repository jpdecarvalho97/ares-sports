'use client'
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/data";

export default function ProductPage({ params }) {
  const product = products.find(p => p.id === params.id);
  const cart = useCart();
  const [size, setSize] = useState("");

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  function handleAdd() {
    if (!size) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
      return;
    }
    cart.add(product.id, size);
    alert("Produto adicionado ao carrinho!");
  }

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "24px 0" }}>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: "400px", width: "100%" }} />
          <div style={{ flex: 1 }}>
            <h1>{product.name}</h1>
            <p>R$ {product.price.toFixed(2)}</p>

            <label htmlFor="size">Tamanho:</label>
            <select
              id="size"
              value={size}
              onChange={e => setSize(e.target.value)}
              style={{ display: "block", marginBottom: "12px", padding: "8px" }}
            >
              <option value="">Selecione</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
              <option value="XG">XG</option>
              <option value="XGG">XGG</option>
            </select>

            <button onClick={handleAdd} className="btn btn-red">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
