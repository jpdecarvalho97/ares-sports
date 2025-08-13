import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Guia de Medidas | Ares Sports",
  description: "Tabela de tamanhos e como medir sua camisa de time.",
};

export default function GuiaDeMedidas() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: "24px 0" }}>
        <h1>Guia de Medidas</h1>
        <p className="small">
          Compare as medidas da sua camisa com a tabela abaixo. As medidas podem
          variar ~1–3 cm conforme o lote.
        </p>

        <section style={{ marginTop: 20 }}>
          <h2>Adulto / Unissex</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Largura (peito)</th>
                  <th>Comprimento</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>P</td><td>48–50 cm</td><td>68–70 cm</td></tr>
                <tr><td>M</td><td>52–54 cm</td><td>70–72 cm</td></tr>
                <tr><td>G</td><td>56–58 cm</td><td>72–74 cm</td></tr>
                <tr><td>GG</td><td>58–60 cm</td><td>74–76 cm</td></tr>
                <tr><td>GGG</td><td>62–64 cm</td><td>76–78 cm</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Infantil (referência)</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Largura (peito)</th>
                  <th>Comprimento</th>
                  <th>Idade aprox.</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>4</td><td>33–35 cm</td><td>45–48 cm</td><td>3–4</td></tr>
                <tr><td>6</td><td>36–38 cm</td><td>49–52 cm</td><td>5–6</td></tr>
                <tr><td>8</td><td>39–41 cm</td><td>53–56 cm</td><td>7–8</td></tr>
                <tr><td>10</td><td>42–44 cm</td><td>57–60 cm</td><td>9–10</td></tr>
                <tr><td>12</td><td>45–47 cm</td><td>61–64 cm</td><td>11–12</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Como medir</h2>
          <ol>
            <li>Deite uma camisa que vista bem numa superfície plana.</li>
            <li><strong>Largura (peito):</strong> meça de axila a axila.</li>
            <li><strong>Comprimento:</strong> meça do ponto mais alto do ombro até a barra.</li>
          </ol>
          <div style={{ marginTop: 12 }}>
            <img
              src="/img/guia-medidas.png"
              alt="Exemplo de medidas (largura e comprimento)"
              style={{ maxWidth: 420, width: "100%", border: "1px solid #eee", borderRadius: 12 }}
            />
            <p className="small">.</p>
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2>Dicas rápidas</h2>
          <ul>
            <li>Se ficar entre dois tamanhos, escolha o maior para caimento confortável.</li>
            <li>Camisas “player” tendem a ser mais justas que “torcedor”.</li>
            <li>Diferenças de marca/modelo podem alterar levemente as medidas.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
