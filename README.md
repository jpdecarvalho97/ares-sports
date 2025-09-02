# Integração PIX Appmax (Rota B API)

## Passos

1. Crie `.env.local` na raiz com:
```
APPMAX_ACCESS_TOKEN=SEU_TOKEN
APPMAX_BASE=https://homolog.sandboxappmax.com.br/api/v3
```
Troque depois para produção.

2. Rode o projeto:
```
npm install
npm run dev
```
Abra http://localhost:3000

3. Clique em **Pagar com PIX** → verá QR e Copia e Cola.

4. Cadastre webhook `/api/webhooks/appmax` no painel da Appmax → Configurações → Webhooks.

5. Quando pagamento for aprovado, seu webhook recebe `OrderApproved`.
