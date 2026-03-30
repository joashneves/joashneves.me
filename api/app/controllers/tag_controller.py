from ..models.tag import Tag

tags_db = []

def get_all_tags():
    return [tag.to_dict() for tag in tags_db]

def create_tag(data):
    new_tag = Tag(
        id=len(tags_db) + 1,
        name=data.get("name")
    )
    tags_db.append(new_tag)
    return new_tag.to_dict()
