from components.job.models import Job
from typing import List

class JobController:

    @classmethod
    async def get_jobs(self) -> list:
        jobs = await Job.filter().all().prefetch_related('job_type')
        jobs = jobs_to_dict_of_array(jobs)
        return jobs
    
    @classmethod
    async def create_job(self, payload: dict) -> None:
        job = await Job.create(**payload)

def jobs_to_dict_of_array(jobs: List[Job]) -> List[dict]:
    return [{'id': t.id, 'name': t.name, 'config': t.config, 'type': t.job_type.name} for t in jobs]

def job_to_dict(job: Job) -> List[dict]:
    return {'id': job.id, 'name': job.name}