from tortoise.contrib.sanic import register_tortoise

APPS_MODELS = [
    "components.user.models",
    "components.counter.models",
    "aerich.models",
]

URI = "postgres://postgres:1@192.168.1.82:5432/telegram"
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
