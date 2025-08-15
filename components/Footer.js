export default function Footer(){
  return (
    <footer className="footer">
      <div className="container space">
        <div>
          <div className="brand"><span style={{color:"var(--red)"}}>ARES</span> SPORTS</div>
          <div className="small">© {new Date().getFullYear()} Ares Sports — Camisas de time</div>
        </div>
        <div className="small">
          Pagamento por PIX • Envio para todo Brasil
        </div>
<a
          href="https://www.instagram.com/aressportsoficial"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E4405F", fontWeight: "bold", textDecoration: "none" }}
        >
          📸 Siga no Instagram
        </a>
      </div>
    </footer>
  )
}
