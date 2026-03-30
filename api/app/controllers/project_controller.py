import os
import re
from flask import request, jsonify
from PIL import Image
import uuid
from ..models.project import Project

# Configuração de caminhos
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

projects_db = []

def is_valid_url(url):
    if not url: return True # Link opcional
    regex = re.compile(
        r'^(?:http|ftp)s?://'
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'
        r'localhost|'
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
        r'(?::\d+)?'
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

def get_all_projects():
    query = request.args.get('q', '').lower()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 6, type=int)
    filtered = [p for p in projects_db if query in p.title.lower() or query in p.long_description.lower()]
    start = (page - 1) * per_page
    end = start + per_page
    return {
        "items": [p.to_dict() for p in filtered[start:end]],
        "total": len(filtered),
        "page": page,
        "per_page": per_page
    }

def create_project():
    try:
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
                image_url = f"http://127.0.0.1:5000/static/uploads/{unique_filename}"

        new_project = Project(
            id=len(projects_db) + 1,
            title=title,
            long_description=long_description,
            repo_link=repo_link,
            alternative_link=alternative_link,
            image_url=image_url
        )
        
        projects_db.append(new_project)
        return jsonify(new_project.to_dict()), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
