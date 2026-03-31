# Projeto: Blog Pessoal (Joashneves.me)

## 🚀 Principais Novidades (Recentes)
- **Interface Baseada em Sidebar:** Layout reformulado seguindo o design do PDF, com barra lateral fixa à esquerda e estrutura de conteúdo em grid.
- **Identificadores Únicos (UUID):** Migração de IDs numéricos para UUID em todos os modelos (`User`, `Post`, `Project`, `Link`, `Tag`), garantindo maior segurança e escalabilidade.
- **Sistema de Slugs:** Implementação de URLs amigáveis (ex: `/post/titulo-do-post`) geradas automaticamente a partir do título para Posts e Projetos.
- **Autenticação MASTER Autônoma:** O sistema agora provisiona automaticamente o usuário MASTER a partir do arquivo `.env` durante a inicialização do banco de dados.

---

## Arquitetura da API (Back-end)
- **Framework:** Flask
- **Estrutura:** MVC (Models, Controllers, Routes).
- **Hospedagem:** Preparada para Vercel.
- **Processamento de Imagem:** Utiliza Pillow para converter uploads para `.webp` com compressão (qualidade 80).
- **Banco de Dados:** PostgreSQL (SQLAlchemy).
- **Segurança:** Cookies HTTP-only para sessões e senhas criptografadas com `werkzeug.security`.

## Modelos de Dados (Atualizado para UUID)
1. **User:** `id` (UUID), `user` (username), `email`, `senha_hash`, `cargo` (MASTER/ADMIN/USER).
2. **Tag:** `id` (UUID), `name`.
3. **Link:** `id` (UUID), `title`, `description` (400 chars), `url`, `tag_ids`.
4. **Post:** `id` (UUID), `slug` (Unique), `title`, `description`, `content` (Markdown), `tag_ids`, `date`.
5. **Project:** `id` (UUID), `slug` (Unique), `title`, `long_description`, `repo_link`, `alternative_link`, `image_url`, `link_ids`.

## Front-end (Vite + React)
- **Roteamento:** `react-router-dom` com rotas públicas e administrativas.
- **Proteção de Rotas:** Componente `ProtectedRoute` que valida o cargo do usuário via `useAuth`.
- **Gerenciamento de Estado/Cache:** `SWR` com mutação de cache instantânea para logins mais fluidos.
- **Estilo:** CSS Modules + Variáveis Globais (baseado no tema GitHub Dark).
- **Interface:** Layout inspirado no design PDF com Sidebar vertical e menus contextuais.

## Funcionalidades Implementadas
- **Busca e Filtros:** Pesquisa por texto e filtro por tags em tempo real via UUID.
- **Paginação:** Suporte a paginação nativa no Front e Back (10 itens por página).
- **Login Silencioso:** Acesso ao painel administrativo manual via URL, sem botões visíveis no site público.
- **Upload Atômico:** Envio unificado de dados e imagem via `FormData` para Projetos.
- **Markdown:** Renderização completa de posts usando `react-markdown`.

## Roadmap / Próximos Passos
- [x] Implementar persistência de dados real (PostgreSQL/SQLAlchemy).
- [x] Implementar sistema de autenticação via Cookies HTTP-only.
- [x] Implementar sistema de Cargos (Master/Admin).
- [ ] Configurar o encurtador de links no modelo `Link`.
- [ ] Implementar sistema de comentários ou visualizações nos posts.
