from sanic import Blueprint, Request, HTTPResponse
from sanic.response import json
from components.trades.repository import TradeController
from components.trades.signals import trade_created_handler, trade_deleted_handler
import copy
from components.utils.repository import UtilsController

async def get_trades(request: Request) -> HTTPResponse:
    jobs = await TradeController.get_trades()
    return json(jobs)

async def add_trade(request: Request) -> HTTPResponse:
    org_payload = copy.deepcopy(request.json)
    trade = await TradeController.create_trade(request.json)
    chat_ids = await TradeController.get_channels_by_trade_id(trade.id)
    symbol = await UtilsController.get_symbol_by_id(org_payload["symbol_id"])
    await request.app.dispatch(
        "trade.entry.created",
        context={"instance": trade,
                 "symbol": symbol,
                 "request_payload": org_payload,
                  "chat_ids": chat_ids})
    
    return json({"msg": "success"})

async def delete_trade(request: Request, trade_id: int) -> HTTPResponse:
    trade = await TradeController.delete_trade(trade_id)
    await request.app.dispatch(
    "trade.entry.deleted",
        context={"instance": trade})
    return json({"msg": "success"})

trade = Blueprint("trade", url_prefix="/trades")
trade.add_route(get_trades, "/list", methods=["POST"])
trade.add_route(add_trade, "/add", methods=["POST"])
trade.add_route(delete_trade, "/delete/<trade_id:int>", methods=["POST"])
trade.add_signal(trade_created_handler, "trade.entry.created")
trade.add_signal(trade_deleted_handler, "trade.entry.deleted")
