export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ESQUERDA — Logo + copyright */}
        <div className="footer-brand">
          <img src="/logo.png" alt="Ares Sports" className="footer-logo" />
          <p>© {new Date().getFullYear()} Ares Sports</p>
        </div>

        {/* MEIO — Links úteis */}
        <nav className="footer-links" aria-label="Links do rodapé">
          <a href="/guia-de-medidas">Guia de Medidas</a>
          <a href="/c/contato">Contato</a>
          <a href="/c/politica-de-troca">Política de Troca</a>
        </nav>

        {/* DIREITA — Instagram (ícone + texto) */}
        <div className="footer-social">
          <a
            href="https://www.instagram.com/aressportsoficial"   // 
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
            aria-label="Instagram da Ares Sports"
          >
            <img src="/icons/instagram.jpg" alt="" aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
