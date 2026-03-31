from app.models.user import User, Role, db
from index import app
import sys

def create_master(username, email, password):
    with app.app_context():
        # Verifica se já existe
        existing = User.query.filter_by(user=username).first()
        if existing:
            print(f"Erro: Usuário '{username}' já existe.")
            return

        new_master = User(
            user=username,
            email=email,
            senha=password,
            cargo=Role.MASTER
        )
        db.session.add(new_master)
        db.session.commit()
        print(f"Sucesso! Usuário MASTER '{username}' criado.")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python create_master.py <usuario> <email> <senha>")
    else:
        create_master(sys.argv[1], sys.argv[2], sys.argv[3])
