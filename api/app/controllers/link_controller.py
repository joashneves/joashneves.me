from flask import request
from ..models.link import Link

links_db = []

def get_all_links():
    query = request.args.get('q', '').lower()
    tag_id = request.args.get('tag', type=int)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    filtered = links_db
    if query:
        filtered = [l for l in filtered if query in l.title.lower() or query in l.description.lower()]
    if tag_id:
        filtered = [l for l in filtered if tag_id in l.tag_ids]

    start = (page - 1) * per_page
    end = start + per_page
    
    return {
        "items": [l.to_dict() for l in filtered[start:end]],
        "total": len(filtered),
        "page": page,
        "per_page": per_page
    }

def create_link(data):
    new_link = Link(
        id=len(links_db) + 1,
        title=data.get("title"),
        description=data.get("description", ""),
        url=data.get("url"),
        tag_ids=data.get("tag_ids", [])
    )
    links_db.append(new_link)
    return new_link.to_dict()
