from sanic import Blueprint, Request, HTTPResponse
from sanic.response import json
from components.api.binance_fetcher import BinanceApiController
from components.utils.repository import UtilsController

async def get_coins(request: Request) -> HTTPResponse:
    coins = await BinanceApiController().get_coins()
    return json(coins)

async def add_symbol(request: Request) -> HTTPResponse:
    try:
        await UtilsController.create_symbol(request.json)
    except:
        return json({"msg": "failed"},503)
    return json({"msg": "success"})

async def get_symbols(request: Request) -> HTTPResponse:
    jobs = await UtilsController.get_symbols()
    return json(jobs)

utils = Blueprint("utils", url_prefix="/utils")
utils.add_route(get_coins, "/list/coins", methods=["POST"])
utils.add_route(get_symbols, "/list/symbol", methods=["POST"])
utils.add_route(add_symbol, "/add/symbol", methods=["POST"])