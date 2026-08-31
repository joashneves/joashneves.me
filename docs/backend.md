# Back-end (API Flask)

Aplicação Flask em `api/`. Entrada: `api/index.py` (cria o app, inicializa o banco e sobe em `:5000`).

## Estrutura

```text
api/
├── index.py                 # Entrypoint (app, db.init_app, create_all, run)
├── migrate.py               # Altera tabelas existentes (o create_all NÃO altera colunas)
├── requirements.txt
├── .env                     # Variáveis locais (não versionada)
├── .env.development         # Modelo commitado das variáveis
├── infra/                   # Docker Compose do PostgreSQL
└── app/
    ├── __init__.py          # Factory create_app() + registro de blueprints/CORS
    ├── models/              # post, project, link, tag, user, session
    ├── controllers/         # Lógica de cada recurso
    ├── routes/              # Blueprints de rotas
    └── services/            # Twitch (novo)
```

## Models

### Post
| Campo | Tipo | Notas |
|---|---|---|
| `reactions` | JSONB | mapa `{ "🔥": 3 }`, default `{}` |
| `views` | Integer | default `0` |

### Project
| Campo | Tipo | Notas |
|---|---|---|
| `date` | DateTime | default `now` — usado pela timeline; editável no admin |

> **Atenção:** `db.create_all()` só **cria tabelas novas**. Colunas novas em tabelas existentes não são adicionadas automaticamente — por isso existe o `migrate.py`.

## Migrações

```bash
cd api
source venv/bin/activate
python migrate.py
```

O script roda `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` para:
- `posts.reactions` (JSONB)
- `posts.views` (INTEGER)
- `projects.date` (TIMESTAMP)

## Rotas

### CRUD (públicas exceto onde marcado)
| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/posts/` | Lista/pesquisa posts (`q`, `tag`, `page`, `per_page`) |
| GET | `/api/posts/<id|slug>` | Post detalhado (inclui `reactions` e `views`) |
| POST | `/api/posts/` | Cria post (**MASTER**) |
| PUT | `/api/posts/<id>` | Edita post (**MASTER**) |
| DELETE | `/api/posts/<id>` | Deleta post (**MASTER**) |
| GET | `/api/projects/` | Lista projetos — inclui `date` |
| GET | `/api/tags/`, `/api/links/`, `/api/auth/` | Recursos existentes |

### Novas rotas
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/posts/<id\|slug>/view` | Incrementa `views`; retorna `{ views }` |
| POST | `/api/posts/<id\|slug>/reaction` | Body `{ "emoji": "🔥" }`; incrementa e retorna `{ reactions }` |
| GET | `/api/twitch` | Status da live (`{ live: true, title, viewer_count, game_name, started_at }` ou `{ live: false }`) com cache de 60s |
| GET | `/sitemap.xml` | Sitemap baseado em `SITE_URL` |
| GET | `/robots.txt` | Aponta para o sitemap |
| GET | `/feed.xml` | Feed Atom com os 20 posts mais recentes |

Quando `TWITCH_CLIENT_ID/SECRET` estão vazios, `/api/twitch` retorna `{ live: false, error }` sem quebrar nada.

## Novos arquivos criados

- `api/app/routes/meta_routes.py` — sitemap, robots, feed
- `api/app/routes/social_routes.py` — views, reactions, twitch
- `api/app/services/twitch.py` — token de app + consulta `helix/streams` com cache
- `api/migrate.py` — migração das colunas novas