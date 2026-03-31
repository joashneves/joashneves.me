import uuid
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(50), nullable=False, unique=True)

    def __init__(self, name):
        self.name = name

    def to_dict(self):
        return {
            "id": str(self.id),
            "name": self.name
        }

    def __repr__(self):
        return f'<Tag {self.name}>'
