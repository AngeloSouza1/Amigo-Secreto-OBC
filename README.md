# 🎉🎁 Sistema de Sorteio de Amigo Oculto


<div align="justify"> O <strong>Sistema de Sorteio de Amigo Oculto</strong> é uma aplicação web interativa desenvolvida em <strong>React</strong> e <strong>Flask</strong>. Ela facilita a organização de sorteios de amigo oculto, permitindo a criação de eventos, registro de participantes, envio automático de e-mails com os sorteados e muito mais! A interface intuitiva e dinâmica proporciona uma experiência simples e eficiente para organizadores e participantes.</div>

### 💻 Sobre o projeto

---

<div align="justify"> Esta aplicação completa foi desenvolvida para gerenciar eventos de amigo oculto de maneira fácil e automatizada. Desde a criação de eventos, registro de participantes, sorteio dos pares e envio de notificações por e-mail, o sistema cuida de todos os detalhes importantes.</div>

#### 👁️‍🗨️ Funcionalidades Principais

🔹 Criação de Eventos:

   - Cadastre um evento fornecendo o nome do evento, e-mail do organizador e uma senha secreta.

🔹 Registro de Participantes:

   - Adicione participantes com nome, e-mail e preferências de presentes.

🔹 Sorteio Automático:

   - Realize o sorteio automaticamente para associar cada participante a um amigo oculto.

🔹 Envio de E-mails:

   - Notificações automáticas por e-mail com os detalhes do sorteado e sugestões de presentes.

🔹 Autenticação por Senha:

   - Antes de visualizar, editar ou excluir um evento, o organizador deve desbloquear as opções com a senha cadastrada.

🔹 Temas Claro e Escuro:

   - Alterne entre temas claro e escuro para uma experiência visual personalizada.

🔹 Interface Dinâmica e Animada:

   - Animações e efeitos visuais tornam a interação mais envolvente e divertida.
</div>

#### 🛠 Tecnologias utilizadas

Frontend:

  ⚛️ React: Construção da interface do usuário.
   
  💅 Bootstrap: Estilização e componentes responsivos.
   
  ✨ Animate.css: Animações interativas.

Backend:

  🐍 Flask: Framework web para a lógica do servidor.
  
  📧 Flask-Mail: Envio de e-mails automatizados.
  
  📦 SQLAlchemy: ORM para manipulação do banco de dados.
  
  🔧 Flask-Migrate: Migrações do banco de dados.

Outras Bibliotecas:

  🔹 Gunicorn: Servidor WSGI para execução do Flask.
 
  🔹 Flask-Cors: Suporte para requisições CORS.
 
  🔹 dotenv: Gerenciamento de variáveis de ambiente.

---

### 💡 Veja!

🔹 Video Demonstrativo:



https://github.com/user-attachments/assets/1daae171-8e00-4a62-bd27-cd55e2ab0ebb



---

### 🔧 Como Executar o Projeto

Pré-requisitos

🔹 Python 3.11+ instalado no sistema.

🔹 Node.js e npm instalados no sistema.

Passo a Passo

🔹 Clone o repositório ou faça o download do código.

```
git clone https://github.com/AngeloSouza1/sistema-amigo-oculto.git
cd sistema-amigo-oculto
```


🔹 Configure o Backend:
 - Crie e ative um ambiente virtual:

```
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```
 - Instale as dependências do backend:
 ```
pip install -r requirements.txt
```
 - Defina as variáveis de ambiente no arquivo config.env:
 ```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu-email@gmail.com
MAIL_PASSWORD=sua-senha
MAIL_USE_TLS=True
SECRET_KEY=sua-chave-secreta

```
 - Execute as migrações do banco de dados:
 ```
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

```
🔹 Configure o Backend:
```
PYTHONPATH=backend gunicorn backend.app:app
```
O servidor será iniciado em http://127.0.0.1:8000.

🔹 Configure o Frontend:
 - Instale as dependências do frontend:
 ```
cd frontend
npm install

```
- Inicie o frontend:
 ```
npm start

```
A aplicação estará disponível em http://localhost:3000.

---

### 🎨 Design da Interface

🔹 Temas: Suporte para temas claro e escuro.

🔹 Botões Animados: Efeitos de hover e feedback visual.

🔹 Formulários Dinâmicos: Validação de entrada com mensagens de erro animadas.

🔹 Notificações: Mensagens de sucesso e erro exibidas no rodapé.

---

### 🤝🏻 Contribuição

Contribuições são bem-vindas! Se você quiser contribuir para o projeto, siga estas etapas:

🔹 Faça um fork do projeto.

🔹 Crie uma nova branch com a sua feature: git checkout -b minha-feature

🔹 Faça commit das suas alterações: git commit -m 'Adicionar nova feature'

🔹 Faça push para a branch: git push origin minha-feature

🔹 Envie um pull request.

---

### Licença

Este projeto é licenciado sob a MIT License.

---

### 📧 Contato

Para mais informações ou para relatar problemas, entre em contato:

  🔹  E-mail: angeloafdesouza@gmail.com

  🔹  GitHub: AngeloSouza1

---
<br>
🚀 Divirta-se organizando seus sorteios de amigo oculto! 🎁

