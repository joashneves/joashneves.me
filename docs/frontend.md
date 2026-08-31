# Front-end (React/Vite)

Aplicação em `front-end/`. React 19 + Vite + CSS Modules + SWR + React Router.

## Páginas

| Rota | Componente | Observações |
|---|---|---|
| `/` | `src/pages/Home/` | Últimos links, último post, últimos projetos |
| `/projetos` | `src/pages/Projetos/` | **Toggle Grid ↔ Linha do tempo** (novo) |
| `/links` | `src/pages/Links/` | Links com tags/pesquisa |
| `/post` | `src/pages/Post/` | Lista de posts |
| `/post/:slug` | `src/pages/PostContent/` | Leitura + **barra de progresso, copiar código, highlight, reações, views** |
| `/sobre` | `src/pages/Sobre/` | **Nova** — bio, stack, trajetória, redes (placeholders) |
| `/adm/logar` | `src/pages/Admin/Login/` | Login |
| `/adm/painel` | `src/pages/Admin/Painel/` | CMS (protegido) |

## Components públicos novos (`src/components/Public/`)

| Componente | Descrição |
|---|---|
| `ReadingProgress.jsx` | Barra de progresso de leitura fixa no topo (4px, gradiente verde→roxo) |
| `CodeBlock.jsx` | Envolve blocos `pre` e adiciona botão "Copiar"; usado como o renderer de `pre` no `ReactMarkdown` |
| `Reactions.jsx` | Botões de emoji (👍 ❤️ 🔥 🚀 👏) com contagem + voto único por dispositivo |
| `BackToTop.jsx` | Botão flutuante com seta ↑, aparece após 400px de scroll |
| `TwitchBanner.jsx` | Banner fixo no topo só enquanto a live estiver no ar (SWR com `refreshInterval: 60000`) |

## Como estão ligados

- **`App.jsx`**: monta `TwitchBanner`, `BackToTop` e `ThemeToggle` globalmente; rota `/sobre`.
- **`PostContent/index.jsx`**:
  - `ReactMarkdown` agora usa `rehypePlugins=[rehypeRaw, rehypeHighlight]` + `components={{ pre: CodeBlock }}`.
  - Na montagem, dispara `POST /posts/<slug>/view` uma vez (guard em `localStorage`).
  - Renderiza `<Reactions slug initial={post.reactions} />` no fim e mostra "👀 N views" no meta.
- **`Projetos/index.jsx`**: estado `view` ('grid'|'timeline'); a timeline mostra `formatDate(project.date)` e agrupa com `utils/date.js`.
- **`AdminForms.jsx`**: formulário de projetos ganhou input `type="date"` (enviado via FormData como `date`).

## Syntax highlight

- Dependência nova: `rehype-highlight` (usa `highlight.js` por baixo).
- Tema dark importado em `main.jsx` (`highlight.js/styles/github-dark.css`).
- Overrides do tema claro (GitHub Light) no `global.css`, escopados por `html[data-theme='light']`.

## Página /sobre — placeholders

Todo o conteúdo está em constantes no topo do componente (`aboutText`, `skills`, `timeline`, `networks`) — edite o arquivo `src/pages/Sobre/index.jsx` para colocar seus dados reais.

## Adicionando ícone novo

1. Crie `src/components/icon/svg/<nome>.jsx` (mesmo padrão dos demais).
2. Registre em `src/components/icon/svg/_index.jsx`.
3. Use `<Icon name="<nome>" width height />`.

## Comandos

```bash
npm run dev        # Dev com proxy /api → localhost:5000
npm run build      # Build de produção
npm run lint       # ESLint (há erros pré-existentes)
```