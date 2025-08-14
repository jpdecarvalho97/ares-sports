'use client'
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartBadge() {
  const cart = useCart();
  const count = cart.items.reduce((s, it) => s + it.qty, 0);

  return (
    <Link href="/carrinho" className="btn">
      Carrinho ({count})
    </Link>
  );
}
