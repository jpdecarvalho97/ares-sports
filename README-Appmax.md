# Ares Sports — Integração Appmax (Rota B / API)

Este projeto foi preparado para gerar **PIX dinâmico via Appmax** somando os itens do carrinho e confirmando pagamento por **webhook**.

## 1) Variáveis de ambiente
Crie um arquivo `.env.local` na raiz com:

```
APPMAX_ACCESS_TOKEN=SEU_TOKEN_DA_APPMAX
APPMAX_BASE=https://homolog.sandboxappmax.com.br/api/v3
```

> Em produção, troque `APPMAX_BASE` pela URL de produção da Appmax e use um **token de produção**.

## 2) Rotas criadas
- `app/api/checkout/pix/route.js`: cria **cliente → pedido → pagamento PIX** e retorna QR/copia-e-cola.- `app/api/appmax/webhook/route.js`: (já existia) recebe eventos de pedido/pagamento (ex.: `OrderApproved`).

## 3) Teste rápido
- Rode `npm install` e depois `npm run dev`.- Abra `http://localhost:3000/teste-pix` e gere um PIX de teste.- Cadastre seu webhook em **Configurações → Apphooks** no painel Appmax apontando para `https://SEU_DOMINIO/api/appmax/webhook`.
## 4) Como integrar no seu checkout
Do seu frontend, envie `POST /api/checkout/pix` com:

```json
{
  "customer": {
    "firstname": "João",
    "lastname": "Cliente",
    "email": "joao@email.com",
    "telephone": "+55 11 99999-8888",
    "document_number": "00000000000"
  },
  "items": [
    { "sku": "CAMISA-001", "name": "Camisa Ares", "qty": 2, "price": 99.9 }
  ],
  "shipping": 0,
  "discount": 0
}
```

A resposta inclui:
```json
{
  "ok": true,
  "order_id": "...",
  "customer_id": "...",
  "pix": {
    "copiaECola": "...",
    "qrImage": "data:image/png;base64,..."
  },
  "raw": { "...": "resposta completa vinda da Appmax" }
}
```

Mostre o QR e o “copia e cola” na tela e aguarde o **webhook** confirmar o pagamento para liberar o pedido.

## 5) Dicas
- **Token só no servidor** (nunca no cliente).- Se o QR não aparecer, confira se **PIX** está habilitado no painel da Appmax e se o token/URL (sandbox vs produção) estão corretos.- Use `ngrok` ou um domínio público para testar o webhook em desenvolvimento.- O campo `document_number` (CPF/CNPJ) é necessário para o pagamento PIX.