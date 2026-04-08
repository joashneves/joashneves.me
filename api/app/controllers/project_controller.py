import os
import re
import uuid
import requests
import io
from flask import request, jsonify
from PIL import Image
from sqlalchemy import or_
from app.models.project import Project, db

# Configuração do Vercel Blob
VERCEL_BLOB_API = "https://blob.vercel-storage.com"
BLOB_TOKEN = os.getenv("BLOB_READ_WRITE_TOKEN")

def is_valid_url(url):
    if not url: return True 
    regex = re.compile(
        r'^https?://' 
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'
        r'localhost|'
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
        r'(?::\d+)?'
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

def upload_to_vercel_blob(file_content, filename):
    """Realiza o upload do conteúdo binário para o Vercel Blob Storage."""
    if not BLOB_TOKEN:
        print("[ERROR] BLOB_READ_WRITE_TOKEN não encontrado! Verifique se o Blob está conectado no painel da Vercel.")
        return None
    
    url = f"{VERCEL_BLOB_API}/{filename}"
    headers = {
        "Authorization": f"Bearer {BLOB_TOKEN}",
        "x-api-version": "1"
    }
    
    try:
        print(f"[DEBUG] Iniciando upload para Vercel Blob: {filename}")
        response = requests.put(url, data=file_content, headers=headers)
        if response.status_code == 200:
            blob_url = response.json().get("url")
            print(f"[SUCCESS] Upload concluído! URL: {blob_url}")
            return blob_url
        print(f"[ERROR] Vercel Blob API retornou {response.status_code}: {response.text}")
        return None
    except Exception as e:
        print(f"[ERROR] Erro na requisição ao Vercel Blob: {e}")
        return None

def delete_from_vercel_blob(url):
    """Remove um arquivo do Vercel Blob Storage via API REST."""
    if not BLOB_TOKEN or not url or "public.blob.vercel-storage.com" not in url:
        return
    
    headers = {
        "Authorization": f"Bearer {BLOB_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {"urls": [url]}
    
    try:
        response = requests.post(f"{VERCEL_BLOB_API}/delete", json=payload, headers=headers)
        if response.status_code == 200:
            print(f"[SUCCESS] Arquivo deletado do Blob: {url}")
        else:
            print(f"[ERROR] Falha ao deletar do Blob ({response.status_code}): {response.text}")
    except Exception as e:
        print(f"[ERROR] Exceção ao deletar do Vercel Blob: {e}")

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
        link_ids = request.form.getlist("link_ids")

        if not title or not repo_link:
            return jsonify({"error": "Título e Link do Repositório são obrigatórios"}), 400

        image_url = ""
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                img = Image.open(file)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                buffer = io.BytesIO()
                img.save(buffer, format="WEBP", quality=80, optimize=True)
                buffer.seek(0)
                
                unique_filename = f"projects/{uuid.uuid4().hex}.webp"
                image_url = upload_to_vercel_blob(buffer.getvalue(), unique_filename) or ""

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
        print(f"Erro no Create Project: {e}")
        return jsonify({"error": "Erro interno ao criar projeto"}), 500

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
                img = Image.open(file)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                buffer = io.BytesIO()
                img.save(buffer, format="WEBP", quality=80, optimize=True)
                buffer.seek(0)
                
                unique_filename = f"projects/{uuid.uuid4().hex}.webp"
                new_url = upload_to_vercel_blob(buffer.getvalue(), unique_filename)
                
                if new_url:
                    if project.image_url:
                        delete_from_vercel_blob(project.image_url)
                    project.image_url = new_url

        db.session.commit()
        return jsonify(project.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        print(f"Erro ao atualizar projeto: {e}")
        return jsonify({"error": "Erro interno ao atualizar projeto"}), 500

def delete_project(identifier):
    try:
        project_data = get_project_by_slug_or_id(identifier)
        if not project_data: return False
        
        project = Project.query.get(project_data['id'])
        
        if project.image_url:
            delete_from_vercel_blob(project.image_url)

        db.session.delete(project)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao deletar projeto: {e}")
        return False
