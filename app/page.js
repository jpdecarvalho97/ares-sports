import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { CartProvider } from "@/lib/cart";

const HERO = {
  badge: "Lançamentos oficiais",
  title: "Ares Sports — Camisas de Time",
  subtitle: "As melhores camisas nacionais e internacionais. Pague no PIX e receba em todo o Brasil.",
  pills: ["Frete grátis acima de R$ 199", "Atendimento no WhatsApp"],
  // Se depois quiser usar imagem de fundo, coloque o arquivo em /public/hero.jpg e troque bgImage para true
  bgImage: false
};

export default function Home(){
  return (
    <CartProvider>
      <Header />
      <section className={`hero ${HERO.bgImage ? "hero-bg" : ""}`}>
        <div className="container">
          <span className="badge">{HERO.badge}</span>
          <h1>{HERO.title}</h1>
          <p>{HERO.subtitle}</p>
          <div className="banner">
            {HERO.pills.map((t, i)=> <span key={i} className="pill">{t}</span>)}
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

