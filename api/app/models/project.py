from .tag import db;

class Project(db.Model):
    __tablename__ = 'projects'

    # Definição das Colunas para o Banco de Dados
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    long_description = db.Column(db.Text, nullable=False)
    repo_link = db.Column(db.String(500), nullable=False)
    alternative_link = db.Column(db.String(500), default="")
    image_url = db.Column(db.String(500), default="")
    
    # IDs de links relacionados (armazenados como JSON para flexibilidade)
    link_ids = db.Column(db.JSON)

    def __init__(self, title, long_description, repo_link, alternative_link="", link_ids=None, image_url=""):
        # O id é gerado automaticamente pelo banco, então não o incluímos no init
        self.title = title
        self.long_description = long_description
        self.repo_link = repo_link
        self.alternative_link = alternative_link
        self.link_ids = link_ids or []
        self.image_url = image_url

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "long_description": self.long_description,
            "repo_link": self.repo_link,
            "alternative_link": self.alternative_link,
            "link_ids": self.link_ids,
            "image_url": self.image_url
        }

    def __repr__(self):
        return f'<Project {self.title}>'