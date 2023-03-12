import pandas as pd
from config import *

class BinanceApiController:
    def __init__(self, client):
        self.client = client

    def get_klines(self, pair: str, candle_interval: str, since_when: str, ma=int):
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

        df['ma'] = df.close.rolling(ma).mean()
        return df
