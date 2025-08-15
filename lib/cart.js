"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/lib/data"; // ⬅ usa o catálogo como fallback

const Ctx = createContext({
  items: [],
  add: () => {},
  remove: () => {},
  inc: () => {},
  dec: () => {},
  clear: () => {},
  total: () => 0,
});

const KEY = "ares_cart_v1";

// helper: normaliza caminho da imagem
function normalizeImage(src = "") {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("/")) return src;
  return `/img/${src}`;
}

// mapa rápido por id
const map = new Map(products.map((p) => [p.id, p]));

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // 1) carrega do localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        // 2) backfill: preenche nome/preço/imagem se faltarem (itens antigos)
        const fixed = parsed.map((it) => {
          const prod = map.get(it.id);
          return {
            ...it,
            name: it.name || prod?.name || it.id,
            price: Number(it.price ?? prod?.price ?? 0),
            image: normalizeImage(it.image || prod?.image || ""),
          };
        });
        setItems(fixed);
      }
    } catch {}
  }, []);

  // salva no localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(KEY, JSON.stringify(items));
      }
    } catch {}
  }, [items]);

  // ADD com fallback no catálogo
  function add(id, size = "", name, price, image) {
    const prod = map.get(id);
    const finalName = name || prod?.name || id;
    const finalPrice = Number(price ?? prod?.price ?? 0);
    const finalImage = normalizeImage(image || prod?.image || "");

    setItems((prev) => {
      const i = prev.findIndex((it) => it.id === id && it.size === size);
      if (i >= 0) {
        const cp = [...prev];
        cp[i] = { ...cp[i], qty: cp[i].qty + 1 };
        return cp;
      }
      return [...prev, { id, size, name: finalName, price: finalPrice, image: finalImage, qty: 1 }];
    });
  }

  function remove(id, size = "") {
    setItems((prev) => prev.filter((it) => !(it.id === id && it.size === size)));
  }

  function inc(id, size = "") {
    setItems((prev) =>
      prev.map((it) => (it.id === id && it.size === size ? { ...it, qty: it.qty + 1 } : it))
    );
  }

  function dec(id, size = "") {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id && it.size === size ? { ...it, qty: it.qty - 1 } : it))
        .filter((it) => it.qty > 0)
    );
  }

  function clear() {
    setItems([]);
  }

  function total() {
    return items.reduce((s, it) => s + (Number(it.price) || 0) * it.qty, 0);
  }

  const value = useMemo(() => ({ items, add, remove, inc, dec, clear, total }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  return useContext(Ctx);
}
