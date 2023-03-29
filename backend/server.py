
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True,auto_reload=True, host="0.0.0.0", port=5007)
