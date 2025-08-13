-import Link from "next/link";
+import Link from "next/link";
+import SearchSuggest from "@/components/SearchSuggest";

export default function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="container bar" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link href="/" aria-label="Ares Sports - Início">
          <img src="/logo.png" alt="Ares Sports" style={{ height: "90px" }} />
        </Link>

-       <form action="/buscar" method="get" className="search" style={{ flex: 1 }}>
-         <input className="input" type="search" name="q" placeholder="Buscar camisas..." aria-label="Buscar" />
-         <button type="submit">Buscar</button>
-       </form>
+       <div style={{ flex: 1 }}>
+         <SearchSuggest />
+       </div>

        <nav className="nav" aria-label="Categorias" style={{ display: "flex", gap: "15px" }}>
          {/* ... */}
        </nav>

        <Link href="/carrinho" className="btn">
          Carrinho ({cartCount})
        </Link>
      </div>
    </header>
  );
}

