from enum import Enum
import datetime

class KlineInterval(Enum):
    KLINE_INTERVAL_1MINUTE = '1m'
    KLINE_INTERVAL_3MINUTE = '3m'
    KLINE_INTERVAL_5MINUTE = '5m'
    KLINE_INTERVAL_15MINUTE = '15m'
    KLINE_INTERVAL_30MINUTE = '30m'
    KLINE_INTERVAL_1HOUR = '1h'
    KLINE_INTERVAL_2HOUR = '2h'
    KLINE_INTERVAL_4HOUR = '4h'
    KLINE_INTERVAL_6HOUR = '6h'
    KLINE_INTERVAL_8HOUR = '8h'
    KLINE_INTERVAL_12HOUR = '12h'
    KLINE_INTERVAL_1DAY = '1d'
    KLINE_INTERVAL_3DAY = '3d'
    KLINE_INTERVAL_1WEEK = '1w'
    KLINE_INTERVAL_1MONTH = '1M'

class KlineIntervalSeconds(Enum):
    KLINE_INTERVAL_1MINUTE = 60
    KLINE_INTERVAL_3MINUTE = 180
    KLINE_INTERVAL_5MINUTE = 300
    KLINE_INTERVAL_15MINUTE = 900
    KLINE_INTERVAL_30MINUTE = 1800
    KLINE_INTERVAL_1HOUR = 3600
    KLINE_INTERVAL_2HOUR = 7200
    KLINE_INTERVAL_4HOUR = 14400
    KLINE_INTERVAL_6HOUR = 21600
    KLINE_INTERVAL_8HOUR = 28800
    KLINE_INTERVAL_12HOUR = 43200
    KLINE_INTERVAL_1DAY = 86400
    KLINE_INTERVAL_3DAY = 259200
    KLINE_INTERVAL_1WEEK = 604800
    KLINE_INTERVAL_1MONTH = 2592000

def check_interval(current_time: int, interval_seconds: int) -> bool:

    delay_seconds = 5  # Acceptable interval for delay

    # Round the Unix timestamp to the nearest minute approximately
    rounded_time = (current_time // interval_seconds) * interval_seconds

    # Calculate the difference between current time and rounded time to the nearest minute
    difference = current_time - rounded_time

    if difference <= delay_seconds:
        # The current time is close to the nearest minute
        return True
    
    return False

def get_next_run(current_time: int, interval_seconds: int) -> datetime.datetime:

    return datetime.datetime.fromtimestamp((current_time // interval_seconds) * interval_seconds + interval_seconds)
