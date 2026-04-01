from flask import Flask, send_from_directory
from flask_cors import CORS
import os

def create_app():
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    STATIC_DIR = os.path.join(BASE_DIR, "static")

    app = Flask(__name__, static_folder=STATIC_DIR)
    
    # Configuração de CORS centralizada e robusta
    CORS(app, 
         supports_credentials=True, 
         origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
         allow_headers=["Content-Type", "Authorization", "Accept"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    # Import Blueprints
    from .routes.post_routes import post_bp
    from .routes.tag_routes import tag_bp
    from .routes.link_routes import link_bp
    from .routes.project_routes import project_bp
    from .routes.upload_routes import upload_bp
    from .routes.auth_routes import auth_bp

    # Register Blueprints
    app.register_blueprint(post_bp, url_prefix='/api/posts')
    app.register_blueprint(tag_bp, url_prefix='/api/tags')
    app.register_blueprint(link_bp, url_prefix='/api/links')
    app.register_blueprint(project_bp, url_prefix='/api/projects')
    app.register_blueprint(upload_bp, url_prefix='/api/upload')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.route('/static/uploads/<path:filename>')
    def serve_upload(filename):
        uploads_path = os.path.join(STATIC_DIR, "uploads")
        return send_from_directory(uploads_path, filename)

    @app.route('/')
    def index():
        return {"message": "Hello World! API is online and running."}

    return app
