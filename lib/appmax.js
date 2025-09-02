// lib/appmax.js
export const APPMAX_BASE = process.env.APPMAX_BASE || "https://homolog.sandboxappmax.com.br/api/v3";
const ACCESS_TOKEN = process.env.APPMAX_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.warn("[Appmax] ACCESS TOKEN ausente. Configure APPMAX_ACCESS_TOKEN no .env.local");
}

// A Appmax espera o 'access-token' no BODY das requisições.
export async function appmaxPost(path, body) {
  const url = `${APPMAX_BASE}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "access-token": ACCESS_TOKEN, ...(body || {}) }),
    cache: "no-store"
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Appmax ${path} ${res.status}: ${txt}`);
  }
  return res.json();
}

export const createCustomer = (payload) => appmaxPost("/customer", payload);
export const createOrder    = (payload) => appmaxPost("/order", payload);
export const payWithPix     = (payload) => appmaxPost("/payment/pix", payload);
