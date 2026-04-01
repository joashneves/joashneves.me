import os
from flask import request, jsonify, current_app
from PIL import Image
import uuid

# Define o caminho base do projeto (um nível acima da pasta 'app')
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")

# Garante que a pasta exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "Nome de arquivo vazio"}), 400
        
        if file and allowed_file(file.filename):
            unique_filename = f"{uuid.uuid4().hex}.webp"
            filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
            
            # Processa a imagem com Pillow
            img = Image.open(file)
            
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Salva como WebP comprimido
            img.save(filepath, "WEBP", quality=80, optimize=True)
            
            # Retorna a URL relativa para o front-end
            # Ajustado para bater com a rota de servir estáticos
            host = request.host_url.rstrip('/')
            image_url = f"{host}/static/uploads/{unique_filename}"
            
            return jsonify({
                "message": "Upload realizado com sucesso!",
                "url": image_url
            }), 201
            
        return jsonify({"error": "Formato não suportado"}), 400

    except Exception as e:
        print(f"Erro no Upload: {str(e)}") # Log para o terminal
        return jsonify({"error": str(e)}), 500
