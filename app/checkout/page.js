export const dynamic = 'force-dynamic'; // impede pré-render
export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import NextDynamic from "next/dynamic"; // <- renomeado

const CheckoutClient = NextDynamic(() => import("./CheckoutClient"), { ssr: false });

export default function CheckoutPage(){
  return (
    <CartProvider>
      <Header />
      <CheckoutClient />
      <Footer />
    </CartProvider>
  );
}
