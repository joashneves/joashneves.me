import os
import time
import requests

TWITCH_API = "https://api.twitch.tv/helix"
TWITCH_AUTH = "https://id.twitch.tv/oauth2/token"
TWITCH_USER = os.getenv("TWITCH_USER", "")

_token = None
_token_expires_at = 0
_stream_cache = None
_stream_cache_until = 0


def _get_app_token():
    global _token, _token_expires_at

    client_id = os.getenv("TWITCH_CLIENT_ID", "")
    client_secret = os.getenv("TWITCH_CLIENT_SECRET", "")

    if not client_id or not client_secret:
        return None

    now = time.time()
    if _token and _token_expires_at > now + 60:
        return _token

    try:
        resp = requests.post(
            TWITCH_AUTH,
            params={
                "client_id": client_id,
                "client_secret": client_secret,
                "grant_type": "client_credentials",
            },
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()
        _token = data["access_token"]
        _token_expires_at = now + data.get("expires_in", 3600)
        return _token
    except Exception as e:
        print(f"[ERROR] Falha ao obter token da Twitch: {e}")
        return None


def get_live_status(refresh=False):
    """Retorna o status da live do canal configurado, com cache de 60s."""
    global _stream_cache, _stream_cache_until

    client_id = os.getenv("TWITCH_CLIENT_ID", "")
    if not client_id or not TWITCH_USER:
        return {"live": False, "error": "Twitch não configurado"}

    now = time.time()
    if not refresh and _stream_cache and _stream_cache_until > now:
        return _stream_cache

    token = _get_app_token()
    if not token:
        return {"live": False, "error": "Falha ao autenticar na Twitch"}

    try:
        resp = requests.get(
            f"{TWITCH_API}/streams",
            params={"user_login": TWITCH_USER},
            headers={"Client-ID": client_id, "Authorization": f"Bearer {token}"},
            timeout=10,
        )
        resp.raise_for_status()
        streams = resp.json().get("data", [])

        if streams:
            stream = streams[0]
            _stream_cache = {
                "live": True,
                "title": stream.get("title", ""),
                "viewer_count": stream.get("viewer_count", 0),
                "game_name": stream.get("game_name", ""),
                "started_at": stream.get("started_at", ""),
            }
        else:
            _stream_cache = {"live": False}

        _stream_cache_until = now + 60
        return _stream_cache
    except Exception as e:
        print(f"[ERROR] Falha ao consultar status da Twitch: {e}")
        return {"live": False, "error": str(e)}