from functools import wraps
from flask import jsonify
from ..controllers.auth_controller import get_current_user_from_token

def requires_role(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user = get_current_user_from_token()
            if not user:
                return jsonify({"error": "Autenticação necessária"}), 401
            
            if user.cargo != required_role:
                return jsonify({"error": "Acesso negado: permissão insuficiente"}), 403
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator
