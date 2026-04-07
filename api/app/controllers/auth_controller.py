import secrets
import uuid
from datetime import datetime, timedelta
from flask import make_response, request, jsonify
from app.models.user import User
from app.models.session import Session, db

def login(data):
    user_input = data.get("user")
    senha = data.get("senha")
    
    print(f"[DEBUG] Tentativa de login: {user_input}")
    
    # Busca por username ou email (case-insensitive para e-mail é boa prática)
    user = User.query.filter((User.user == user_input) | (User.email == user_input)).first()
    
    if not user:
        print(f"[DEBUG] Usuário '{user_input}' não encontrado no banco.")
        return jsonify({"error": "Usuário ou senha inválidos"}), 401
    
    if not user.check_senha(senha):
        print(f"[DEBUG] Senha incorreta para o usuário: {user_input}")
        return jsonify({"error": "Usuário ou senha inválidos"}), 401
    
    print(f"[DEBUG] Login bem-sucedido: {user_input} (Cargo: {user.cargo})")
    
    # Criar token de sessão (96 caracteres aleatórios)
    token = secrets.token_urlsafe(72)
    
    # Expira em 7 dias
    expires_at = datetime.utcnow() + timedelta(days=7)
    
    new_session = Session(
        token=token,
        user_id=user.id,
        expires_at=expires_at
    )
    
    db.session.add(new_session)
    db.session.commit()
    
    # Criar resposta com Cookie HTTP-only
    response = make_response(jsonify({
        "message": "Login realizado com sucesso",
        "user": user.to_dict()
    }))

    # Configuração de Cookie para Desenvolvimento/Produção
    # samesite='None' com secure=True é a forma mais compatível com navegadores modernos
    # mesmo que em HTTP local, o Chrome trata 'localhost' como contexto seguro.
    response.set_cookie(
        "session_token",
        token,
        httponly=True,
        secure=True,     # Tentar True mesmo em HTTP local para permitir SameSite=None
        samesite='None', # Permite envio entre portas diferentes (localhost:5173 -> localhost:5000)
        expires=expires_at,
        path='/'
    )
    
    return response

def logout():
    token = request.cookies.get("session_token")
    if token:
        session = Session.query.filter_by(token=token).first()
        if session:
            db.session.delete(session)
            db.session.commit()
            
    response = make_response(jsonify({"message": "Logout realizado"}))
    response.set_cookie("session_token", "", expires=0)
    return response

def get_current_user_from_token():
    token = request.cookies.get("session_token")
    if not token:
        return None
        
    session = Session.query.filter_by(token=token).first()
    if not session or session.expires_at < datetime.utcnow():
        return None
        
    return User.query.get(session.user_id)
