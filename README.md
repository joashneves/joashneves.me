# 🚀 Joashneves.me - Blog Pessoal & Portfólio

Este é o repositório do meu blog pessoal e portfólio, desenvolvido para ser uma plataforma centralizada de conteúdo, projetos e links úteis. O sistema conta com uma interface moderna inspirada em terminais digitais e uma arquitetura robusta.

---

## ✨ Funcionalidades Incríveis

### ⌨️ Experiência Digital (Terminal Style)
- **Efeito de Digitação:** Componente `<EstiloDigital>` que simula um terminal escrevendo letra por letra com cursor piscante.
- **Saudações Dinâmicas:** Mensagens de boas-vindas que mudam a cada 30 minutos (como *"allons-y alonso"*, *"seja bem vindos"*, *"AAAAAAA!!!!"*) e saudações especiais para datas como Natal, Ano Novo e Páscoa.

### 🛠️ Gestão de Conteúdo (CMS)
- **Cards Inteligentes:** Componentes de Post, Link e Projeto refatorados com CSS Modules e efeitos de hover sincronizados.
- **Botões Contextuais:** O componente de botão detecta automaticamente URLs do GitHub para exibir ícones de repositório ou links genéricos.
- **Limpeza Automática:** O servidor apaga fisicamente as imagens antigas quando você atualiza ou deleta um projeto, mantendo o armazenamento otimizado.

---

## 🛠️ Tecnologias Utilizadas

### Back-end (API)
- **Linguagem:** Python 3.x (Flask)
- **Banco de Dados:** PostgreSQL (SQLAlchemy ORM)
- **Processamento de Imagem:** Pillow (WebP conversion)
- **Segurança:** Cookies HTTP-only & Werkzeug Hashing
- **Deploy:** Preparado para Vercel/Docker

### Front-end
- **Framework:** React 19 (Vite)
- **Estilização:** CSS Modules (GitHub Dark Theme)
- **Gerenciamento de Cache:** SWR (Stale-While-Revalidate)
- **Roteamento:** React Router Dom
- **Markdown:** React-markdown, rehype-raw, remark-gfm

---

## 📂 Estrutura do Projeto

```text
/
├── api/                # Servidor Flask (Back-end)
│   ├── app/            # Lógica central (Models, Controllers, Routes)
│   ├── infra/          # Configurações de Docker/Compose
│   └── static/uploads/ # Armazenamento de imagens otimizadas (.webp)
└── front-end/          # Interface React (Vite)
    ├── src/components/ # Componentes (DigitalStyle, Card, Button, etc)
    ├── src/utils/      # Utilitários (Mensagens dinâmicas, etc)
    └── src/pages/      # Páginas da aplicação
```

---

## 🚀 Como Rodar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/joashneves/joashneves.me.git
cd joashneves.me
```

### 2. Configurar o Back-end
```bash
cd api
python -m venv venv
source venv/bin/activate  # Linux/macOS
pip install -r requirements.txt
```
- Configure o `.env` com seu `DATABASE_URL` e credenciais `MASTER_USER`.

### 3. Configurar o Front-end
```bash
cd ../front-end
npm install
npm run dev
```

---

## 📄 Licença
Este projeto está sob a licença MIT.

---
*Desenvolvido com ☕ e 🐍 por [Joash Neves](https://github.com/joashneves).*
