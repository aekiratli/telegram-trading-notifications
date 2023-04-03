import pandas as pd
from config import *
from binance import Client
from typing import  List, Dict
import traceback

class BinanceApiController:
    def __init__(self, job_name=''):
        self.client = Client(BINANCE_KEY,BINANCE_SECRET)
        self.job_name =  job_name

    def get_klines(self, pair: str, candle_interval: str, since_when: str, ma=int) -> pd.DataFrame:
        job_logger(self.job_name)
        try:
            candles = (self.client.get_historical_klines(pair,candle_interval,since_when))
            columns = ['open_time', 'open', 'high', 'low', 'close', 'volume', 'close_time', 'quote_asset_volume', 'number_of_trades', 'taker_buy_base_asset_volume', 'taker_buy_quote_asset_volume', 'ignore']
            df = pd.DataFrame(columns=columns)
            for kline in candles:
                # Convert the kline data to a list
                kline_data = [float(x) for x in kline[:12]]
                
                # Convert the kline timestamp to a datetime object
                kline_data[0] = pd.to_datetime(kline_data[0], unit='ms')
                
                # Add the kline data to the DataFrame
                df = df.append(pd.Series(kline_data, index=columns), ignore_index=True)

            return df
        except:
            logging.info(f"ERR on Binance API {traceback.format_exc()}")

    async def get_coins(self) ->  List[Dict[str, str]]:
        coins = self.client.get_all_tickers()
        return coins

    async def get_orders(self) ->  List[Dict[str, str]]:
        orders = self.client.get_open_orders()

        for order in orders:
            print(order)