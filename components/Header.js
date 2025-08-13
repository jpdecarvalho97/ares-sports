import Link from "next/link";

export default function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="container bar" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Logo */}
        <Link href="/" aria-label="Ares Sports - Início">
          <img src="/logo.png" alt="Ares Sports" style={{ height: "90px" }} />
        </Link>

        {/* Barra de pesquisa (DENTRO do componente) */}
        <form action="/buscar" method="get" className="search" style={{ flex: 1 }}>
          <input
            className="input"
            type="search"
            name="q"
            placeholder="Buscar camisas..."
            aria-label="Buscar"
          />
          <button type="submit">Buscar</button>
        </form>

        {/* Menu */}
        <nav className="nav" aria-label="Categorias" style={{ display: "flex", gap: "15px" }}>
          <Link href="/c/brasileiros">Brasileiros</Link>
          <Link href="/c/internacionais">Internacionais</Link>
          <Link href="/c/selecoes">Seleções</Link>
          <Link href="/c/retro">Retrô</Link>
          <Link href="/c/infantil">Infantil</Link>
          <Link href="/guia-de-medidas">Guia de Medidas</Link>
        </nav>

        {/* Carrinho */}
        <Link href="/carrinho" className="btn">
          Carrinho ({cartCount})
        </Link>
      </div>
    </header>
  );
}
