import uuid
from datetime import datetime
from .tag import db

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(
        db.Uuid, 
        primary_key=True, 
        default=uuid.uuid4
    )
    token = db.Column(db.String(96), nullable=False, unique=True)
    user_id = db.Column(db.Uuid, db.ForeignKey('users.id'), nullable=False)
    expires_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relacionamento com o usuário
    user_rel = db.relationship('User', backref=db.backref('sessions', lazy=True))

    def __repr__(self):
        return f'<Session {self.token}>'
