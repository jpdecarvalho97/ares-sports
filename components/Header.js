import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="header">
      <div className="container bar" style={{ display: "flex", alignItems: "center", gap: "16px" }}>

        {/* Grupo esquerdo: logo + hamburger (mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/" aria-label="Ares Sports - Início">
            <img
              src="/logo.png"
              alt="Ares Sports"
              style={{ height: "80px", marginTop: "-8px" }}
            />
          </Link>

          {/* Botão HAMBURGER fica colado na logo */}
          <MobileMenu />
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

        {/* Menu DESKTOP (esconde no mobile via CSS) */}
        <nav className="nav nav-desktop" aria-label="Categorias" style={{ display: "flex", gap: "15px" }}>
          <Link href="/c/brasileiros">Brasileiros</Link>
          <Link href="/c/internacionais">Internacionais</Link>
          <Link href="/c/selecoes">Seleções</Link>
          <Link href="/c/retro">Retrô</Link>
          <Link href="/c/infantil">Infantil</Link>
          <Link href="/guia-de-medidas">Guia de Medidas</Link>
        </nav>
      </div>
    </header>
  );
}
