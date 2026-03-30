# Projeto: Blog Pessoal (Joashneves.me)

Este é um projeto de blog com Front-end em Vite + React e Back-end em Flask, focado em simplicidade, performance (WebP) e hospedagem na Vercel.

## Arquitetura da API (Back-end)
- **Framework:** Flask
- **Estrutura:** MVC (Models, Controllers, Routes).
- **Hospedagem:** Preparada para Vercel.
- **Processamento de Imagem:** Utiliza Pillow para converter uploads para `.webp` com compressão (qualidade 80).
- **Banco de Dados:** Atualmente em memória (Listas).

## Modelos de Dados
1. **Tag:** `id`, `name`.
2. **Link:** `id`, `title`, `description` (400 chars), `url`, `tag_ids`.
3. **Post:** `id`, `title`, `description`, `content` (Markdown), `tag_ids`, `date`.
4. **Project:** `id`, `title`, `long_description`, `repo_link` (GitHub/GitLab), `alternative_link` (Demo/Site), `image_url` (WebP), `link_ids`.

## Front-end (Vite + React)
- **Roteamento:** `react-router-dom` com rotas públicas e administrativas.
- **Gerenciamento de Estado/Cache:** `SWR` para consumo da API.
- **Estilo:** CSS Modules + Variáveis Globais (baseado no tema GitHub Dark).
- **Componentização:** 
    - `Navbar` e `Footer` globais.
    - Componentes de UI Administrativa (`AdminForms`, `ItemList`, `SearchFilters`).
    - Componentes Públicos (`PostCard`, `LinkCard`, `ProjectCard`, `SearchBar`, `TagFilter`, `Pagination`).

## Funcionalidades Implementadas
- **Busca e Filtros:** Pesquisa por texto e filtro por tags em tempo real (Home e Links).
- **Paginação:** Suporte a paginação tanto no Front quanto no Back (10 itens por página).
- **Upload Atômico:** Envio unificado de dados e imagem via `FormData` para Projetos.
- **Validação:** Verificação de URLs no Back-end antes de salvar.
- **Markdown:** Renderização completa de posts usando `react-markdown`.

## Roadmap / Próximos Passos
- [ ] Implementar persistência de dados real (PostgreSQL/SQLAlchemy ou Supabase).
- [ ] Implementar sistema de autenticação (JWT ou Supabase Auth) para o `/adm`.
- [ ] Configurar o encurtador de links no modelo `Link`.
- [ ] Finalizar a integração de Tags nos Posts (exibição no card).
