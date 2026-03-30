from flask import Blueprint, jsonify, request
from ..controllers.tag_controller import get_all_tags, create_tag

tag_bp = Blueprint('tag_bp', __name__)

@tag_bp.route('/', methods=['GET'])
def get_tags():
    return jsonify(get_all_tags())

@tag_bp.route('/', methods=['POST'])
def add_tag():
    data = request.get_json()
    new_tag = create_tag(data)
    return jsonify(new_tag), 201
