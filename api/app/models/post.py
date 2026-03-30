from datetime import datetime
from .tag import db;

class Post(db.Model):
    __tablename__ = 'posts'

    # Definição das Colunas
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500))
    content = db.Column(db.Text, nullable=False)  # Text permite strings longas (Markdown)
    tag_ids = db.Column(db.JSON)  # Armazena a lista de IDs como JSON
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title, description, content, tag_ids=None, date=None):
        self.title = title
        self.description = description
        self.content = content
        self.tag_ids = tag_ids or []
        # Garante que a data seja um objeto datetime para o banco
        if isinstance(date, str):
            self.date = datetime.fromisoformat(date)
        else:
            self.date = date or datetime.utcnow()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "content": self.content,
            "tag_ids": self.tag_ids,
            "date": self.date.isoformat() if self.date else None
        }

    def __repr__(self):
        return f'<Post {self.title}>'