import Link from "next/link";
import MobileMenu from "./MobileMenu";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header className="header">
      <div className="container bar">
        {/* Esquerda: hamburger + logo */}
        <div className="brand">
          <MobileMenu />
          <Link href="/" aria-label="Ares Sports - Início">
            <img src="/logo.png" alt="Ares Sports" style={{ height: "80px", marginTop: "-8px" }} />
          </Link>
        </div>

        {/* Busca */}
        <form action="/buscar" method="get" className="search">
          <input className="input" type="search" name="q" placeholder="Buscar camisas..." aria-label="Buscar" />
          <button type="submit">Buscar</button>
        </form>

        {/* Direita: menu + carrinho (desktop) */}
        <div className="navwrap">
          <nav className="nav nav-desktop" aria-label="Categorias">
            <Link href="/c/brasileiros">Brasileiros</Link>
            <Link href="/c/internacionais">Internacionais</Link>
            <Link href="/c/selecoes">Seleções</Link>
            <Link href="/c/retro">Retrô</Link>
            <Link href="/c/infantil">Infantil</Link>
            <Link href="/guia-de-medidas">Guia de Medidas</Link>
          </nav>
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
