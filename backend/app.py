from sanic import Sanic
from sanic.response import text
#from backends.postgre import APPS_MODELS, connect_database
from backends.mysql import APPS_MODELS, connect_database
from tortoise import Tortoise
from components.user.views import users
from components.job.views import job
from sanic import Blueprint
from middleware.auth import authentication
from middleware.cors import add_cors_headers
from middleware.options import setup_options
from components.job.tasks import deploy_jobs

def create_app() -> Sanic:

    Tortoise.init_models(APPS_MODELS, "models")
    app = Sanic("TelegramNotifApp")
    connect_database(app)
    group = Blueprint.group(
        users,
        job,
        version_prefix="/api/v",
        version=1,
    )
    app.add_task(deploy_jobs())
    app.register_listener(setup_options, "before_server_start")
    group.middleware(authentication, "request")
    group.middleware(add_cors_headers, "response")
    app.blueprint(group)

    return app