import os
from dotenv import load_dotenv
from app import create_app
from app.models.tag import db

load_dotenv()

# Cria a aplicação usando a factory
app = create_app()

# Configurações do banco (garantindo que o db.init_app aconteça aqui)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Executa a criação das tabelas e provisionamento apenas se rodar localmente
if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()
            print("Banco de dados local verificado!")
        except Exception as e:
            print(f"Erro ao iniciar banco local: {e}")
    
    app.run(debug=True, host="0.0.0.0", port=5000)
