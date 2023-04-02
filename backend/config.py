from dotenv import load_dotenv
import os
import logging
import sys

load_dotenv()
SECRET_KEY = 'super_secret_key'
TELEGRAM_SECRET = os.getenv("TELEGRAM_SECRET")
BINANCE_SECRET =  os.getenv("BINANCE_SECRET")
BINANCE_KEY =  os.getenv("BINANCE_KEY")

logger_db_client = logging.getLogger("tortoise.db_client")
logger_db_client.setLevel(logging.ERROR)

logger_tortoise = logging.getLogger("tortoise")
logger_tortoise.setLevel(logging.ERROR)

def job_logger(name):
    
    logging.basicConfig(filename=f'./logs/{name}.log',
                        level=logging.INFO, 
                        format= '[%(asctime)s] - %(levelname)s - %(message)s',
                        datefmt='%H:%M:%S')