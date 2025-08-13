'use client'
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { products } from "./data";

const Ctx = createContext({
  items: [],
  add: () => {},
  remove: () => {},
  inc: () => {},
  dec: () => {},
  clear: () => {},
  total: () => 0
});


// chave única por produto + tamanho (ex.: "corinthians-home-2526|M")
function lineKey(id, size){ return `${id}|${size||''}` }

export function CartProvider({ children }){
  // cada item: { id, size, qty }
  const [items, setItems] = useState([]);

  // carrega do localStorage
  useEffect(()=>{
    try{
      const raw = localStorage.getItem("cart");
      if(raw) setItems(JSON.parse(raw));
    }catch(_){}
  },[]);

  // salva no localStorage
  useEffect(()=>{
    try{
      localStorage.setItem("cart", JSON.stringify(items));
    }catch(_){}
  },[items]);

  const api = useMemo(()=>({
    items,
    add:(id, size)=>{
      if(!size){ alert("Escolha um tamanho antes de adicionar."); return; }
      const k = lineKey(id,size);
      const exists = items.find(x=> lineKey(x.id,x.size)===k);
      if(exists){
        setItems(items.map(x=> lineKey(x.id,x.size)===k ? {...x, qty:x.qty+1} : x));
      }else{
        setItems([...items, {id, size, qty:1}]);
      }
    },
    remove:(id, size)=> setItems(items.filter(x=> !(x.id===id && x.size===size))),
    inc:(id, size)=> setItems(items.map(x=> (x.id===id && x.size===size)? {...x, qty:x.qty+1}:x)),
    dec:(id, size)=> setItems(items.map(x=> (x.id===id && x.size===size)? {...x, qty:Math.max(1,x.qty-1)}:x)),
    clear:()=> setItems([]),
    total: ()=> items.reduce((sum, it)=>{
      const p = products.find(x=>x.id===it.id);
      return sum + (p?.price||0)*it.qty;
    },0)
  }),[items]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useCart(){ 
  return useContext(Ctx); 
}

// compat antigo desativado (agora é obrigatório tamanho)
export function hydrateCartFromQuery(){ 
  return null; 
}

