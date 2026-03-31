import uuid
import re
from .tag import db

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    text = text.strip('-')
    return text

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(150), nullable=False)
    long_description = db.Column(db.Text, nullable=False)
    repo_link = db.Column(db.String(500), nullable=False)
    alternative_link = db.Column(db.String(500), default="")
    image_url = db.Column(db.String(500), default="")
    link_ids = db.Column(db.JSON) # List of UUID strings

    def __init__(self, title, long_description, repo_link, alternative_link="", link_ids=None, image_url="", slug=None):
        self.title = title
        self.slug = slug or slugify(title)
        self.long_description = long_description
        self.repo_link = repo_link
        self.alternative_link = alternative_link
        self.link_ids = link_ids or []
        self.image_url = image_url

    def to_dict(self):
        return {
            "id": str(self.id),
            "slug": self.slug,
            "title": self.title,
            "long_description": self.long_description,
            "repo_link": self.repo_link,
            "alternative_link": self.alternative_link,
            "link_ids": self.link_ids,
            "image_url": self.image_url
        }

    def __repr__(self):
        return f'<Project {self.title}>'
