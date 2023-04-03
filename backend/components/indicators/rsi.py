import pandas as pd
import talib

def calculate_rsi(df: pd.DataFrame) -> pd.DataFrame:
    rsi = talib.RSI(df['close'].values, timeperiod=14)
    df['rsi'] = rsi
    return df
