from typing import TYPE_CHECKING
from tortoise import fields
from tortoise.models import Model
if TYPE_CHECKING:
    from components.job.models import Job
    
class Channel(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(unique=True,max_length=64)
    chat_id = fields.CharField(unique=True,max_length=64)
    # jobs: fields.ManyToManyRelation["Job"] = fields.ManyToManyField("models.Job", related_name="channels_for_job", through="job_channel")