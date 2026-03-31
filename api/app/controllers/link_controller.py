import uuid
from flask import request, jsonify
from app.models.link import Link, db
from sqlalchemy import or_

def get_all_links():
    query_text = request.args.get('q', '').lower()
    tag_id = request.args.get('tag') # Agora como string (UUID)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    stmt = Link.query

    if query_text:
        stmt = stmt.filter(
            or_(
                Link.title.ilike(f"%{query_text}%"),
                Link.description.ilike(f"%{query_text}%")
            )
        )

    if tag_id:
        try:
            # Garante que estamos buscando o UUID no JSON
            stmt = stmt.filter(Link.tag_ids.contains([tag_id]))
        except Exception:
            pass

    pagination = stmt.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "items": [l.to_dict() for l in pagination.items],
        "total": pagination.total,
        "page": pagination.page,
        "per_page": pagination.per_page,
        "pages": pagination.pages
    }

def get_link_by_id(identifier):
    link = None
    try:
        val = uuid.UUID(identifier)
        link = Link.query.get(val)
    except (ValueError, TypeError):
        return None
    
    return link.to_dict() if link else None

def create_link(data):
    new_link = Link(
        title=data.get("title"),
        description=data.get("description", ""),
        url=data.get("url"),
        tag_ids=data.get("tag_ids", [])
    )
    
    db.session.add(new_link)
    db.session.commit()
    
    return new_link.to_dict()

def update_link(identifier, data):
    try:
        val = uuid.UUID(identifier)
        link = Link.query.get(val)
        if not link:
            return None
        
        link.title = data.get("title", link.title)
        link.description = data.get("description", link.description)
        link.url = data.get("url", link.url)
        link.tag_ids = data.get("tag_ids", link.tag_ids)
        
        db.session.commit()
        return link.to_dict()
    except (ValueError, TypeError):
        return None

def delete_link(identifier):
    try:
        val = uuid.UUID(identifier)
        link = Link.query.get(val)
        if not link:
            return False
        
        db.session.delete(link)
        db.session.commit()
        return True
    except (ValueError, TypeError):
        return False
