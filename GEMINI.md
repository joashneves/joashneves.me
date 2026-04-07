# Projeto: Blog Pessoal (Joashneves.me)

## 🚀 Principais Novidades (Recentes)
- **Experiência de Terminal Digital:** Implementação do componente `<EstiloDigital>` com efeito typewriter e cursor piscante.
- **Mensagens Dinâmicas:** Sistema de boas-vindas rotativo a cada 30 minutos e saudações automáticas para datas comemorativas (Natal, Páscoa, etc).
- **Refatoração Visual com CSS Modules:** Todos os cards (`LinkCard`, `PostCard`, `ProjectCard`) migrados para CSS Modules com design unificado e efeitos de hover.
- **Botões Inteligentes:** Componente `Button` com detecção automática de links (GitHub vs Externos) e ícones contextuais.
- **Gestão de Storage Física:** O back-end agora apaga fisicamente os arquivos `.webp` anteriores do servidor em operações de atualização e deleção.
- **Interface Baseada em Sidebar:** Layout reformulado seguindo o design do PDF, com barra lateral fixa à esquerda.

---

## Arquitetura da API (Back-end)
- **Framework:** Flask (MVC).
- **Processamento de Imagem:** Pillow para conversão automática para `.webp` (qualidade 80).
- **Banco de Dados:** PostgreSQL (SQLAlchemy) com UUIDs nativos.
- **Segurança:** Cookies HTTP-only e senhas criptografadas.

## Front-end (Vite + React)
- **Gerenciamento de Estado/Cache:** `SWR` para dados em tempo real.
- **Estilo:** CSS Modules + Variáveis Globais (GitHub Dark Theme).
- **Markdown:** Renderização completa com `react-markdown` e `remark-gfm`.

## Funcionalidades Implementadas
- **Busca e Filtros:** Pesquisa global por texto e tags via UUID.
- **Paginação:** Suporte nativo em todas as rotas (10 itens/página).
- **Upload Atômico:** Envio unificado via `FormData` com limpeza automática de arquivos órfãos.

## Roadmap / Próximos Passos
- [x] Implementar persistência de dados real (PostgreSQL/SQLAlchemy).
- [x] Implementar sistema de autenticação via Cookies HTTP-only.
- [x] Implementar sistema de exclusão física de arquivos de imagem.
- [x] Criar componente de animação terminal (EstiloDigital).
- [ ] Configurar o encurtador de links no modelo `Link`.
- [ ] Implementar sistema de comentários ou visualizações nos posts.
