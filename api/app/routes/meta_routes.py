from datetime import datetime, timezone
from flask import Blueprint, Response, jsonify
from xml.sax.saxutils import escape
import os

from ..models.post import Post

meta_bp = Blueprint('meta_bp', __name__)

SITE_URL = os.getenv('SITE_URL', 'http://localhost:5173').rstrip('/')

STATIC_ROUTES = [
    {"loc": "/", "priority": "1.0", "changefreq": "weekly"},
    {"loc": "/sobre", "priority": "0.9", "changefreq": "monthly"},
    {"loc": "/projetos", "priority": "0.8", "changefreq": "weekly"},
    {"loc": "/links", "priority": "0.6", "changefreq": "monthly"},
]

def _lastmod(iso_date):
    try:
        dt = datetime.fromisoformat(iso_date)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.strftime("%Y-%m-%d")
    except (TypeError, ValueError):
        return ""


@meta_bp.route('/sitemap.xml', methods=['GET'])
def sitemap():
    posts = Post.query.order_by(Post.date.desc()).all()

    urls = list(STATIC_ROUTES)
    urls.extend(
        {"loc": f"/post/{p.slug}", "priority": "0.8", "changefreq": "monthly", "lastmod": _lastmod(p.date.isoformat()) if p.date else ""}
        for p in posts
    )

    xml_items = []
    for u in urls:
        item = f"  <url>\n    <loc>{SITE_URL}{escape(u['loc'])}</loc>\n"
        if u.get("lastmod"):
            item += f"    <lastmod>{u['lastmod']}</lastmod>\n"
        item += f"    <priority>{u['priority']}</priority>\n    <changefreq>{u['changefreq']}</changefreq>\n  </url>"
        xml_items.append(item)

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(xml_items)
        + "\n</urlset>"
    )
    return Response(xml, mimetype="application/xml")


@meta_bp.route('/robots.txt', methods=['GET'])
def robots():
    txt = f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n"
    return Response(txt, mimetype="text/plain")


@meta_bp.route('/feed.xml', methods=['GET'])
def atom_feed():
    posts = Post.query.order_by(Post.date.desc()).limit(20).all()

    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    entries = []
    for p in posts:
        if not p.date:
            continue
        updated = p.date.replace(tzinfo=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        link = f"{SITE_URL}/post/{escape(p.slug)}"
        title = escape(p.title)
        summary = escape((p.description or "")[:300])
        entries.append(
            "  <entry>\n"
            f"    <title>{title}</title>\n"
            f"    <link href=\"{link}\"/>\n"
            f"    <id>{link}</id>\n"
            f"    <updated>{updated}</updated>\n"
            f"    <published>{updated}</published>\n"
            f"    <summary>{summary}</summary>\n"
            "  </entry>"
        )

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<feed xmlns="http://www.w3.org/2005/Atom">\n'
        f"  <title>{escape('Joash Neves')}</title>\n"
        f"  <link href=\"{SITE_URL}/feed.xml\" rel=\"self\"/>\n"
        f"  <link href=\"{SITE_URL}/\"/>\n"
        f"  <updated>{now}</updated>\n"
        f"  <id>{SITE_URL}/</id>\n"
        + "\n".join(entries)
        + "\n</feed>"
    )
    return Response(xml, mimetype="application/atom+xml")