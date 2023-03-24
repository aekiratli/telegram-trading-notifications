# from sanic import Blueprint, Request, HTTPResponse
# from sanic.response import json
# from components.counter.repository import CounterController
# from tortoise.exceptions import DoesNotExist

# async def get_counter(request: Request, user_id: int) -> HTTPResponse:
#     try:
#         count = await CounterController.get_counter(user_id)
#     except DoesNotExist:
#         return json({"msg": "User Does not Exist"})

#     return json({"msg": count.how_many_logged_in})

# counter = Blueprint("counter", url_prefix="/counter")
# counter.add_route(get_counter, "/<user_id:int>/get_counter", methods=["POST", "OPTIONS"])