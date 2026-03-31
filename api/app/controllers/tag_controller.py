import uuid
from app.models.tag import Tag, db

def get_all_tags():
    tags = Tag.query.all()
    return [tag.to_dict() for tag in tags]

def get_tag_by_id(identifier):
    try:
        val = uuid.UUID(identifier)
        tag = Tag.query.get(val)
        return tag.to_dict() if tag else None
    except (ValueError, TypeError):
        return None

def create_tag(data):
    new_tag = Tag(
        name=data.get("name")
    )
    db.session.add(new_tag)
    db.session.commit()
    return new_tag.to_dict()

def update_tag(identifier, data):
    try:
        val = uuid.UUID(identifier)
        tag = Tag.query.get(val)
        if not tag:
            return None
        
        tag.name = data.get("name", tag.name)
        db.session.commit()
        return tag.to_dict()
    except (ValueError, TypeError):
        return None

def delete_tag(identifier):
    try:
        val = uuid.UUID(identifier)
        tag = Tag.query.get(val)
        if not tag:
            return False
        
        db.session.delete(tag)
        db.session.commit()
        return True
    except (ValueError, TypeError):
        return False
