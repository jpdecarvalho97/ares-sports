export const metadata = {
  title: "Ares Sports",
  description: "Camisas de time",
  viewport: "width=device-width, initial-scale=1", // aqui no metadata, sem <head> manual
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
