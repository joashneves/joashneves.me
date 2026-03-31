from flask import Blueprint
from ..controllers.upload_controller import upload_image
from ..utils.auth import requires_role
from ..models.user import Role

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/', methods=['POST'])
@requires_role(Role.MASTER)
def handle_upload():
    return upload_image()
