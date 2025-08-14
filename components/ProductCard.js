import Link from "next/link";

export default function ProductCard({ p, add }) {
  return (
    <div className="card">
      <div className="imgwrap">
        <img src={p.image} alt={p.name} loading="lazy" />
      </div>
      <div className="pad">
        <div className="kicker">Lançamento</div>
        <h3 style={{ margin: "6px 0" }}>{p.name}</h3>
        <div className="price">
          <div className="now">R$ {p.price.toFixed(2)}</div>
          {p.oldPrice && <div className="old">R$ {p.oldPrice.toFixed(2)}</div>}
        </div>

        {/* Bloco único de botões com classe actions */}
        <div className="actions">
          <Link href={`/p/${p.id}`} className="btn btn-dark">Ver detalhes</Link>
          <button onClick={() => add(p)} className="btn btn-red">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
