// app/buscar/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

function norm(s = "") {
  return s
    .toString()
    .toLowerCase()
    .normalize("NFD")                 // remove acentos
    .replace(/\p{Diacritic}/gu, "");
}

export const metadata = {
  title: "Buscar | Ares Sports",
  description: "Procure camisas por time, modelo ou temporada.",
};

export default function BuscarPage({ searchParams }) {
  const q = norm(searchParams?.q || "");
  const results = q
    ? products.filter(p =>
        norm(p.name).includes(q) ||
        norm(p.id).includes(q) ||
        norm(p.category || "").includes(q)
      )
    : [];

  return (
    <>
      <Header />
      <main className="container" style={{ padding: "24px 0" }}>
        <h1>Resultados da busca</h1>

        <form action="/buscar" method="get" className="search" style={{ margin: "12px 0 20px" }}>
          <input
            className="input"
            type="search"
            name="q"
            placeholder="Ex.: Milan 24/25, Real Madrid, Brasil..."
            defaultValue={searchParams?.q || ""}
          />
          <button className="btn" type="submit">Buscar</button>
        </form>

        {!q && <p className="small">Digite o que procura no campo acima.</p>}

        {q && results.length === 0 && (
          <p>Nenhum resultado para <strong>{searchParams.q}</strong>. Tente outra palavra.</p>
        )}

        {results.length > 0 && (
          <>
            <p className="small" style={{ marginBottom: 12 }}>
              {results.length} resultado(s) para <strong>{searchParams.q}</strong>
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
