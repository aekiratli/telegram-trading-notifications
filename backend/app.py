from sanic import Sanic
from backends.mysql import APPS_MODELS, connect_database
from tortoise import Tortoise
from components.user.views import users
from sanic import Blueprint
from middleware.auth import authentication
from middleware.cors import add_cors_headers
from middleware.options import setup_options
from components.job.tasks import deploy_jobs
from sanic_ext import Extend
from sanic_cors import CORS

def create_app() -> Sanic:
    Tortoise.init_models(APPS_MODELS, "models")
    app = Sanic("TelegramNotifApp")


    group = Blueprint.group(
        users,
        version_prefix="/api/v",
        version=1,
    )
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    group.middleware(authentication, "request")
    app.register_listener(setup_options, "before_server_start")
    app.middleware(add_cors_headers, "response")
    app.blueprint(group)
    app.add_task(deploy_jobs())
    connect_database(app)
    return app