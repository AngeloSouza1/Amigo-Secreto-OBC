import os
from extensions import mail  
from flask import Flask
from dotenv import load_dotenv
from flask_mail import Mail
from models import db
from routes.event import event_bp
from routes.user import user_bp
from flask_cors import CORS
from flask_migrate import Migrate

# Carregar o arquivo config.env especificando o caminho completo
dotenv_path = os.path.join(os.path.dirname(__file__), 'config.env')
if load_dotenv(dotenv_path):
    print(f"DEBUG: Carregado config.env do caminho: {dotenv_path}")
else:
    print(f"DEBUG: Falha ao carregar config.env do caminho: {dotenv_path}")

# Verificar se a variável DATABASE_URL está sendo carregada corretamente
database_url = os.getenv('DATABASE_URL')
if not database_url:
    raise ValueError("Erro: A variável de ambiente 'DATABASE_URL' não foi carregada corretamente.")

# Criação da aplicação Flask
app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem
# Configuração do banco de dados PostgreSQL a partir das variáveis de ambiente
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configurações de E-mail a partir das variáveis de ambiente
mail_server = os.getenv('MAIL_SERVER')
mail_port = os.getenv('MAIL_PORT')
mail_username = os.getenv('MAIL_USERNAME')
mail_password = os.getenv('MAIL_PASSWORD')
mail_use_tls = os.getenv('MAIL_USE_TLS') == 'True'
mail.default_sender = os.getenv('MAIL_DEFAULT')
if not all([mail_server, mail_port, mail_username, mail_password]):
    raise ValueError("Erro: Configurações de e-mail estão incompletas. Verifique o arquivo 'config.env'.")

app.config['MAIL_SERVER'] = mail_server
app.config['MAIL_PORT'] = int(mail_port)
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
app.config['MAIL_USE_TLS'] = mail_use_tls
app.config['MAIL_DEFAULT_SENDER'] = mail.default_sender

# Inicializar a conexão com o banco de dados
db.init_app(app)

# Inicializa o Flask-Migrate
migrate = Migrate(app, db)

# Inicializar Flask-Mail
mail = Mail(app)

# Registrar os Blueprints após a inicialização da aplicação
app.register_blueprint(event_bp)
app.register_blueprint(user_bp)

# Rota básica para a página inicial
@app.route("/")
def home():
    return "Bem-vindo ao Sistema de Amigo Oculto!"

# Criar as tabelas no banco de dados
with app.app_context():
    try:
        db.create_all()
        print("DEBUG: Tabelas criadas com sucesso.")
    except Exception as e:
        print(f"Erro ao criar tabelas: {str(e)}")

# Executar a aplicação Flask
if __name__ == "__main__":
    app.run(debug=True)
