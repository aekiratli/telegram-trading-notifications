from dotenv import load_dotenv
import os
import logging
import sys

load_dotenv()
SECRET_KEY = 'super_secret_key'
TELEGRAM_SECRET = os.getenv("TELEGRAM_SECRET")

def rsi_logging():

    logger_db_client = logging.getLogger("tortoise.db_client")
    logger_db_client.setLevel(logging.ERROR)

    logger_tortoise = logging.getLogger("tortoise")
    logger_tortoise.setLevel(logging.ERROR)

    
    logging.basicConfig(filename='jobs.log',
                        level=logging.INFO, 
                        format= '[%(asctime)s] - %(levelname)s - %(message)s',
                        datefmt='%H:%M:%S')