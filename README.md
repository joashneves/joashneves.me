# 🚀 Joashneves.me - Blog Pessoal & Portfólio

Este é o repositório do meu blog pessoal e portfólio, desenvolvido para ser uma plataforma centralizada de conteúdo, projetos e links úteis. O sistema conta com uma interface moderna baseada em Sidebar, sistema de gerenciamento de conteúdo (CMS) próprio e autenticação robusta.

---

## ✨ Funcionalidades Principais

- **Interface Moderna:** Layout inspirado no GitHub Dark, com barra lateral fixa e estrutura responsiva.
- **Gestão de Conteúdo (CMS):**
  - **Posts:** Suporte a Markdown completo com renderização dinâmica.
  - **Projetos:** Exibição de portfólio com upload de imagens e links externos.
  - **Links:** Encurtador e agregador de links úteis.
- **Sistema de Slugs:** URLs amigáveis (ex: `/post/titulo-do-post`) geradas automaticamente.
- **Segurança & Autenticação:**
  - Cookies HTTP-only para sessões seguras.
  - Diferentes níveis de acesso (MASTER, ADMIN, USER).
  - Provisionamento automático do usuário MASTER via `.env`.
- **Performance:** Processamento de imagens automático para o formato `.webp` com compressão.
- **Busca e Filtros:** Pesquisa global por texto e filtragem por Tags em tempo real (utilizando UUIDs).

---

## 🛠️ Tecnologias Utilizadas

### Back-end (API)
- **Linguagem:** Python 3.x
- **Framework:** Flask
- **Banco de Dados:** PostgreSQL (SQLAlchemy ORM)
- **Processamento de Imagem:** Pillow (WebP conversion)
- **Segurança:** Werkzeug (Hashing de senhas)
- **Deploy:** Preparado para Vercel/Docker

### Front-end
- **Framework:** React 19 (Vite)
- **Estilização:** CSS Modules (Variáveis Globais)
- **Gerenciamento de Estado/Cache:** SWR (Stale-While-Revalidate)
- **Roteamento:** React Router Dom
- **Markdown:** React-markdown, rehype-raw, remark-gfm
- **Interface:** PrimeIcons e PrimeReact (componentes selecionados)

---

## 📂 Estrutura do Projeto

```text
/
├── api/                # Servidor Flask (Back-end)
│   ├── app/            # Lógica central (Models, Controllers, Routes)
│   ├── infra/          # Configurações de Docker/Compose
│   └── static/uploads/ # Armazenamento de imagens processadas
└── front-end/          # Interface React (Vite)
    ├── src/components/ # Componentes reutilizáveis
    ├── src/hooks/      # Hooks customizados (Auth, etc)
    └── src/pages/      # Páginas da aplicação
```

---

## 🚀 Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/joashneves.me.git
cd joashneves.me
```

### 2. Configurar o Back-end
```bash
cd api
python -m venv venv
source venv/bin/activate  # Linux/macOS
# No Windows: venv\Scripts\activate
pip install -r requirements.txt
```
- Crie um arquivo `.env` baseado no `.env.development`.
- O usuário MASTER será criado automaticamente ao iniciar o banco de dados.

### 3. Configurar o Front-end
```bash
cd ../front-end
npm install
npm run dev
```

---

## ⚙️ Variáveis de Ambiente

### API (.env)
- `DATABASE_URL`: Conexão com o PostgreSQL.
- `SECRET_KEY`: Chave para assinatura de sessões.
- `MASTER_USER`: Nome do usuário administrador inicial.
- `MASTER_PASS`: Senha do usuário administrador inicial.

---

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
*Desenvolvido por [Joash Neves](https://github.com/joashneves).*
