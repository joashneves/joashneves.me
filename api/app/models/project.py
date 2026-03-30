class Project:
    def __init__(self, id, title, long_description, repo_link, alternative_link="", link_ids=None, image_url=""):
        self.id = id
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
