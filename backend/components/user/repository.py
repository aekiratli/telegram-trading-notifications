import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from components.user.exceptions import *
from components.user.models import User
from datetime import datetime, timedelta
from config import SECRET_KEY
from tortoise.exceptions import DoesNotExist

class UserController:

    @classmethod
    async def register_user(self, payload: dict) -> bool :
        data = payload
        try:
            username, password = data["username"], data["password"]
        except:
            raise FormDataMissing
        if (isinstance(password, int) or isinstance(username, int)):
            return False
        if (len(username) == 0 or len(password) == 0):
            return False
        user = await User.filter(username = username).first()
        if not user:
            user = await User.create(
                username = username,
                password = generate_password_hash(password),
            )
            return True
        return False
    
    @classmethod
    async def login(self, payload: dict) -> jwt :
        try:
            username = payload["username"]
            password = payload["password"]
        except:
            raise FormDataMissing
        try:
            user = await User.get(username = username)
        except DoesNotExist:
            raise UserIsNotRegistered
        if check_password_hash(user.password, password):
            token = jwt.encode({
                'sub': user.username,
                'exp' : datetime.utcnow() + timedelta(hours=30)
            }, SECRET_KEY)
            return token
        raise WrongPasswordOrUsername

async def extract_user_from_token(token: str) -> User :
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except (jwt.exceptions.InvalidTokenError, jwt.exceptions.DecodeError):
        raise InvalidJWT

    try:
        user = await User.get(username=payload["sub"])
    except DoesNotExist as err:
        raise InvalidJWT

    return user