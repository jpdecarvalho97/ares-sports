'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, categories } from "../lib/data";

function norm(s=""){
  return s.toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function SearchSuggest(){
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);        // highlight index
  const boxRef = useRef(null);

  const results = useMemo(()=>{
    const nq = norm(q.trim());
    if(!nq) return [];
    // 1) produtos por nome/id
    const prod = products.filter(p =>
      norm(p.name).includes(nq) || norm(p.id).includes(nq)
    ).slice(0, 6);
    // 2) categorias (opcional)
    const cat = categories
      .filter(c => norm(c.label).includes(nq) || norm(c.slug).includes(nq))
      .map(c => ({ __cat: true, slug: c.slug, label: c.label }))
      .slice(0, 2);
    return [...prod, ...cat];
  }, [q]);

  useEffect(()=>{
    setOpen(results.length>0 && q.trim().length>0);
    setHi(0);
  }, [q, results.length]);

  // Fechar ao clicar fora
  useEffect(()=>{
    function onClick(e){
      if(!boxRef.current) return;
      if(!boxRef.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  },[]);

  function submitSearch(e){
    e?.preventDefault();
    const nq = q.trim();
    if(!nq) return;
    setOpen(false);
    router.push(`/buscar?q=${encodeURIComponent(nq)}`);
  }

  function onKeyDown(e){
    if(!open || results.length===0) return;
    if(e.key==="ArrowDown"){ e.preventDefault(); setHi((hi+1)%results.length); }
    if(e.key==="ArrowUp"){ e.preventDefault(); setHi((hi-1+results.length)%results.length); }
    if(e.key==="Enter"){
      e.preventDefault();
      const r = results[hi];
      if(r?.__cat){
        router.push(`/c/${r.slug}`);
      }else if(r?.id){
        router.push(`/p/${r.id}`);
      }else{
        submitSearch();
      }
      setOpen(false);
    }
    if(e.key==="Escape"){ setOpen(false); }
  }

  return (
    <div className="search suggest" ref={boxRef}>
      <form action="/buscar" method="get" onSubmit={submitSearch} style={{display:"flex", gap:8, flex:1}}>
        <input
          className="input"
          type="search"
          name="q"
          placeholder="Buscar camisas..."
          aria-label="Buscar"
          value={q}
          onChange={e=>setQ(e.target.value)}
          onFocus={()=> setOpen(results.length>0)}
          onKeyDown={onKeyDown}
          autoComplete="off"
        />
        <button className="btn" type="submit">Buscar</button>
      </form>

      {open && (
        <div className="suggest-box" role="listbox">
          {results.map((r, i)=> r.__cat ? (
            <Link
              key={`c-${r.slug}`}
              href={`/c/${r.slug}`}
              className={`suggest-item ${i===hi?'hi':''}`}
              role="option"
            >
              🔎 Ver categoria: <strong>{r.label}</strong>
            </Link>
          ) : (
            <Link
              key={r.id}
              href={`/p/${r.id}`}
              className={`suggest-item ${i===hi?'hi':''}`}
              role="option"
            >
              <img src={r.image} alt={r.name} />
              <span>{r.name}</span>
              <em>R$ {r.price.toFixed(2)}</em>
            </Link>
          ))}
          {/* Link para ver todos */}
          <Link
            href={`/buscar?q=${encodeURIComponent(q.trim())}`}
            className="suggest-item all"
          >
            Ver todos os resultados por “{q.trim()}”
          </Link>
        </div>
      )}
    </div>
  );
}
