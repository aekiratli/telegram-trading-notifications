from tortoise import fields
from tortoise.models import Model
from components.notifications.models import Channel

class Job(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(unique=True,max_length=64)
    config = fields.JSONField()
    job_type: fields.ForeignKeyRelation["JobType"] = fields.ForeignKeyField("models.JobType", related_name="jobs_type")
    channels: fields.ManyToManyRelation["Channel"] = fields.ManyToManyField("models.Channel", related_name="jobs", through="job_channel")

class JobType(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()
    class Meta:
        table = "job_type"

class JobChannel(Model):
    id = fields.IntField(pk=True)
    job = fields.ForeignKeyField("models.Job", related_name="job_channels1")
    channel = fields.ForeignKeyField("models.Channel", related_name="job_channels2")
    class Meta:
        table = "job_channel"