import os
import requests
import io
import uuid
from flask import request, jsonify
from PIL import Image

# Configuração do Vercel Blob
VERCEL_BLOB_API = "https://blob.vercel-storage.com"
BLOB_TOKEN = os.getenv("BLOB_READ_WRITE_TOKEN")

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_to_vercel_blob(file_content, filename):
    """Realiza o upload do conteúdo binário para o Vercel Blob Storage."""
    if not BLOB_TOKEN:
        print("[ERROR] BLOB_READ_WRITE_TOKEN não configurado!")
        return None
    
    url = f"{VERCEL_BLOB_API}/{filename}"
    headers = {
        "Authorization": f"Bearer {BLOB_TOKEN}",
        "x-api-version": "1"
    }
    
    try:
        response = requests.put(url, data=file_content, headers=headers)
        if response.status_code == 200:
            return response.json().get("url")
        print(f"[ERROR] Vercel Blob API retornou {response.status_code}: {response.text}")
        return None
    except Exception as e:
        print(f"[ERROR] Erro na requisição ao Vercel Blob: {e}")
        return None

def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({"error": "Nome de arquivo vazio"}), 400

        if file and allowed_file(file.filename):
            # Processa a imagem em memória com Pillow
            img = Image.open(file)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Salva em um buffer (em memória)
            buffer = io.BytesIO()
            img.save(buffer, format="WEBP", quality=80, optimize=True)
            buffer.seek(0)
            
            # Gera um nome único e faz o upload
            unique_filename = f"uploads/{uuid.uuid4().hex}.webp"
            image_url = upload_to_vercel_blob(buffer.getvalue(), unique_filename)

            if not image_url:
                return jsonify({"error": "Falha ao realizar upload para o storage remoto"}), 500

            return jsonify({
                "message": "Upload realizado com sucesso!",
                "url": image_url
            }), 201

        return jsonify({"error": "Formato não suportado"}), 400

    except Exception as e:
        print(f"Erro no Upload: {str(e)}")
        return jsonify({"error": str(e)}), 500
