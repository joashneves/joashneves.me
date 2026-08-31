from flask import Blueprint, jsonify, request

from ..controllers.post_controller import (
    increment_view_by_identifier, add_reaction_by_identifier
)
from ..services.twitch import get_live_status

social_bp = Blueprint('social_bp', __name__)


@social_bp.route('/posts/<identifier>/view', methods=['POST'])
def register_view(identifier):
    post = increment_view_by_identifier(identifier)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"views": post.get("views", 0)}), 200


@social_bp.route('/posts/<identifier>/reaction', methods=['POST'])
def react_to_post(identifier):
    data = request.get_json(silent=True) or {}
    emoji = data.get("emoji", "")
    if not emoji:
        return jsonify({"error": "Emoji é obrigatório"}), 400
    post = add_reaction_by_identifier(identifier, emoji)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"reactions": post.get("reactions", {})}), 200


@social_bp.route('/twitch', methods=['GET'])
def twitch_status():
    refresh = request.args.get('refresh') == '1'
    return jsonify(get_live_status(refresh=refresh))