from flask import Blueprint, jsonify, request
from ..controllers.link_controller import (
    get_all_links, get_link_by_id, create_link, update_link, delete_link
)
from ..utils.auth import requires_role
from ..models.user import Role

link_bp = Blueprint('link_bp', __name__)

@link_bp.route('/', methods=['GET'])
def get_links():
    return jsonify(get_all_links())

@link_bp.route('/<identifier>', methods=['GET'])
def get_link(identifier):
    link = get_link_by_id(identifier)
    if not link:
        return jsonify({"error": "Link not found"}), 404
    return jsonify(link)

@link_bp.route('/', methods=['POST'])
@requires_role(Role.MASTER)
def add_link():
    data = request.get_json()
    new_link = create_link(data)
    return jsonify(new_link), 201

@link_bp.route('/<identifier>', methods=['PUT'])
@requires_role(Role.MASTER)
def edit_link(identifier):
    data = request.get_json()
    updated_link = update_link(identifier, data)
    if not updated_link:
        return jsonify({"error": "Link not found"}), 404
    return jsonify(updated_link)

@link_bp.route('/<identifier>', methods=['DELETE'])
@requires_role(Role.MASTER)
def remove_link(identifier):
    success = delete_link(identifier)
    if not success:
        return jsonify({"error": "Link not found"}), 404
    return jsonify({"message": "Link deleted"}), 200
