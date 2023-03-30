from components.job.models import Job, JobType, JobChannel
from typing import List
from tortoise.transactions import  atomic
class JobController:

    @classmethod
    async def get_jobs(self) -> list:
        jobs = await Job.filter().all().prefetch_related('job_type', 'channels')
        jobs = jobs_to_dict_of_array(jobs)
        reversed_list_of_dicts = list(reversed(jobs))
        return reversed_list_of_dicts
    
    @classmethod
    @atomic()
    async def create_job(self, payload: dict) -> None:
        data = payload
        job_type = await self.get_job_type_by_name(data["job_type"])
        data["job_type_id"] = job_type.id
        channels = data['channels']
        del data['job_type']
        del data['channels']
        new_job = await Job.create(**data)
        # Should be more efficient way to create m2m ...
        for channel in  channels:
            await JobChannel.create(**{"channel_id": channel, "job_id": new_job.id})

    @classmethod
    async def delete_job(self, job_id:int) -> None:
        await Job.filter(id=job_id).delete()

    @classmethod
    @atomic()
    async def edit_job(self, payload:dict) -> None:
        job = await Job.get(id=payload["id"])
        job.config["rsi_value"] = payload["config"]["rsi_value"]
        job.config["since_when"] = payload["config"]["since_when"]
        job.config["msg"] = payload["config"]["msg"]
        job.config["candles_to_reset"] = payload["config"]["candles_to_reset"]
        channels = payload["channels"]

        await job.save()
        
        existing_channels = await JobChannel.filter(job_id = job.id).all()
        existing_channels = [item.channel_id for item in existing_channels]

        for channel in channels:
            if channel in existing_channels:
                pass
            else:
                await JobChannel.create(**{"job_id": job.id, "channel_id": channel})

        for existing_channel in existing_channels:
            if existing_channel not in channels:
                await JobChannel.filter(job_id=job.id,channel_id=existing_channel).delete()

    @classmethod
    async def get_job_types(self) -> list:
        job_types = await JobType.filter().all()
        job_types = [job_type.name for job_type in job_types]
        return job_types
    
    @classmethod
    async def get_job_type_by_name(self, name) -> list:
        job_type = await JobType.get(name=name)
        return job_type
    
def jobs_to_dict_of_array(jobs: List[Job]) -> List[dict]:
    return [{'id': t.id, 'name': t.name, 'config': t.config, 'type': t.job_type.name, 
             'channels': [{'id': c.id, 'name': c.name, 'chat_id': c.chat_id} for c in t.channels]} for t in jobs]

def job_to_dict(job: Job) -> List[dict]:
    return {'id': job.id, 'name': job.name}