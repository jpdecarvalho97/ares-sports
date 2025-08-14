import "./globals.css";
import { CartProvider } from "@/lib/cart";

export const metadata = {
  title: "Ares Sports",
  description: "Camisas de time",
};

export const viewport = {
  width: "device-width",
  initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
