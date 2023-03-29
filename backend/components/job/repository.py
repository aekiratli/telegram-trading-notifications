from components.job.models import Job, JobType
from typing import List

class JobController:

    @classmethod
    async def get_jobs(self) -> list:
        jobs = await Job.filter().all().prefetch_related('job_type')
        jobs = jobs_to_dict_of_array(jobs)
        reversed_list_of_dicts = list(reversed(jobs))
        return reversed_list_of_dicts
    
    @classmethod
    async def create_job(self, payload: dict) -> None:
        data = payload
        job_type = await self.get_job_type_by_name(data["job_type"])
        data["job_type_id"] = job_type.id
        del data['job_type']
        await Job.create(**data)

    @classmethod
    async def delete_job(self, job_id:int) -> None:
        await Job.filter(id=job_id).delete()

    @classmethod
    async def edit_job(self, payload:dict) -> None:
        job = await Job.get(id=payload["id"])
        job.config["rsi_value"] = payload["config"]["rsi_value"]
        await job.save()

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
    return [{'id': t.id, 'name': t.name, 'config': t.config, 'type': t.job_type.name} for t in jobs]

def job_to_dict(job: Job) -> List[dict]:
    return {'id': job.id, 'name': job.name}