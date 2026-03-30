from flask import Blueprint, jsonify, request
from ..controllers.project_controller import get_all_projects, create_project

project_bp = Blueprint('project_bp', __name__)

@project_bp.route('/', methods=['GET'])
def get_projects():
    return jsonify(get_all_projects())

@project_bp.route('/', methods=['POST'])
def add_project():
    return create_project()
