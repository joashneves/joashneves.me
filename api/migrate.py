"""Migration única: adiciona colunas novas que o db.create_all() NÃO cria em tabelas existentes.

Uso: source venv/bin/activate && python migrate.py
"""
import os

import dotenv

dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))


def run():
    from app import create_app
    from app.models.tag import db
    from sqlalchemy import text

    app = create_app()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        statements = [
            "ALTER TABLE posts ADD COLUMN IF NOT EXISTS reactions JSONB DEFAULT '{}'::jsonb",
            "ALTER TABLE posts ADD COLUMN IF NOT EXISTS views INTEGER NOT NULL DEFAULT 0",
            "ALTER TABLE projects ADD COLUMN IF NOT EXISTS date TIMESTAMP",
        ]
        for stmt in statements:
            try:
                db.session.execute(text(stmt))
                print(f"[OK] {stmt}")
            except Exception as e:
                db.session.rollback()
                print(f"[ERRO] {stmt}\n  -> {e}")

        db.session.commit()
        print("Migração concluída.")


if __name__ == "__main__":
    run()