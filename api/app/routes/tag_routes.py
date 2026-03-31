from flask import Blueprint, jsonify, request
from ..controllers.tag_controller import (
    get_all_tags, get_tag_by_id, create_tag, update_tag, delete_tag
)

tag_bp = Blueprint('tag_bp', __name__)

@tag_bp.route('/', methods=['GET'])
def get_tags():
    tags = get_all_tags()
    return jsonify(tags)

@tag_bp.route('/<identifier>', methods=['GET'])
def get_tag(identifier):
    tag = get_tag_by_id(identifier)
    if not tag:
        return jsonify({"error": "Tag not found"}), 404
    return jsonify(tag)

@tag_bp.route('/', methods=['POST'])
def add_tag():
    data = request.get_json()
    new_tag = create_tag(data)
    return jsonify(new_tag), 201

@tag_bp.route('/<identifier>', methods=['PUT'])
def edit_tag(identifier):
    data = request.get_json()
    updated_tag = update_tag(identifier, data)
    if not updated_tag:
        return jsonify({"error": "Tag not found"}), 404
    return jsonify(updated_tag)

@tag_bp.route('/<identifier>', methods=['DELETE'])
def remove_tag(identifier):
    success = delete_tag(identifier)
    if not success:
        return jsonify({"error": "Tag not found"}), 404
    return jsonify({"message": "Tag deleted"}), 200
