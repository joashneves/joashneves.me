import uuid
from datetime import datetime
from .tag import db

class Link(db.Model):
    __tablename__ = 'links'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(400))
    url = db.Column(db.String(500), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    tag_ids = db.Column(db.JSON) # List of UUID strings

    def __init__(self, title, description, url, tag_ids=None, date=None):
        self.title = title
        self.description = description[:400] if description else ""
        self.url = url
        self.tag_ids = tag_ids or []
        self.date = date or datetime.utcnow()

    def to_dict(self):
        return {
            "id": str(self.id),
            "title": self.title,
            "description": self.description,
            "url": self.url,
            "tag_ids": self.tag_ids,
            "date": self.date.isoformat() if self.date else None
        }

    def __repr__(self):
        return f'<Link {self.title}>'
