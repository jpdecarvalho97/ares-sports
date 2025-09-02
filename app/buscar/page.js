import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/data";

function norm(s=""){
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
}

export const metadata = {
  title: "Buscar | Ares Sports",
  description: "Procure camisas por time, modelo ou temporada.",
};

export default function BuscarPage({ searchParams }){
  const qRaw = searchParams?.q ?? "";
  const q = norm(qRaw);
  const results = q
    ? products.filter(p =>
        norm(p.name).includes(q) ||
        norm(p.id).includes(q) ||
        norm(p.category||"").includes(q)
      )
    : [];

  return (
    <>
      <Header />
      <main className="container search-page" style={{padding:"24px 0"}}>
        <h1 className="search-title">Resultados da busca</h1>

        <form action="/buscar" method="get" className="search" style={{margin:"10px 0 20px", maxWidth:520}}>
          <input className="input" type="search" name="q"
                 placeholder="Ex.: Milan 24/25, Real Madrid, Brasil..."
                 defaultValue={qRaw}/>
          <button className="btn" type="submit">Buscar</button>
        </form>

        {!q && <p className="small">Digite o que procura no campo acima.</p>}
        {q && results.length===0 && <p>Nenhum resultado para <strong>{qRaw}</strong>.</p>}

        {results.length>0 && (
          <>
            <p className="small" style={{margin:"0 0 12px"}}>
              {results.length} resultado(s) para <strong>{qRaw}</strong>
            </p>
            <div className="grid">
              {results.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
