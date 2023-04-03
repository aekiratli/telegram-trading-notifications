from components.trades.models import Trade, Market, Risk, TradeChannel
from typing import List, Optional
from tortoise.transactions import atomic


class TradeController:

    @classmethod
    async def get_trades(self) -> list:
        trades = await Trade.filter().all().prefetch_related('market', 'risk', 'channels', 'symbol')
        trades = trades_to_dict_of_array(trades)
        reversed_list_of_dicts = list(reversed(trades))
        return reversed_list_of_dicts
    
    @classmethod
    async def delete_trade(cls, trade_id: int) -> Optional[Trade]:
        trade = await Trade.filter(id=trade_id).first()
        if trade:
            await trade.delete()
            return trade
        
    @classmethod
    async def get_channels_by_trade_id(cls, trade_id: int) -> List[int]:
        trade = await Trade.get(id=trade_id).prefetch_related('channels')
        chat_ids = []
        for channel in  trade.channels:
            chat_ids.append(channel.chat_id)
        return chat_ids
    
    @classmethod
    async def get_risk_by_name(self, risk_name) -> Risk:
       return await Risk.get(name=risk_name)
    
    @classmethod
    async def get_market_by_name(self, market_name) -> Risk:
       return await Market.get(name=market_name)
    @classmethod
    @atomic()
    async def create_trade(self, payload: dict) -> Trade:
        data = payload
        risk = await self.get_risk_by_name(data["risk"])
        market = await self.get_market_by_name(data["market"])
        channels = data['channels']
        del data['channels']
        del data['risk']
        del data['market']
        data['market_id'] = market.id
        data['risk_id'] = risk.id
        new_trade = await Trade.create(**data)
        # # Should be more efficient way to create m2m ...
        for channel in  channels:
            await TradeChannel.create(**{"channel_id": channel, "trade_id": new_trade.id})
        return new_trade
    
def trades_to_dict_of_array(trades: List[Trade]) -> List[dict]:
    return [{'id': t.id,
             'price': t.price,
             'date': int(t.date.timestamp()),
             'market': t.market.name,
             'symbol': t.symbol.name,
             'risk': t.risk.name,
             'channels': [{'id': c.id, 'name': c.name, 'chat_id': c.chat_id} for c in t.channels]} for t in trades]
