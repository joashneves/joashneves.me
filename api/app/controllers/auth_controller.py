import secrets
import uuid
from datetime import datetime, timedelta
from flask import make_response, request, jsonify
from app.models.user import User
from app.models.session import Session, db

def login(data):
    user_input = data.get("user")
    senha = data.get("senha")
    
    # Busca por username ou email
    user = User.query.filter((User.user == user_input) | (User.email == user_input)).first()
    print(user)
    if not user or not user.check_senha(senha):
        return jsonify({"error": "Usuário ou senha inválidos"}), 401
    
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
    
    response.set_cookie(
        "session_token",
        token,
        httponly=True,
        secure=False, # Mudar para True em produção (HTTPS)
        samesite='Lax', # Mudar para None em produção se API e Front forem subdomínios diferentes
        expires=expires_at,
        path='/' # Garante que o cookie esteja disponível em todas as rotas da API
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
