from flask import request
from app.models.post import Post, db
from sqlalchemy import or_
import uuid

def get_all_posts():
    query_text = request.args.get('q', '').lower()
    tag_id = request.args.get('tag') # Agora como string (UUID)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    stmt = Post.query

    if query_text:
        stmt = stmt.filter(
            or_(
                Post.title.ilike(f"%{query_text}%"),
                Post.description.ilike(f"%{query_text}%"),
                Post.content.ilike(f"%{query_text}%")
            )
        )

    if tag_id:
        # Verifica se o tag_id é um UUID válido para evitar erros na query JSON
        try:
            # Mantendo como string, mas garantindo que o formato é UUID se necessário
            # SQLAlchemy handles UUID objects or strings depending on driver
            stmt = stmt.filter(Post.tag_ids.contains([tag_id]))
        except ValueError:
            pass

    stmt = stmt.order_by(Post.date.desc())
    pagination = stmt.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "items": [p.to_dict() for p in pagination.items],
        "total": pagination.total,
        "page": pagination.page,
        "per_page": pagination.per_page,
        "pages": pagination.pages
    }

def get_post_by_slug_or_id(identifier):
    # Tenta buscar por UUID primeiro, se falhar, busca por slug
    post = None
    try:
        val = uuid.UUID(identifier)
        post = Post.query.get(val)
    except (ValueError, TypeError):
        post = Post.query.filter_by(slug=identifier).first()
    
    return post.to_dict() if post else None

def create_post(data):
    new_post = Post(
        title=data.get("title"),
        description=data.get("description"),
        content=data.get("content"),
        tag_ids=data.get("tag_ids", []),
        date=data.get("date"),
        slug=data.get("slug")
    )
    
    db.session.add(new_post)
    db.session.commit()
    
    return new_post.to_dict()

def update_post(identifier, data):
    post_data = get_post_by_slug_or_id(identifier)
    if not post_data:
        return None
    
    post = Post.query.get(post_data['id'])
    post.title = data.get("title", post.title)
    post.description = data.get("description", post.description)
    post.content = data.get("content", post.content)
    post.tag_ids = data.get("tag_ids", post.tag_ids)
    post.slug = data.get("slug", post.slug)
    
    db.session.commit()
    return post.to_dict()

def delete_post(identifier):
    post_data = get_post_by_slug_or_id(identifier)
    if not post_data:
        return False
    
    post = Post.query.get(post_data['id'])
    db.session.delete(post)
    db.session.commit()
    return True
