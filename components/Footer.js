export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / Nome */}
        <div className="footer-brand">
          <img src="/logo.png" alt="Ares Sports" className="footer-logo" />
          <p>© {new Date().getFullYear()} Ares Sports</p>
        </div>

        {/* Links úteis */}
        <div className="footer-links">
          <a href="/guia-de-medidas">Guia de Medidas</a>
          <a href="/c/contato">Contato</a>
        </div>

        {/* Redes sociais */}
        <div className="footer-social">
          <a
            href="https://www.instagram.com/aressportsoficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src="/icons/instagram.jpg" alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
