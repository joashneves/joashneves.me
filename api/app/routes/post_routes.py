from flask import Blueprint, jsonify, request
from ..controllers.post_controller import get_all_posts, create_post

post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/', methods=['GET'])
def get_posts():
    posts = get_all_posts()
    return jsonify(posts)

@post_bp.route('/', methods=['POST'])
def add_post():
    data = request.get_json()
    new_post = create_post(data)
    return jsonify(new_post), 201
