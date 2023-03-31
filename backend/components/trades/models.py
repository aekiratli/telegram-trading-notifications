from tortoise import fields
from tortoise.models import Model
from components.utils.models import Symbol
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from components.notifications.models import Channel

class Trade(Model):
    id = fields.IntField(pk=True)
    price = fields.DecimalField(max_digits=15, decimal_places=6)
    date = fields.DatetimeField(auto_now_add=True)
    market: fields.ForeignKeyRelation["Market"] = fields.ForeignKeyField("models.Market", related_name="market")
    symbol: fields.ForeignKeyRelation["Symbol"] = fields.ForeignKeyField("models.Symbol", related_name="market")
    risk: fields.ForeignKeyRelation["Risk"] = fields.ForeignKeyField("models.Risk", related_name="market")
    channels: fields.ManyToManyRelation["Channel"] = fields.ManyToManyField("models.Channel", related_name="trades", through="trade_channel")

class TradeChannel(Model):
    id = fields.IntField(pk=True)
    trade: fields.ForeignKeyRelation["Trade"] = fields.ForeignKeyField("models.Trade")
    channel: fields.ForeignKeyRelation["Channel"] = fields.ForeignKeyField("models.Channel")
    class Meta:
        table = "trade_channel"
        
class Market(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=32,unique=True)

class Risk(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(unique=True, max_length=32)
    amount = fields.IntField(null=True)

