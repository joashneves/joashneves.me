from flask import Blueprint, jsonify, request
from ..controllers.post_controller import (
    get_all_posts, get_post_by_slug_or_id, create_post, update_post, delete_post
)
from ..utils.auth import requires_role
from ..models.user import Role

post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/', methods=['GET'])
def get_posts():
    posts = get_all_posts()
    return jsonify(posts)

@post_bp.route('/<identifier>', methods=['GET'])
def get_post(identifier):
    post = get_post_by_slug_or_id(identifier)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    return jsonify(post)

@post_bp.route('/', methods=['POST'])
@requires_role(Role.MASTER)
def add_post():
    data = request.get_json()
    new_post = create_post(data)
    return jsonify(new_post), 201

@post_bp.route('/<identifier>', methods=['PUT'])
@requires_role(Role.MASTER)
def edit_post(identifier):
    data = request.get_json()
    updated_post = update_post(identifier, data)
    if not updated_post:
        return jsonify({"error": "Post not found"}), 404
    return jsonify(updated_post)

@post_bp.route('/<identifier>', methods=['DELETE'])
@requires_role(Role.MASTER)
def remove_post(identifier):
    success = delete_post(identifier)
    if not success:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"message": "Post deleted"}), 200

