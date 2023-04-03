import argparse
import logging
from tortoise import Tortoise
import asyncio
from datetime import datetime
import sys
import warnings
import traceback

warnings.simplefilter(action='ignore', category=FutureWarning)

now = int(datetime.now().timestamp())
# URI = "mysql://root:test_root_password@localhost:3306/telegram"
# URI = "postgres://postgres:1@192.168.1.82:5432/postgres"

parser = argparse.ArgumentParser()
parser.add_argument('--id', type=str, help='ID of the Job')
parser.add_argument('--path_to_append', type=str,
                    help='Path to include models')
args = parser.parse_args()
id = args.id
path = args.path_to_append
sys.path.append(path)

from config import *
from components.api.telegram_api import TelegramApiController
from components.indicators.rsi import calculate_rsi
from components.indicators.pmax import calculate_pmax
from components.api.binance_fetcher import BinanceApiController
from components.utils.binance_utils import KlineInterval, KlineIntervalSeconds, check_interval, get_next_run
from components.job.models import Job
async def main():
    # Connect to the database
    await Tortoise.init(
        db_url=DB_URI,
        modules={'models': ['components.job.models']}
    )

    job = await Job.get(id=id).prefetch_related('channels')
    chat_ids = []
    for channel in job.channels:
        chat_ids.append(channel.chat_id)

    job_logger(job.name)

    config = argparse.Namespace(**job.config)

    seconds = getattr(KlineIntervalSeconds, config.candle_interval).value

    is_time_yet = check_interval(now, seconds)

    if is_time_yet:
        job.config["last_run"] = now
        # Add some attrs first time
        if config.last_run == 0:
            job.config["is_already_alerted"] = False

        job.config["last_run"] = now

        # Fetch data
        df = BinanceApiController(job.name).get_klines(pair=config.pair,
                                                        candle_interval=getattr(
                                                            KlineInterval, config.candle_interval).value,
                                                        since_when=config.since_when,
                                                        )
        # Get PMAX
        pmax, sma = calculate_pmax(df["close"], df["high"], df["low"])
        df['pmax'] =  pmax
        df['sma'] =  sma
        # Do calculations
        if df.iloc[-1]['pmax'] <=  df.iloc[-1]['sma']:
            is_buy_zone = True
            job.config["is_already_alerted"] = True 
            logging.info(f"PMAX value -> {df.iloc[-1]['pmax']}, SMA value -> { df.iloc[-1]['sma']} , Low Value -> { df.iloc[-1]['low']} , Zone -> BUY")
        else:
            is_buy_zone = False
            job.config["is_already_alerted"] = False 
            logging.info(f"PMAX value -> {df.iloc[-1]['pmax']}, SMA value -> { df.iloc[-1]['sma']} , Low Value -> { df.iloc[-1]['low']} , Zone -> SELL")

        if is_buy_zone:
             if df.iloc[-1]['low']  <= df.iloc[-1]['pmax']:
                if job.config["is_already_alerted"] == False:
                    # Send notifications
                    logging.info(f"Sending Notifications for {job.name} ... ")
                    await TelegramApiController(chat_ids, job.name).send_message(config.msg)
                else:
                    logging.info(f"Alert condition was met during previus BUY candles")

        await job.save()
    else:
        next_run = get_next_run(now, seconds).strftime("%d %B %Y %H:%M:%S")
        logging.info(f'Next run at  {next_run}')
        pass

    await Tortoise.close_connections()

# Run the script
if __name__ == '__main__':
    try:
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        asyncio.run(main())
    except:
        logging.error(
            f"Error on: deploy_rsi_job.py -> {traceback.format_exc()}")
