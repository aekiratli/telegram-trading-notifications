from tortoise.contrib.sanic import register_tortoise

APPS_MODELS = [
    "components.user.models",
    "components.notifications.models",
    "components.job.models",
    "components.utils.models",
    "aerich.models",
]

URI = "mysql://root:test_root_password@localhost:3306/telegram"
TORTOISE_ORM = {
    "connections": {"default": URI},
    "apps": {
        "models": {
            "models": APPS_MODELS,
            "default_connection": "default",
        },
    },
}


def connect_database(app) -> None:
    register_tortoise(app, config=TORTOISE_ORM)
