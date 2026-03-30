from datetime import datetime

class Link:
    def __init__(self, id, title, description, url, tag_ids=None, date=None):
        self.id = id
        self.title = title
        # Limitando a descrição a 400 caracteres
        self.description = description[:400]
        self.url = url
        self.tag_ids = tag_ids or []
        self.date = date or datetime.now().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "url": self.url,
            "tag_ids": self.tag_ids
        }
