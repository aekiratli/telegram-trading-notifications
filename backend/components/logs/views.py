from sanic import Request, Websocket, Blueprint
import aiofiles
import asyncio
import os
from components.user.repository import extract_user_from_token
import json

async def file_watcher(websocket, path):
    # Open the file in async mode
    async with aiofiles.open(path, mode='r') as f:
        # Get the last 50 lines of the file
        file_contents = ''
        async for line in f:
            if len(file_contents.split('\n')) >= 50:
                file_contents = '\n'.join(file_contents.split('\n')[1:])
            file_contents += line

        # Send the initial file contents to the client
        await websocket.send(file_contents)

        while True:
            # Wait for the file to change
            await asyncio.sleep(1)

            # Get the current file contents
            current_contents = await f.read()

            # If the file contents have changed, send the new contents to the client
            if current_contents != '':
                await websocket.send(current_contents)

                # Update the file_contents variable to reflect the new contents
                if len(file_contents.split('\n')) >= 50:
                    file_contents = '\n'.join(file_contents.split('\n')[1:])
                file_contents += current_contents



async def log_file(request: Request, ws: Websocket, job_name: str):
    # Construct the full path to the file
    file_path = os.path.join(os.getcwd(), f'logs/{job_name}.log')
    data = await ws.recv()
    token = json.loads(data)["headers"]["Bearer"]
    user = await extract_user_from_token(token)

    # Start the file watcher coroutine
    if user:
        await file_watcher(ws, file_path)
    else:
        ws.disconnect()

ws = Blueprint('ws', url_prefix='/ws')
ws.add_websocket_route(log_file, '/logs/<job_name:str>')