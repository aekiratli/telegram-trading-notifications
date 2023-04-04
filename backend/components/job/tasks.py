import asyncio
from components.job.models import Job
import datetime
import subprocess
from sanic.log import logger
from os import getcwd

SCRIPTS_PATH = './components/job/scripts/'
FULL_PATH = getcwd()

async def deploy_jobs():
    now = int(datetime.datetime.now().timestamp())
    
    seconds = now % 60
    time_to_wait = 60 - seconds
    logger.info("Waiting " + str(time_to_wait) + " seconds ...")
    await asyncio.sleep(time_to_wait)
    while True:
        logger.info("Running Jobs Every 60 seconds ...")
        jobs = await Job.filter().all().prefetch_related('job_type')
        # Run jobs
        for job in jobs:
            if job.job_type.name == 'rsi':
                command = ['python3', f'{SCRIPTS_PATH}deploy_rsi_job.py', f'--id={job.id}', f'--path_to_append={FULL_PATH}']
            if job.job_type.name == 'pmax':
                command = ['python3', f'{SCRIPTS_PATH}deploy_pmax_job.py', f'--id={job.id}', f'--path_to_append={FULL_PATH}']
            subprocess.Popen(command)
        await asyncio.sleep(60)
