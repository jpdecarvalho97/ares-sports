import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Done(){
  return (
    <>
      <Header />
      <main className="container" style={{padding:"24px 0"}}>
        <h1>Obrigado! 🎉</h1>
        <p>Assim que seu pagamento por PIX for confirmado, seu pedido entra em preparação.</p>
        <p>Você receberá um e-mail com o status do pedido.</p>
      </main>
      <Footer />
    </>
  )
}
