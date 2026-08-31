# Setup & Variáveis de Ambiente

## Back-end (`.env` em `api/`)

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=blog
MASTER_USER=user
MASTER_EMAIL=email@email.com
MASTER_PASSWORD=senha123
DATABASE_URL=postgresql://admin:admin@localhost:5432/blog
FRONT_URL=http://localhost:5173

# Novas variáveis
SITE_URL=https://joashneves.me       # usada no sitemap.xml / robots / feed
TWITCH_USER=joashneves               # canal consultado
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=                # credenciais do app Twitch (ver abaixo)
```

Mesmas variáveis estão em `.env.development` (versão commitada, sem segredos).

## Criando o app da Twitch (para o banner LIVE automático)

1. Crie um app em https://dev.twitch.tv/console/apps/create.
2. Copie o **Client ID** e gere um **Client Secret**.
3. Ponha os dois valores em `TWITCH_CLIENT_ID` e `TWITCH_CLIENT_SECRET` no `api/.env`.
4. Reinicie a API (`cd api && source venv/bin/activate && nohup ./venv/bin/python index.py &`).

O servidor troca Client ID/Secret por um token de app (cache ~1h) e consulta
`https://api.twitch.tv/helix/streams?user_login=<TWITCH_USER>` com cache de 60s.
Sem as credenciais, `/api/twitch` retorna `{ "live": false, "error": "..." }` e o banner não aparece — nada quebra.

## Subindo local

```bash
# 1) Banco (Docker)
cd api/infra && docker compose up -d

# 2) API
cd api
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.development .env   # se ainda não existir, e preencha
python migrate.py          # adiciona colunas novas (reactions, views, date)
nohup ./venv/bin/python index.py &

# 3) Front
cd front-end
npm install
npm run dev
```

O front em `:5173` faz proxy de `/api` para `:5000` (ver `vite.config.js`).

## Checks rápidos

```bash
curl http://localhost:5000/api/status                          # { status: online }
curl http://localhost:5000/sitemap.xml                         # XML
curl http://localhost:5000/feed.xml                            # Atom
curl http://localhost:5000/api/twitch                          # live status
curl -X POST http://localhost:5000/api/posts/<slug>/view       # { views: N }
curl -X POST -H 'Content-Type: application/json' \
     -d '{"emoji":"🔥"}' http://localhost:5000/api/posts/<slug>/reaction
```