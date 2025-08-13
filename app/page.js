import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { CartProvider } from "@/lib/cart";

export default function Home(){
  return (
    <CartProvider>
      <Header />
      <section className="hero">
        <div className="container">
          <span className="badge">Compre 2 e leve 3</span>
          <h1>Ares Sports — Camisas de Time</h1>
          <p>Lançamentos, retrôs e seleções. Checkout rápido por <strong>PIX</strong>.</p>
          <div className="banner">
            <span className="pill">Frete Grátis na semana</span>
            <span className="pill">Troca Fácil</span>
            <span className="pill">Atendimento no WhatsApp</span>
          </div>
        </div>
      </section>
      <main className="container" style={{padding:"24px 0"}}>
        <div className="space" style={{marginBottom:12}}>
          <h2>Lançamentos</h2>
          <a href="/c/brasileiros" className="small">Ver todos</a>
        </div>
        <div className="grid">
          {products.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </main>
      <Footer />
    </CartProvider>
  )
}
