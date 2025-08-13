export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import dynamic from "next/dynamic";

const CheckoutClient = dynamic(() => import("./CheckoutClient"), { ssr: false });

export default function CheckoutPage(){
  return (
    <CartProvider>
      <Header />
      <CheckoutClient />
      <Footer />
    </CartProvider>
  );
}
