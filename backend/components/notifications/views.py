from sanic import Blueprint, Request, HTTPResponse
from sanic.response import json
from components.notifications.repository import ChannelController

async def get_channels(request: Request) -> HTTPResponse:
    jobs = await ChannelController.get_channels()
    return json(jobs)

async def add_channel(request: Request) -> HTTPResponse:
    await ChannelController.add_channel(request.json)
    return json({"msg": "success"})

async def delete_channel(request: Request, channel_id: int) -> HTTPResponse:
    await ChannelController.delete_channel(channel_id)
    return json({"msg": "success"})

channel = Blueprint("channel", url_prefix="/channels")
channel.add_route(get_channels, "/list", methods=["POST"])
channel.add_route(add_channel, "/add", methods=["POST"])
channel.add_route(delete_channel, "/delete/<channel_id:int>", methods=["POST"])
