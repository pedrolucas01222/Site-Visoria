# VISORIA Studio — site institucional

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Lucide. Animações em CSS puro, com suporte a `prefers-reduced-motion`.

Páginas: Início, Serviços, Sobre, Contato e orçamento, Política de Privacidade e 404.

> **Validação:** o projeto foi escrito sem acesso à internet, então `npm install`, `typecheck`, `lint` e `build` **ainda não foram executados**. Rode-os antes de publicar.

## Executar

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```
Requer Node 20.9+.

## Contatos já configurados

- WhatsApp: `5544998185425` (mensagem: "Olá! Gostaria de fazer um orçamento com a Visoria.")
- Instagram: `https://www.instagram.com/visoria_studio`
- E-mail comercial e destino dos pedidos: `studiovisoria@gmail.com`

Ambos podem ser trocados em `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_INSTAGRAM_URL`). Os botões de WhatsApp e Instagram aparecem no rodapé, na chamada final e na página de contato.

## Como os pedidos de orçamento chegam até você

O formulário valida tudo no servidor e só mostra "enviado" quando um provedor realmente aceita a mensagem. Há duas camadas:

1. **Envio automático por e-mail:** já aponta para `studiovisoria@gmail.com` via Formsubmit, sem chave. **Ação sua:** depois de publicar, envie um pedido de teste pelo formulário; o Formsubmit mandará um e-mail de ativação para esse Gmail (confira o spam) e você precisa confirmá-lo uma vez. Até lá, o Plano B do WhatsApp cobre os pedidos. Alternativas (variáveis de ambiente):
   - `CONTACT_TO_EMAIL=outro@email.com` — troca o destino.
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — Resend, mais robusto, exige domínio verificado.
   - `FORM_WEBHOOK_URL` — webhook (Make, Zapier, n8n etc.).
2. **Escolha do visitante no formulário:** há dois botões, "Enviar por e-mail" e "Enviar pelo WhatsApp".
   - **E-mail:** envia automaticamente para `studiovisoria@gmail.com`. Se o envio falhar (ou o Formsubmit ainda não estiver ativado), o site abre o e-mail do visitante com o pedido completo já endereçado a esse Gmail.
   - **WhatsApp:** abre `wa.me/5544998185425` com a mensagem pronta (nome, e-mail, serviços, tipo de projeto, prazo, investimento e descrição).
   Nos planos B (e-mail do visitante ou WhatsApp), o pedido só chega quando o visitante enviar a mensagem; o site avisa isso.

Proteções: honeypot, tempo mínimo de preenchimento, checagem de origem, limite de 5 tentativas por IP (em memória; para algo mais forte use Turnstile/hCaptcha ou WAF).

## Onde editar

| O que | Arquivo |
| --- | --- |
| Nome, contatos, redes, logo | `src/config/site.ts` (+ `.env.local`) |
| Serviços | `src/data/services.ts` |
| Textos institucionais e política de privacidade | `src/data/content.ts` |
| Cores e fontes | `src/app/globals.css`, `src/app/layout.tsx` |

Logotipo: `public/brand/` (transparente, gerado do arquivo original), `src/app/icon.png`, `src/app/apple-icon.png`, `public/og-image.png`.

## Publicar (Vercel)

Suba o repositório, importe na Vercel, cadastre as variáveis de ambiente, adicione o domínio e atualize `NEXT_PUBLIC_SITE_URL`. A rota `/api/contact` exige runtime Node.

## Pendências

- A página de portfólio foi removida; será recriada quando houver trabalhos reais.
- E-mail comercial, domínio, CNPJ e dados da Política de Privacidade (modelo inicial, revisar com profissional jurídico).
- Não há cookies de rastreamento nem analytics.
