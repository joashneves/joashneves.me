from flask import request
from app.models.link import Link, db
from sqlalchemy import or_

def get_all_links():
    # Pegando os parâmetros da URL
    query_text = request.args.get('q', '').lower()
    tag_id = request.args.get('tag', type=int)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Iniciando a Query
    stmt = Link.query

    # Filtragem por texto (Busca no Título ou Descrição)
    if query_text:
        stmt = stmt.filter(
            or_(
                Link.title.ilike(f"%{query_text}%"),
                Link.description.ilike(f"%{query_text}%")
            )
        )

    # Filtragem por Tag (Considerando que tag_ids é um campo JSON)
    if tag_id:
        # No SQLAlchemy, para buscar dentro de um JSON:
        stmt = stmt.filter(Link.tag_ids.contains([tag_id]))

    # Paginação nativa do Flask-SQLAlchemy
    pagination = stmt.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "items": [l.to_dict() for l in pagination.items],
        "total": pagination.total,
        "page": pagination.page,
        "per_page": pagination.per_page,
        "pages": pagination.pages
    }

def create_link(data):
    # Criando a instância sem passar o ID manualmente
    new_link = Link(
        title=data.get("title"),
        description=data.get("description", ""),
        url=data.get("url"),
        tag_ids=data.get("tag_ids", [])
    )
    
    db.session.add(new_link)
    db.session.commit()
    
    return new_link.to_dict()