
from app import create_app
from config import CONFIG

app = create_app()

if __name__ == "__main__":

    if CONFIG == "prod":
        
        app.run(debug=False,
                auto_reload=True,
                host="0.0.0.0",
                port=5007)
    if CONFIG == "dev":

        app.run(debug=True,
                auto_reload=True,
                host="0.0.0.0",
                port=5007)