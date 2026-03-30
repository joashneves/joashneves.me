from flask import Blueprint, jsonify, request
from ..controllers.link_controller import get_all_links, create_link

link_bp = Blueprint('link_bp', __name__)

@link_bp.route('/', methods=['GET'])
def get_links():
    return jsonify(get_all_links())

@link_bp.route('/', methods=['POST'])
def add_link():
    data = request.get_json()
    new_link = create_link(data)
    return jsonify(new_link), 201
