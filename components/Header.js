import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import CartBadge from "@/components/CartBadge"; // ⬅ importa o contador

export default function Header() {
  return (
    <header className="header">
      <div className="container bar" style={{ display: "flex", alignItems: "center", gap: "16px" }}>

        {/* Esquerda: logo + hamburger (mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
          <MobileMenu />
          <Link href="/" aria-label="Ares Sports - Início">
            <img
              src="/logo.png"
              alt="Ares Sports"
              style={{ height: "80px", marginTop: "-8px" }}
            />
          </Link>
        </div>

        {/* Busca (cresce no meio) */}
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

        {/* Menu DESKTOP */}
        <nav className="nav nav-desktop" aria-label="Categorias" style={{ display: "flex", gap: "15px" }}>
          <Link href="/c/brasileiros">Brasileiros</Link>
          <Link href="/c/internacionais">Internacionais</Link>
          <Link href="/c/selecoes">Seleções</Link>
          <Link href="/c/retro">Retrô</Link>
          <Link href="/c/infantil">Infantil</Link>
          <Link href="/guia-de-medidas">Guia de Medidas</Link>
        </nav>

        {/* Carrinho no DESKTOP (sempre visível à direita) */}
        <div className="cart-desktop">
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
