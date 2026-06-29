# Nummo · Login & Cadastro

Front-end (somente design) das telas de **acesso** e **cadastro** da Nummo — plataforma de
pagamentos para empresas. Aceita **apenas CNPJ** (todos os tipos: MEI, ME, EPP, LTDA, SLU,
EIRELI, S.A. e outros). Construído em **React + Vite**, sem back-end (os envios são simulados).

> Visual moderno e futurista, mas que transmite confiança — no padrão de uma fintech global.
> Mapa-múndi pontilhado animado de fundo (rede de pagamentos), identidade `.nummo` e
> microinterações em cada campo.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em /dist
npm run preview  # serve o build
```

Requer Node 18+.

## Deploy na Vercel

O projeto já está pronto para a Vercel (Vite + SPA):

1. Em **vercel.com → Add New → Project**, importe o repositório do GitHub.
2. A Vercel detecta o **Vite** automaticamente:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Clique em **Deploy**.

O [`vercel.json`](vercel.json) já inclui o *rewrite* de SPA (`/(.*) → /index.html`), então
atualizar a página ou abrir links diretos como `/cadastro` e `/painel` funciona sem 404.

## Rotas

| Rota         | Tela                                              |
| ------------ | ------------------------------------------------- |
| `/entrar`    | Login (CNPJ + senha)                              |
| `/cadastro`  | Cadastro em 3 etapas (Empresa → Responsável → Segurança) |

`/` e rotas desconhecidas redirecionam para `/entrar`.

## Identidade (VISUAL NUMMO)

- **Fonte:** Space Grotesk · `letter-spacing: -0.025em`
- **Paleta:**
  - `#F6F9FC` branco frio · `#2F6BFF` azul da marca
  - `#060A0E` · `#091020` · `#0C1730` · `#0D1B39` (fundos navy)
- **Logo:** wordmark `.nummo` bicolor (vetor extraído do arquivo oficial) em
  [`src/components/Logo.jsx`](src/components/Logo.jsx).

Todos os tokens estão em [`src/styles/global.css`](src/styles/global.css) (`:root`).

## Destaques de implementação

- **Validação de CNPJ real** (dígitos verificadores) + máscara progressiva —
  [`src/lib/cnpj.js`](src/lib/cnpj.js). Testada contra CNPJs reais e casos inválidos.
- **Cadastro multi-etapas** com indicador de progresso, transições (framer-motion),
  medidor de força de senha e checklist de requisitos.
- **Mapa-múndi pontilhado** gerado a partir de dados geográficos (`dotted-map`,
  pré-computado em [`src/data/worldmap.json`](src/data/worldmap.json)) com hubs financeiros
  pulsantes e arcos de conexão saindo de São Paulo — [`src/components/WorldMap.jsx`](src/components/WorldMap.jsx).
- **Acessível:** labels associados, `aria-invalid`/`role="alert"`, foco visível,
  e respeito a `prefers-reduced-motion` (desliga animações pesadas).
- **Responsivo:** layout split no desktop; no mobile vira coluna única com cabeçalho de marca.

## Estrutura

```
src/
├─ pages/        Login.jsx · Cadastro.jsx
├─ components/    AuthLayout · BrandPanel · WorldMap · Logo · AuthTabs · Stat · icons
│  └─ ui/         TextField · PasswordField · Select · Button · Checkbox · StepIndicator
├─ lib/           cnpj.js · format.js
├─ data/          worldmap.json
└─ styles/        global.css  (design system + tokens)
```

> **Sem back-end:** ao enviar login/cadastro válidos, exibe-se um estado de sucesso simulado.
> Basta plugar as chamadas de API nos handlers `handleSubmit` / `submit` das páginas.
