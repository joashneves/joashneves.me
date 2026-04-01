import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from app import create_app
from app.models.tag import db
from app.models import link, post, project, tag, user, session

load_dotenv()

app = create_app()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://admin:admin@localhost:5432/blog')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# O CORS agora é configurado centralmente dentro do create_app()

if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()
            print("Banco de dados conectado e tabelas verificadas!")
            
            # Auto-provisionamento do Usuário MASTER
            from app.models.user import User, Role
            master_user = os.getenv('MASTER_USER')
            master_email = os.getenv('MASTER_EMAIL')
            master_pass = os.getenv('MASTER_PASSWORD')
            
            if master_user and master_email and master_pass:
                print("CRIANDO USUARIO MASTER...")
                existing = User.query.filter_by(cargo=Role.MASTER).first()
                if not existing:
                    print(f"Provisionando usuário MASTER: {master_user}...")
                    new_master = User(
                        user=master_user,
                        email=master_email,
                        senha=master_pass,
                        cargo=Role.MASTER
                    )
                    db.session.add(new_master)
                    db.session.commit()
                    print("Usuário MASTER criado com sucesso!")
                else:
                    print(f"Usuário MASTER '{existing.user}' já existe.")

        except Exception as e:
            print(f"Erro ao conectar no banco ou provisionar MASTER: {e}")

    app.run(debug=True, host="0.0.0.0", port=5000)