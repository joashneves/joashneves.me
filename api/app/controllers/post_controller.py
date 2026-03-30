from flask import request
from ..models.post import Post

posts_db = []

def get_all_posts():
    query = request.args.get('q', '').lower()
    tag_id = request.args.get('tag', type=int)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    filtered = posts_db
    if query:
        filtered = [p for p in filtered if query in p.title.lower() or query in p.description.lower()]
    if tag_id:
        filtered = [p for p in filtered if tag_id in p.tag_ids]

    start = (page - 1) * per_page
    end = start + per_page
    
    return {
        "items": [p.to_dict() for p in filtered[start:end]],
        "total": len(filtered),
        "page": page,
        "per_page": per_page
    }

def create_post(data):
    new_post = Post(
        id=len(posts_db) + 1,
        title=data.get("title"),
        description=data.get("description"),
        content=data.get("content"),
        tag_ids=data.get("tag_ids", [])
    )
    posts_db.append(new_post)
    return new_post.to_dict()
