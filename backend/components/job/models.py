from tortoise import fields
from tortoise.models import Model

class Job(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(unique=True,max_length=64)
    config = fields.JSONField()
    job_type: fields.ForeignKeyRelation["JobType"] = fields.ForeignKeyField("models.JobType", related_name="job_type")

class JobType(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()
    class Meta:
        table = "job_type"