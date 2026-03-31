import uuid
import re
from datetime import datetime
from .tag import db

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = text.strip('-')
    return text

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500))
    content = db.Column(db.Text, nullable=False)
    tag_ids = db.Column(db.JSON) # List of UUID strings
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title, description, content, tag_ids=None, date=None, slug=None):
        self.title = title
        self.slug = slug or slugify(title)
        self.description = description
        self.content = content
        self.tag_ids = tag_ids or []
        if isinstance(date, str):
            self.date = datetime.fromisoformat(date)
        else:
            self.date = date or datetime.utcnow()

    def to_dict(self):
        return {
            "id": str(self.id),
            "slug": self.slug,
            "title": self.title,
            "description": self.description,
            "content": self.content,
            "tag_ids": self.tag_ids,
            "date": self.date.isoformat() if self.date else None
        }

    def __repr__(self):
        return f'<Post {self.title}>'
