from flask import Flask, send_from_directory, redirect, jsonify, request
from flask_cors import CORS
from sqlalchemy import text
import os
import re

def create_app():
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    STATIC_DIR = os.path.join(BASE_DIR, "static")

    app = Flask(__name__, static_folder=STATIC_DIR)
    
    # URL do front-end permitida (CORS) e para redirecionamento
    FRONT_URL = os.getenv('FRONT_URL', 'http://localhost:5173')
    
    # Configuração de CORS muito mais flexível para Vercel
    CORS(app, 
         supports_credentials=True, 
         origins=[
             FRONT_URL, 
             "http://localhost:5173", 
             "http://127.0.0.1:5173", 
             "http://localhost:3000",
             re.compile(r"https://.*\.vercel\.app"), # Permite qualquer subdomínio da Vercel
             re.compile(r"https://joashneves\.me")    # Domínio principal
         ],
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

    @app.route('/api/setup', methods=['POST'])
    def setup():
        """Rota protegida para inicializar o banco e provisionar o MASTER."""
        setup_token = request.headers.get('X-Setup-Token')
        master_pass = os.getenv('MASTER_PASSWORD')

        if not setup_token or setup_token != master_pass:
            return jsonify({"error": "Unauthorized"}), 401

        from .models.tag import db
        from .models.user import User, Role
        from .models import link, post, project, tag, user, session
        
        try:
            db.create_all()
            
            # Provisionamento do Usuário MASTER
            master_user = os.getenv('MASTER_USER')
            master_email = os.getenv('MASTER_EMAIL')
            
            if master_user and master_email and master_pass:
                existing = User.query.filter_by(cargo=Role.MASTER).first()
                if not existing:
                    new_master = User(
                        user=master_user,
                        email=master_email,
                        senha=master_pass,
                        cargo=Role.MASTER
                    )
                    db.session.add(new_master)
                    db.session.commit()
                    return jsonify({"status": "success", "message": f"Database initialized and MASTER user '{master_user}' created."}), 201
                else:
                    return jsonify({"status": "success", "message": "Database checked. MASTER user already exists."}), 200
            
            return jsonify({"status": "success", "message": "Database initialized."}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @app.route('/static/uploads/<path:filename>')
    def serve_upload(filename):
        uploads_path = os.path.join(STATIC_DIR, "uploads")
        return send_from_directory(uploads_path, filename)

    @app.route('/api/status')
    def status():
        try:
            from .models.tag import db
            db.session.execute(text('SELECT 1'))
            return jsonify({
                "status": "online",
                "database": "connected",
                "version": "1.3.2"
            }), 200
        except Exception as e:
            error_msg = str(e) if os.getenv('FLASK_ENV') == 'development' else "Database connection failed"
            return jsonify({
                "status": "online",
                "database": "error",
                "message": error_msg
            }), 500

    @app.route('/')
    def index():
        return redirect(FRONT_URL)

    @app.errorhandler(404)
    def handle_404(e):
        if not request.path.startswith('/api/'):
            return redirect(FRONT_URL)
        return jsonify({"error": "Resource not found"}), 404

    return app
