export const metadata = {
  title: "Ares Sports",
  description: "Camisas de time - Pix rápido",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
