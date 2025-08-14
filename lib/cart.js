// lib/cart.js
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // carrega do localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
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

  function add(id, size = "", name = "", price = 0, image = "") {
    setItems((prev) => {
      const i = prev.findIndex((it) => it.id === id && it.size === size);
      if (i >= 0) {
        const cp = [...prev];
        cp[i] = { ...cp[i], qty: cp[i].qty + 1 };
        return cp;
      }
      return [...prev, { id, size, name, price: Number(price) || 0, image, qty: 1 }];
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

