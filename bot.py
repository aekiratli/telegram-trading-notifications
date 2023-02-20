
from telegram.ext import  ApplicationBuilder, ContextTypes
from config import *
from binance import Client
from src.binance_data_fetcher import BinanceApiController
from src.indicators import IndicatorController

async def callback_minute(context: ContextTypes.DEFAULT_TYPE):
    client = Client("","")
    df = BinanceApiController(client=client).get_klines()
    df['pmax'] = IndicatorController.pmax(df['ma'], df['close'], df['high'], df['low'], 10, 3)
    df['rsi'] = IndicatorController.rsi_divergence(df)
    await context.bot.send_message(chat_id='1041353666', text=f'Pmax value = {df["pmax"].iloc[-2]}')

if __name__ == '__main__':
    client = Client("","")
    application = ApplicationBuilder().token(TOKEN).build()
    job_queue = application._job_queue
    # df = BinanceApiController(client=client).get_klines()
    # df['rsi'] = IndicatorController.rsi_divergence(df)
    # print(df)
    #job_minute = job_queue.run_repeating(callback_minute, interval=60, first=10)
    application.run_polling()