'use client'
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/lib/data";

const ALL_SIZES = ["P", "M", "G", "GG", "XG", "XGG"];

export default function ProductPage({ params }) {
  const product = products.find(p => p.id === params.id);
  const cart = useCart();
  const [size, setSize] = useState("");

  if (!product) {
    return (
      <>
        <Header />
        <main className="container" style={{ padding: "24px 0" }}>
          <h1>Produto não encontrado</h1>
          <p>Voltar para a <a className="link" href="/">página inicial</a>.</p>
        </main>
        <Footer />
      </>
    );
  }

  const availableSizes = product.sizes?.length ? product.sizes : ALL_SIZES;
  const addDisabled = !size;

  function handleAdd() {
    if (!size) return;
    cart.add(product.id, size);
    alert(`Adicionado: ${product.name} - Tam. ${size}`);
  }

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "24px 0" }}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 420px", maxWidth: 520, width: "100%" }}>
            <div className="prod-figure">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 280 }}>
            <h1 style={{ marginBottom: 8 }}>{product.name}</h1>
            <div className="price" style={{ marginBottom: 16 }}>
              <div className="now">R$ {product.price.toFixed(2)}</div>
              {product.oldPrice && <div className="old">R$ {product.oldPrice.toFixed(2)}</div>}
            </div>

            <div className="size-group" role="group" aria-label="Escolha o tamanho">
              <div className="size-label">Tamanho</div>
              <div className="size-grid">
                {availableSizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`size-chip ${size === s ? 'on' : ''}`}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="btn btn-red"
              disabled={addDisabled}
              style={{ marginTop: 16, opacity: addDisabled ? .6 : 1, cursor: addDisabled ? 'not-allowed' : 'pointer' }}
            >
              {addDisabled ? "Escolha um tamanho" : "Adicionar ao carrinho"}
            </button>

            {product.description && (
              <p style={{ marginTop: 18, opacity: .9 }}>{product.description}</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
