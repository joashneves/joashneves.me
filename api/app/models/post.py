from datetime import datetime

class Post:
    def __init__(self, id, title, description, content, tag_ids=None, date=None):
        self.id = id
        self.title = title
        self.description = description
        self.content = content  # Markdown content
        self.tag_ids = tag_ids or []
        self.date = date or datetime.now().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "content": self.content,
            "tag_ids": self.tag_ids,
            "date": self.date
        }
