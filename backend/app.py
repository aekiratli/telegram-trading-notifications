from sanic import Sanic
from backends.mysql import APPS_MODELS, connect_database
from tortoise import Tortoise
from components.user.views import users
from sanic import Blueprint
from middleware.auth import authentication
from components.job.tasks import deploy_jobs

def create_app() -> Sanic:
    Tortoise.init_models(APPS_MODELS, "models")
    app = Sanic("TelegramNotifApp")
    group = Blueprint.group(
        users,
        version_prefix="/api/v",
        version=1,
    )

    group.middleware(authentication, "request")
    app.blueprint(group)
    app.add_task(deploy_jobs())
    connect_database(app)
    return app