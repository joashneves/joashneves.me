from app.models.tag import Tag, db  # Importamos o Tag e o db (SQLAlchemy)

def get_all_tags():
    # Busca todas as tags diretamente no banco de dados
    tags = Tag.query.all()
    return [tag.to_dict() for tag in tags]

def create_tag(data):
    # Criamos a instância apenas com o nome
    new_tag = Tag(
        name=data.get("name")
    )
    
    # Adicionamos ao banco e confirmamos (commit)
    db.session.add(new_tag)
    db.session.commit()
    
    return new_tag.to_dict()