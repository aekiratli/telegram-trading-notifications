import os
from dotenv import load_dotenv
import logging

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

load_dotenv()

TOKEN = os.getenv('TELEGRAM_TOKEN')
PAIR= "APEUSDT"
CANDLE_INTERVAL="1m"
SINCE_WHEN="180 minutes ago UTC"
MOVING_AVERAGE_ROLLING=9
RSI_PERIOD=14