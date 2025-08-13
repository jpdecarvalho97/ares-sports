import Link from "next/link";

export default function Header({ cartCount=0 }){
  return (
    <header className="header">
      <div className="container bar">
        <Link href="/" aria-label="Ares Sports - Início">
  <img src="/logo.png" alt="Ares Sports" style={{ height: "90px" }} />
</Link>
        <nav className="nav" aria-label="Categorias">
          <Link href="/c/brasileiros">Brasileiros</Link>
          <Link href="/c/internacionais">Internacionais</Link>
          <Link href="/c/selecoes">Seleções</Link>
          <Link href="/c/retro">Retrô</Link>
          <Link href="/c/infantil">Infantil</Link>
          <Link href="/guia-de-medidas">Guia de Medidas</Link>
        </nav>
        <Link href="/carrinho" className="btn" style={{marginLeft:"auto"}}>
          Carrinho ({cartCount})
        </Link>
      </div>
    </header>
  );
}
