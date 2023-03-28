from tortoise import fields
from tortoise.models import Model

class Symbol(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=24, null=False, unique=True)
