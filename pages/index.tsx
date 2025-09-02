
// pages/index.tsx
import { useState } from 'react';

type Item = { sku: string; name: string; qty: number; price: number };

export default function Home() {
  const [items, setItems] = useState<Item[]>([
    { sku: 'CAMISA-001', name: 'Camisa Ares', qty: 1, price: 99.9 },
    { sku: 'MEIA-123', name: 'Meia Performance', qty: 2, price: 29.9 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState<string>('');
  const [copyPaste, setCopyPaste] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);

  async function pagar() {
    setLoading(true); setError(null); setQrImage(''); setCopyPaste('');
    try {
      const customer = {
        firstname: 'João', lastname: 'Cliente', email: 'joao@email.com', telephone: '+55 11 99999-9999',
        document_number: '00000000000', ip: '127.0.0.1',
      };
      const payload = {
        customer,
        items: items.map(it => ({ sku: it.sku, name: it.name, qty: it.qty, price: Number(it.price.toFixed(2)) })),
        shipping: 0,
        discount: 0,
      };
      const r = await fetch('/api/checkout/pix', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || 'Falha ao gerar PIX');

      setOrderId(j.order_id);
      const p = j.payment || {};
      const maybePayload = p.pix_payload || p.pix?.payload || p.copy_paste || p.qrCode?.emv || '';
      const maybeImage   = p.qr_image_base64 || p.qrCode?.image || '';

      setCopyPaste(maybePayload);
      setQrImage(maybeImage.startsWith('data:image') ? maybeImage : (maybeImage ? `data:image/png;base64,${maybeImage}` : ''));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 820, margin: '40px auto', padding: 16, fontFamily: 'system-ui' }}>
      <h1>Ares Sports — Checkout PIX (Appmax)</h1>

      <section style={{ margin: '24px 0' }}>
        <h2>Carrinho</h2>
        <table width="100%" cellPadding={8} style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th align="left">SKU</th>
              <th align="left">Produto</th>
              <th>Qtde</th>
              <th align="right">Preço</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} style={{ borderTop: '1px solid #eee' }}>
                <td>{it.sku}</td>
                <td>{it.name}</td>
                <td align="center">{it.qty}</td>
                <td align="right">R$ {(it.price * it.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #000' }}>
              <td colSpan={3} align="right"><b>Total</b></td>
              <td align="right"><b>R$ {total.toFixed(2)}</b></td>
            </tr>
          </tfoot>
        </table>
      </section>

      <button onClick={pagar} disabled={loading} style={{ padding: '12px 18px', fontSize: 16 }}>
        {loading ? 'Gerando PIX…' : 'Pagar com PIX'}
      </button>

      {error && <p style={{ color: 'crimson', marginTop: 12 }}>Erro: {error}</p>}

      {orderId && (
        <p style={{ marginTop: 12 }}>Pedido criado: <b>{orderId}</b></p>
      )}

      {(qrImage || copyPaste) && (
        <section style={{ marginTop: 24, display: 'grid', gap: 12 }}>
          {qrImage && (
            <div>
              <h3>QR Code</h3>
              <img src={qrImage} alt="QR PIX" style={{ width: 220, height: 220, objectFit: 'contain', border: '1px solid #eee' }} />
            </div>
          )}
          {copyPaste && (
            <div>
              <h3>Copia e Cola</h3>
              <textarea value={copyPaste} readOnly style={{ width: '100%', height: 120 }} />
            </div>
          )}
        </section>
      )}
    </main>
  );
}
