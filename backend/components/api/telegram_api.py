import aiohttp
import asyncio
from typing import List
from config import TELEGRAM_SECRET
from config import job_logger
import traceback
import logging

class TelegramApiController:
    def __init__(self, chat_ids: List[str], job_name: str):
        self.token = TELEGRAM_SECRET
        self.chat_ids = chat_ids
        self.job_name = job_name

    async def send_message(self, message: str):
        job_logger(self.job_name)
        try:
            url = f'https://api.telegram.org/bot{TELEGRAM_SECRET}/sendMessage'
            async with aiohttp.ClientSession() as session:
                tasks = []
                for chat_id in self.chat_ids:
                    tasks.append(post(session=session, url=url, chat_id=chat_id, message=message))
                await asyncio.gather(*tasks, return_exceptions=True)
                
        except Exception:
             logging.error(f"ERR on Telegram API {traceback.format_exc()}")


async def post(
    session: aiohttp.ClientSession,
    url: str,
    chat_id: str,
    message: str,
    **kwargs
) -> dict:
    resp = await session.request('POST', json={'text': message, 'chat_id': chat_id}, url=url, **kwargs)
    resp_data = await resp.json()
    if resp_data['ok'] == False:
        logging.error(f"Chat ID -> {chat_id} msg: {resp_data}")
    return resp_data