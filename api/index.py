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

CORS(app, resources={r"/api/*": {"origins": "*"}})

if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()
            print("Banco de dados conectado e tabelas verificadas!")
        except Exception as e:
            print(f"Erro ao conectar no banco: {e}")

    app.run(debug=True, host="0.0.0.0", port=5000)