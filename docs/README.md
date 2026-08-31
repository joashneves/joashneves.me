# 📚 Documentação — joashneves.me

Blog pessoal & portfólio. Back-end Flask (API + PostgreSQL) e front-end React (Vite).

## Índice

- [Back-end (API Flask)](backend.md) — modelos, rotas, sitemap/feed, Twitch, views/reactions, migrações
- [Front-end (React/Vite)](frontend.md) — páginas, componentes e features novas
- [Setup & Variáveis de Ambiente](setup.md) — como rodar e as variáveis necessárias (Twitch, SITE_URL etc.)

---

## Resumo das features recentes

| Feature | Onde vive | Como funciona |
|---|---|---|
| 💬 **Reações** | `api/app/routes/social_routes.py` + `src/components/Public/Reactions.jsx` | `POST /api/posts/<slug>/reaction` incrementa `reactions` (JSONB) no post; 1 voto por post por dispositivo (localStorage) |
| 👀 **Contador de views** | `api/app/routes/social_routes.py` + `PostContent` | `POST /api/posts/<slug>/view` incrementa `views`; conta 1x por dispositivo via localStorage |
| 🥞 **Indicador de leitura** | `src/components/Public/ReadingProgress.jsx` | Barra fixa no topo que preenche conforme o scroll (rAF-throttled) |
| 📋 **Copiar código** | `src/components/Public/CodeBlock.jsx` | Botão "Copiar" em cada bloco `pre` (navigator.clipboard) + syntax highlight via `rehype-highlight` |
| ⬆️ **Voltar ao topo** | `src/components/Public/BackToTop.jsx` | Botão flutuante acima do toggle de tema, aparece após 400px de scroll |
| 📺 **Banner Twitch LIVE** | `api/app/services/twitch.py` + `src/components/Public/TwitchBanner.jsx` | Consulta a API Helix a cada 60s e mostra banner **só quando está ao vivo** |
| 🗓️ **Timeline em /projetos** | `src/pages/Projetos/index.jsx` | Toggle Grid ↔ Linha do tempo (usa a nova coluna `date` do Project; editável no admin) |
| 👤 **Página /sobre** | `src/pages/Sobre/` | Bio, stack com ícones, trajetória e redes (placeholders para editar) |
| 🗺️ **Sitemap + robots** | `api/app/routes/meta_routes.py` | `/sitemap.xml` e `/robots.txt` gerados pelo Flask apontando para `SITE_URL` |
| 📰 **Feed Atom (RSS)** | `api/app/routes/meta_routes.py` | `/feed.xml` com os últimos 20 posts; assinável em Feedly/Inoreader etc. |

Não implementado (fora de escopo): podcast.