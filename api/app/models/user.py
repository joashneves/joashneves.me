import uuid
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from .tag import db

class Role:
    MASTER = 'MASTER'
    ADMIN = 'ADMIN'
    USER = 'USER'

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    user = db.Column(db.String(80), unique=True, nullable=False) # username
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(256), nullable=False)
    cargo = db.Column(db.String(20), nullable=False, default=Role.USER)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user, email, senha, cargo=Role.USER):
        self.user = user
        self.email = email
        self.set_senha(senha)
        self.cargo = cargo

    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def check_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)

    def to_dict(self):
        return {
            "id": str(self.id),
            "user": self.user,
            "email": self.email,
            "cargo": self.cargo,
            "created_at": self.created_at.isoformat()
        }

    def __repr__(self):
        return f'<User {self.user}>'
