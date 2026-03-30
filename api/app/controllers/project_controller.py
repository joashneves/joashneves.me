import os
import re
import uuid
from flask import request, jsonify
from PIL import Image
from sqlalchemy import or_
from app.models.project import Project, db

# Configuração de caminhos (Mantido para o upload funcionar)
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def is_valid_url(url):
    if not url: return True 
    regex = re.compile(
        r'^https?://' # Simplificado para focar em http/https
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'
        r'localhost|'
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
        r'(?::\d+)?'
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

def get_all_projects():
    query_text = request.args.get('q', '').lower()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 6, type=int)

    stmt = Project.query

    if query_text:
        stmt = stmt.filter(
            or_(
                Project.title.ilike(f"%{query_text}%"),
                Project.long_description.ilike(f"%{query_text}%")
            )
        )

    pagination = stmt.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "items": [p.to_dict() for p in pagination.items],
        "total": pagination.total,
        "page": pagination.page,
        "per_page": pagination.per_page,
        "pages": pagination.pages
    }

def create_project():
    try:
        # Usando request.form pois projects costumam enviar arquivos + texto (multipart/form-data)
        title = request.form.get("title")
        long_description = request.form.get("long_description")
        repo_link = request.form.get("repo_link")
        alternative_link = request.form.get("alternative_link", "")
        
        if not title or not repo_link:
            return jsonify({"error": "Título e Link do Repositório são obrigatórios"}), 400

        if not is_valid_url(repo_link) or (alternative_link and not is_valid_url(alternative_link)):
            return jsonify({"error": "Um ou mais links informados são inválidos"}), 400

        image_url = ""
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                unique_filename = f"{uuid.uuid4().hex}.webp"
                filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
                
                img = Image.open(file)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(filepath, "WEBP", quality=80, optimize=True)
                
                # URL Dinâmica em vez de 127.0.0.1 fixa
                host = request.host_url.rstrip('/')
                image_url = f"{host}/static/uploads/{unique_filename}"

        # Criando no banco de dados
        new_project = Project(
            title=title,
            long_description=long_description,
            repo_link=repo_link,
            alternative_link=alternative_link,
            image_url=image_url
        )
        
        db.session.add(new_project)
        db.session.commit()
        
        return jsonify(new_project.to_dict()), 201

    except Exception as e:
        db.session.rollback() # Cancela a operação no banco se o upload falhar
        print(f"Erro no Project Controller: {e}")
        return jsonify({"error": "Erro interno ao criar projeto"}), 500