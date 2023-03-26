
from app import create_app
from sanic_ext import Extend
from sanic_cors import CORS

app = create_app()

if __name__ == "__main__":
    app.run(debug=True,auto_reload=True, host="0.0.0.0", port=5007)
