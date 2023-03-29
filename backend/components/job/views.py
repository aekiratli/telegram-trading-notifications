from sanic import Blueprint, Request, HTTPResponse
from sanic.response import json
from components.job.repository import JobController
import time
async def get_jobs(request: Request) -> HTTPResponse:
    jobs = await JobController.get_jobs()
    return json(jobs)

async def get_job_types(request: Request) -> HTTPResponse:
    job_types = await JobController.get_job_types()
    return json(job_types)

async def add_job(request: Request) -> HTTPResponse:
    await JobController.create_job(request.json)
    return json({"msg": "success"})

async def edit_job(request: Request) -> HTTPResponse:
    await JobController.edit_job(request.json)
    return json({"msg": "success"})

async def delete_job(request: Request, job_id: int) -> HTTPResponse:
    await JobController.delete_job(job_id)
    return json({"msg": "success"})

job = Blueprint("job", url_prefix="/jobs")
job.add_route(get_jobs, "/list", methods=["POST"])
job.add_route(add_job, "/add", methods=["POST"])
job.add_route(edit_job, "/edit", methods=["POST"])
job.add_route(delete_job, "/delete/<job_id:int>", methods=["POST"])

job_type = Blueprint("job_type", url_prefix="/job_type")
job_type.add_route(get_job_types, "/list/", methods=["POST"])