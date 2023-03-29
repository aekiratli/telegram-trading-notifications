import argparse
import logging
from tortoise import Tortoise
import asyncio
from datetime import datetime
import sys
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

now = int(datetime.now().timestamp())
#URI = "mysql://root:test_root_password@localhost:3306/telegram"
URI = "postgres://postgres:1@192.168.1.82:5432/postgres"

parser = argparse.ArgumentParser()
parser.add_argument('--id', type=str, help='ID of the Job')
parser.add_argument('--path_to_append', type=str, help='Path to include models')
args = parser.parse_args()
id = args.id
path = args.path_to_append
sys.path.append(path)

from components.job.models import Job
from components.utils.binance_utils import KlineInterval, KlineIntervalSeconds
from components.api.binance_fetcher import BinanceApiController
from components.indicators.rsi import calculate_rsi
from components.api.telegram_api import TelegramApiController
from config import rsi_logging
# Init Logging

async def main():
    # Connect to the database
    await Tortoise.init(
        db_url=URI,
        modules={'models': ['components.job.models']}
    )
    job = await Job.get(id=id)
    rsi_logging(job.name)
    config = argparse.Namespace(**job.config)
    seconds = getattr(KlineIntervalSeconds, config.candle_interval).value
    # Add some attrs first time
    if config.last_run == 0:
        job.config["is_above_threshold"] = False
    if (now - config.last_run >= seconds):
        logging.info(f"Deploying {job.name} ... ")
        #TelegramApiController('1041353666').send_message('\U00002716 !!!')
        job.config["last_run"] = now
        if (config.how_many_candles_left_to_reset == 0):
            # Fetch data
            df = BinanceApiController().get_klines(pair=config.pair,
                                                candle_interval=getattr(KlineInterval, config.candle_interval).value,
                                                since_when=config.since_when,
                                                )
            
            #TelegramApiController('1041353666').send_rsi_plot(df)
            # Get RSI
            df = calculate_rsi(df)
            # Do calculations
            logging.info(f"RSI value -> {df.iloc[-1]['rsi']}")
            if df.iloc[-1]['rsi'] >= config.rsi_value:
                if job.config["is_above_threshold"] == False:
                    # Send notifications
                    logging.info(f"Sending Notifications for {job.name} ... ")
                    job.config["how_many_candles_left_to_reset"] = config.candles_to_reset
                else:
                    logging.info(f"Value did not went below threshold since last alert ... ")
                job.config["is_above_threshold"] = True
            else:
                job.config["is_above_threshold"] = False
        else:
            job.config["how_many_candles_left_to_reset"] = config.how_many_candles_left_to_reset - 1
        await job.save()
    else:
        pass

    await Tortoise.close_connections()

#Run the script
if __name__ == '__main__':
    asyncio.run(main())