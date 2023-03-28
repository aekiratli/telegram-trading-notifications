from sanic import Blueprint, Request, HTTPResponse
from sanic.response import json
from components.job.repository import JobController

async def get_jobs(request: Request) -> HTTPResponse:
    jobs = await JobController.get_jobs()
    return json(jobs)

async def get_job_types(request: Request) -> HTTPResponse:
    job_types = await JobController.get_job_types()
    return json(job_types)

async def add_job(request: Request) -> HTTPResponse:
    try:
        await JobController.create_job(request.json)
    except:
        return json({"msg": "failed"},503)
    return json({"msg": "success"})

job = Blueprint("job", url_prefix="/jobs")
job.add_route(get_jobs, "/list", methods=["POST"])
job.add_route(add_job, "/add", methods=["POST"])

job_type = Blueprint("job_type", url_prefix="/job_type")
job_type.add_route(get_job_types, "/list/", methods=["POST"])