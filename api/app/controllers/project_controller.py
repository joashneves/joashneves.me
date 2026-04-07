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

def get_project_by_slug_or_id(identifier):
    project = None
    try:
        val = uuid.UUID(identifier)
        project = Project.query.get(val)
    except (ValueError, TypeError):
        project = Project.query.filter_by(slug=identifier).first()
    
    return project.to_dict() if project else None

def create_project():
    try:
        title = request.form.get("title")
        long_description = request.form.get("long_description")
        repo_link = request.form.get("repo_link")
        alternative_link = request.form.get("alternative_link", "")
        slug = request.form.get("slug")
        link_ids = request.form.getlist("link_ids") # Se enviado como múltiplos campos

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
                
                host = request.host_url.rstrip('/')
                image_url = f"{host}/static/uploads/{unique_filename}"

        new_project = Project(
            title=title,
            long_description=long_description,
            repo_link=repo_link,
            alternative_link=alternative_link,
            image_url=image_url,
            slug=slug,
            link_ids=link_ids
        )
        
        db.session.add(new_project)
        db.session.commit()
        
        return jsonify(new_project.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print(f"Erro no Project Controller: {e}")
        return jsonify({"error": "Erro interno ao criar projeto"}), 500

def delete_file_from_url(url):
    """Remove o arquivo físico do servidor a partir da sua URL estática."""
    if not url or "static/uploads/" not in url:
        return
    try:
        filename = url.split('/')[-1]
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        if os.path.exists(filepath):
            os.remove(filepath)
    except Exception as e:
        print(f"Erro ao deletar arquivo físico ({url}): {e}")

def update_project(identifier):
    try:
        project_data = get_project_by_slug_or_id(identifier)
        if not project_data:
            return jsonify({"error": "Projeto não encontrado"}), 404
        
        project = Project.query.get(project_data['id'])
        
        project.title = request.form.get("title", project.title)
        project.long_description = request.form.get("long_description", project.long_description)
        project.repo_link = request.form.get("repo_link", project.repo_link)
        project.alternative_link = request.form.get("alternative_link", project.alternative_link)
        project.slug = request.form.get("slug", project.slug)
        
        if "link_ids" in request.form:
            project.link_ids = request.form.getlist("link_ids")

        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                # Remove a imagem antiga antes de salvar a nova
                if project.image_url:
                    delete_file_from_url(project.image_url)

                unique_filename = f"{uuid.uuid4().hex}.webp"
                filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
                
                img = Image.open(file)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(filepath, "WEBP", quality=80, optimize=True)
                
                host = request.host_url.rstrip('/')
                project.image_url = f"{host}/static/uploads/{unique_filename}"

        db.session.commit()
        return jsonify(project.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        print(f"Erro ao atualizar projeto: {e}")
        return jsonify({"error": "Erro interno ao atualizar projeto"}), 500

def delete_project(identifier):
    try:
        project_data = get_project_by_slug_or_id(identifier)
        if not project_data:
            return False
        
        project = Project.query.get(project_data['id'])
        
        # Remove o arquivo físico da imagem antes de deletar o registro
        if project.image_url:
            delete_file_from_url(project.image_url)

        db.session.delete(project)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao deletar projeto: {e}")
        return False
