import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from src.components.user.models.user import User
from src.components.user.models.user import db
from src.components.user.views.exceptions import *
from config import SECRET_KEY
from datetime import datetime, timedelta

class UserController:

    @classmethod
    def register_user(self, payload: dict) -> bool :
        data = payload
        try:
            username, password = data["username"], data["password"]
        except:
            raise FormDataMissing
        if (isinstance(password, int) or isinstance(username, int)):
            return False
        if (len(username) == 0 or len(password) == 0):
            return False
        user = User.query.filter_by(username = username).first()
        if not user:
            user = User(
                username = username,
                password = generate_password_hash(password),
            )
            db.session.add(user)
            db.session.commit()
            return True
        return False
    
    @classmethod
    def login(self, payload: dict) -> jwt :
        try:
            username = payload["username"]
            password = payload["password"]
        except:
            raise FormDataMissing
        user = User.query.filter_by(username = username).first()
        if not user:
            raise UserIsNotRegistered
        if check_password_hash(user.password, password):
            token = jwt.encode({
                'sub': user.username,
                'exp' : datetime.utcnow() + timedelta(days = 1)
            }, SECRET_KEY)
            return token
        raise WrongPasswordOrUsername