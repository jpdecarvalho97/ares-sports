'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // fecha com ESC
  useEffect(() => {
    function onKey(e){ if(e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  },[]);

  return (
    <>
      {/* Botão hamburger (aparece só no mobile via CSS) */}
      <button
        className="mobile-menu-button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Overlay */}
      {open && <div className="mobile-overlay" onClick={() => setOpen(false)} />}

      {/* Drawer */}
      <nav className={`mobile-drawer ${open ? "on" : ""}`} aria-label="Menu mobile">
        <div className="mobile-drawer-header">
          <strong>Ares Sports</strong>
          <button className="close" aria-label="Fechar" onClick={() => setOpen(false)}>×</button>
        </div>

        <ul className="mobile-links" onClick={() => setOpen(false)}>
          <li><Link href="/c/brasileiros">Brasileiros</Link></li>
          <li><Link href="/c/internacionais">Internacionais</Link></li>
          <li><Link href="/c/selecoes">Seleções</Link></li>
          <li><Link href="/c/retro">Retrô</Link></li>
          <li><Link href="/c/infantil">Infantil</Link></li>
          <li><Link href="/guia-de-medidas">Guia de Medidas</Link></li>
          <li><Link href="/carrinho">Carrinho</Link></li>
        </ul>
      </nav>
    </>
  );
}
