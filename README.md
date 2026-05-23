# 📩 MessageCore API

API para envio de mensagens via WhatsApp Web usando `whatsapp-web.js`.

---

## 🚀 Status da API

A API fornece conexão com WhatsApp, envio de mensagens e gerenciamento de sessão via QR Code.

---

## 📌 Base URL


http://localhost:3000


---

# 📡 Rotas da API

---

## 🟢 STATUS

Verifica o estado da API e do WhatsApp.


GET /status


### Resposta:
```json
{
  "api": "online",
  "whatsapp": "connected",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```
❤️ HEALTH CHECK

Usado para monitoramento (Railway / Docker / Render).

GET /health
Resposta:
```json
{
  "status": "ok",
  "uptime": 12345,
  "memory": {
    "rss": 12345678
  },
  "timestamp": 1700000000000
}
```
👤 CLIENT INFO

Retorna informações do WhatsApp conectado.

GET /client
Resposta:
```json
{
  "pushname": "Nome",
  "wid": "5516999999999@c.us",
  "platform": "android",
  "phone": "5516999999999"
}
```
📷 QR CODE

Retorna o QR Code para login no WhatsApp Web.

GET /qr
Resposta:
```json
{
  "qr": "data:image/png;base64,..."
}
```
💬 ENVIAR MENSAGEM

Envia uma mensagem para um número WhatsApp.

POST /invite/message
Body:
```json
{
  "phone": "5516999999999",
  "message": "Olá"
}
```
Resposta:
```json
{
  "success": true,
  "phone": "5516999999999",
  "message": "Olá"
}
```
🔐 RESET DE SESSÃO

Remove a sessão atual do WhatsApp e força novo login via QR Code.

POST /exit/reset
Body:
```json
{
  "password": "sua_senha"
}
```
Resposta:
```json
{
  "success": true,
  "message": "Sessão resetada"
}
```
⚙️ Instalação
```bash
npm install
```
▶️ Rodar o projeto
```bash
npm start
```

## ⚠️ Observações

- O WhatsApp precisa ser conectado via QR Code antes de enviar mensagens.
- Use números no formato internacional (Brasil: `55 + DDD + número`).
- Sessões são armazenadas localmente.

### ⏳ Inicialização
Após iniciar o projeto, aguarde entre **5 a 10 segundos** antes de fazer qualquer requisição.

Isso é necessário para evitar conflitos durante a inicialização do WhatsApp Web e garantir que o client esteja totalmente carregado.

