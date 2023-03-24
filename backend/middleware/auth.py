from sanic import Request
from sanic.exceptions import Unauthorized
from components.user.repository import extract_user_from_token

UNPROTECTED_PATHS = [
    '/api/v1/users/login',
    '/api/v1/users/register_user']

async def authentication(request: Request) -> None:
    if request.path in UNPROTECTED_PATHS:
        return
    
    if not request.token:
        raise Unauthorized("JWT token is required.", status_code=401)
    try:
        request.ctx.user = await extract_user_from_token(request.token)
    except:
        raise Unauthorized("JWT token is invalid.", status_code=401)
    return
