from sanic import Blueprint, Request, HTTPResponse
from components.user.repository import UserController
from components.user.exceptions import * 
from sanic.response import json

async def register_user(request: Request) -> HTTPResponse:
    try:
        is_register_succesful = await UserController.register_user(request.json)
    except FormDataMissing:
        return json({'message': 'Form data is missing'})
    if is_register_succesful:
        return json({'message': 'Registered'})
    else:
        return json({'message': 'User is registered'},headers={"contasdasdasdsaent-language": "en-US"})
async def asd(request: Request) -> HTTPResponse:
        return json({'message': 'User is registered'},headers={"contasdasdasdsaent-language": "en-US"})
async def login(request: Request) -> HTTPResponse:
    try:
        token = await UserController.login(request.json)
    except FormDataMissing:
        return json({'message': 'Form data is missing'},200)
    except WrongPasswordOrUsername:
        return json({'message': 'Wrong Username Or Password'},200)
    except UserIsNotRegistered:
        return json({'message': 'User Is Not Registered'}, 200)
    return json({"token": token})

async def who_am_i(request: Request) -> HTTPResponse:
   return json({"msg": request.ctx.user.username})

users = Blueprint("users", url_prefix="/users")
users.add_route(register_user, "register_user", methods=["POST", "OPTIONS"])
users.add_route(login, "login", methods=["POST", "OPTIONS"])
users.add_route(who_am_i, "who_am_i", methods=["POST", "OPTIONS"])
users.add_route(asd, "asd", methods=["POST", "GET"])