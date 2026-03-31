from flask import Blueprint, jsonify, request
from ..controllers.project_controller import (
    get_all_projects, get_project_by_slug_or_id, create_project, update_project, delete_project
)
from ..utils.auth import requires_role
from ..models.user import Role

project_bp = Blueprint('project_bp', __name__)

@project_bp.route('/', methods=['GET'])
def get_projects():
    return jsonify(get_all_projects())

@project_bp.route('/<identifier>', methods=['GET'])
def get_project(identifier):
    project = get_project_by_slug_or_id(identifier)
    if not project:
        return jsonify({"error": "Project not found"}), 404
    return jsonify(project)

@project_bp.route('/', methods=['POST'])
@requires_role(Role.MASTER)
def add_project():
    return create_project()

@project_bp.route('/<identifier>', methods=['PUT'])
@requires_role(Role.MASTER)
def edit_project(identifier):
    return update_project(identifier)

@project_bp.route('/<identifier>', methods=['DELETE'])
@requires_role(Role.MASTER)
def remove_project(identifier):
    success = delete_project(identifier)
    if not success:
        return jsonify({"error": "Project not found"}), 404
    return jsonify({"message": "Project deleted"}), 200
