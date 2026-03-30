from flask import Blueprint
from ..controllers.upload_controller import upload_image

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/', methods=['POST'])
def handle_upload():
    return upload_image()
