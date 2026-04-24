# 🚀 Portfólio 3D Interativo | Gabriel Yamakishi

<div align="center">
  <img src="public/assets/Portfolio.png" alt="Portfolio Preview" width="800"/>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.x-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![C#](https://img.shields.io/badge/C%23-.NET-512BD4?style=for-the-badge&logo=csharp)](https://dotnet.microsoft.com/)
</div>

---

## 📖 Sobre o Projeto

Portfólio profissional interativo com renderização 3D, internacionalização PT/EN e arquitetura limpa seguindo princípios **SOLID** e **Clean Code**. Desenvolvido para demonstrar habilidades fullstack com foco em **React** e **C# .NET**.

### ✨ Features

- 🎨 **Renderização 3D** com Three.js e React Three Fiber
- 🌍 **Internacionalização** PT/EN com next-intl
- 📱 **Design Responsivo** mobile-first
- 🎬 **Player de Vídeo** integrado
- 📧 **Formulário de Contato** com Resend API
- 🎯 **Navegação Suave** com scroll spy
- 🌙 **Tema Escuro** estilo terminal/dashboard
- 🔒 **Projetos Privados** com placeholder profissional

---

## 🛠️ Stack Tecnológica

### Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.x-black?logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer)

### Backend (Em evolução)

![C#](https://img.shields.io/badge/C%23-.NET-512BD4?logo=csharp)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)
![SQL Server](https://img.shields.io/badge/SQL_Server-2019-CC2927?logo=microsoftsqlserver)

### Ferramentas

![Git](https://img.shields.io/badge/Git-F05032?logo=git)
![Azure](https://img.shields.io/badge/Azure-0078D4?logo=microsoftazure)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel)
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma)

---

## 🏗️ Arquitetura
src/
├── app/ # Next.js App Router
│ ├── [lang]/ # Rotas internacionalizadas (pt/en)
│ └── api/ # API Routes (contato)
├── components/ # Componentes React (Atomic Design)
│ ├── ui/ # Átomos/Moléculas
│ ├── sections/ # Organismos (Hero, Skills, Projects, etc.)
│ ├── layout/ # Header, Footer
│ └── three/ # Componentes 3D
├── data/ # Camada de Dados
│ ├── mocks/ # Dados mockados
│ └── repositories/ # Padrão Repository
├── hooks/ # Custom Hooks
├── i18n/ # Internacionalização
│ ├── request.ts
│ └── routing.ts
├── lib/ # Utilitários e Configurações
│ ├── types.ts # Definições TypeScript
│ ├── constants.ts # Constantes
│ └── utils.ts # Funções helpers
└── messages/ # Arquivos de Tradução
├── pt.json
└── en.json

text

### Princípios Aplicados

| Princípio | Aplicação |
|-----------|-----------|
| **S - Single Responsibility** | Cada componente tem uma única responsabilidade |
| **O - Open/Closed** | Repositórios abertos para extensão, fechados para modificação |
| **L - Liskov Substitution** | Interfaces bem definidas |
| **I - Interface Segregation** | Hooks com responsabilidades específicas |
| **D - Dependency Inversion** | Componentes dependem de abstrações |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/yamakishi/portfolio-2026.git

# Entre na pasta
cd portfolio-2026

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves

# Rode o projeto
npm run dev
Acesse http://localhost:3000

Variáveis de Ambiente
env
# Opcional - Para enviar emails pelo formulário de contato
RESEND_API_KEY=sua_chave_aqui
📂 Projetos em Destaque
🔒 WiseHome Dashboard
Dashboard de automação residencial IoT (código proprietário)

Stack: React, TypeScript, Node.js, SQL Server, Azure

Status: Em produção

📊 E-commerce Analytics
Dashboard analítico para e-commerce

Stack: React, TypeScript, Recharts, Tailwind CSS, Vite

Demo: Ver preview

📫 Contato
Email: gabriel.yamakishi@gmail.com

LinkedIn: linkedin.com/in/gabriel-yamakishi

GitHub: github.com/yamakishi

Portfólio: yamakishi.dev

📜 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

<div align="center"> <p>Construído com 💙 por Gabriel Yamakishi</p> <p>React • Next.js • TypeScript • C# • Azure</p> </div> ```