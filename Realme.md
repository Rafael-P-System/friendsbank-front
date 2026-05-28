# 💳 Friends Bank - Front-End (Premium Web Application)

O **Friends Bank** é uma aplicação web bancária exclusiva com um design sofisticado e interface premium inspirada em cartões Gold/Vip. O projeto foi desenvolvido em React utilizando Vite e estilizado com Tailwind CSS, proporcionando uma experiência de usuário (UX) fluida, moderna e totalmente responsiva.

---

## 🚀 Demonstração Online

A aplicação está hospedada e disponível para testes na Vercel! Você pode interagir com o sistema simulado diretamente pelo link abaixo:

👉 **[Acesse o Friends Bank na Vercel](SUBSTITUA_PELO_SEU_LINK_DA_VERCEL)**

---

## ✨ Funcionalidades do Dashboard (Ambiente Simulado)

Para viabilizar a visualização pública e segura do portfólio na nuvem, esta versão gerencia as operações diretamente no estado do componente (`useState`), operando de forma 100% interativa sem dependências externas:

* **🔒 Autenticação Exclusiva:** Tela de login para acesso à área VIP.
* **💸 Envio de Pix:** Simulação de transferências digitando chaves Pix ou QR Codes, atualizando o saldo instantaneamente.
* **📄 Pagamento de Boletos:** Linha digitável de código de barras para quitação de faturas de consumo.
* **📊 Extrato em Tempo Real:** Histórico dinâmico e consolidado das transações financeiras realizadas na sessão.
* **💳 Visualização Premium:** Componente visual interativo simulando um cartão Mastercard Gold personalizado com o nome do titular e número de conta.
* **📈 Crédito Pré-Aprovado:** Seção especial para simulação de empréstimo pessoal com taxas Gold exclusivas.

---

## 🛠️ Tecnologias Utilizadas

O ecossistema de desenvolvimento do front-end conta com ferramentas modernas do mercado de software:

* **React** (Biblioteca para construção da interface declarativa)
* **TypeScript** (Tipagem estática para maior segurança e robustez do código)
* **Vite** (Build tool ultrarrápido para desenvolvimento local moderno)
* **Tailwind CSS** (Framework utilitário para estilização avançada e transições fluidas)
* **Lucide React** (Pacote de ícones minimalistas e modernos)

---

## 📦 Como rodar o projeto localmente

Caso queira clonar este repositório e executá-lo em sua máquina, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Rafael-P-System/NOME_DESTE_REPOSITORIO.git](https://github.com/Rafael-P-System/NOME_DESTE_REPOSITORIO.git)
Acesse a pasta do projeto:

Bash
cd friendsbank-front
Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento local:

Bash
npm run dev
Acesse no navegador:
O terminal gerará um link local, geralmente disponível em http://localhost:5173.

📁 Organização dos Módulos (Arquitetura)
Plaintext
src/
├── Components/    # Componentes globais e estruturais do layout
├── Sceens/        # Telas completas da aplicação (Login, Dashboard)
├── Types/         # Definições de interfaces e tipos TypeScript
├── api/           # Configurações de serviços e conexões de rede (Axios)
├── App.tsx        # Componente raiz e gerenciador de rotas internas
└── main.tsx       # Ponto de entrada da aplicação
👤 Autor
Rafael Pimentel da Silva - Desenvolvedor do Projeto - Meu GitHub

Developed with 💛 for Portfolio.