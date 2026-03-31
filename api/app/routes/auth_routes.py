from flask import Blueprint, request, jsonify
from ..controllers.auth_controller import login, logout, get_current_user_from_token

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def auth_login():
    data = request.get_json()
    return login(data)

@auth_bp.route('/logout', methods=['POST'])
def auth_logout():
    return logout()

@auth_bp.route('/me', methods=['GET'])
def auth_me():
    user = get_current_user_from_token()
    if not user:
        return jsonify({"logged_in": False}), 200
    return jsonify({"logged_in": True, "user": user.to_dict()}), 200
