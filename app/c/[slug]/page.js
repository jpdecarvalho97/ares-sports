import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductCard from "../../../components/ProductCard";
import { products } from "../../../lib/data";

export default function CategoryPage({ params }){
  const items = products.filter(p=>p.category===params.slug);
  return (
    <>
      <Header />
      <main className="container" style={{padding:"24px 0"}}>
        <h1 style={{marginBottom:16, textTransform:"capitalize"}}>{params.slug}</h1>
        <div className="grid">
          {items.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </main>
      <Footer />
    </>
  )
}
