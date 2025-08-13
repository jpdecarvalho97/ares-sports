export const metadata = {
  title: "Ares Sports",
  description: "Camisas de time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
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
