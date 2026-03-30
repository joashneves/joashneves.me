from flask import request
from app.models.post import Post, db
from sqlalchemy import or_

def get_all_posts():
    # Parâmetros de busca e paginação
    query_text = request.args.get('q', '').lower()
    tag_id = request.args.get('tag', type=int)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Iniciando a query no banco de dados
    stmt = Post.query

    # Filtro de busca (Título, Descrição ou até mesmo no conteúdo Markdown)
    if query_text:
        stmt = stmt.filter(
            or_(
                Post.title.ilike(f"%{query_text}%"),
                Post.description.ilike(f"%{query_text}%"),
                Post.content.ilike(f"%{query_text}%") # Agora podemos buscar dentro do texto do post!
            )
        )

    # Filtro por Tag (usando o campo JSON que configuramos)
    if tag_id:
        stmt = stmt.filter(Post.tag_ids.contains([tag_id]))

    # Ordenar por data (mais recentes primeiro)
    stmt = stmt.order_by(Post.date.desc())

    # Paginação nativa
    pagination = stmt.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "items": [p.to_dict() for p in pagination.items],
        "total": pagination.total,
        "page": pagination.page,
        "per_page": pagination.per_page,
        "pages": pagination.pages
    }

def create_post(data):
    # Criando o post no banco (o ID é gerado automaticamente)
    new_post = Post(
        title=data.get("title"),
        description=data.get("description"),
        content=data.get("content"), # Conteúdo Markdown
        tag_ids=data.get("tag_ids", []),
        date=data.get("date") # Opcional, se não enviado o modelo usa datetime.utcnow
    )
    
    db.session.add(new_post)
    db.session.commit()
    
    return new_post.to_dict()