from functools import wraps
from flask import jsonify, request
from ..controllers.auth_controller import get_current_user_from_token

def requires_role(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            print(f"VERIFICANDO AUTH PARA: {request.path} [{request.method}]")
            user = get_current_user_from_token()
            print(f"User : {user}")
            if not user:
                print(f"BLOQUEADO: {request.path} - Usuário não logado")
                return jsonify({"error": "Autenticação necessária"}), 401
            
            if user.cargo != required_role:
                print(f"BLOQUEADO: {request.path} - Permissão insuficiente ({user.cargo} != {required_role})")
                return jsonify({"error": "Acesso negado: permissão insuficiente"}), 403
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator
