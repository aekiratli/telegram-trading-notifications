from flask import Flask, Blueprint, jsonify
from flask_cors import CORS
from src.components.user.views import user
from src.components.user.models.user import User
from src.components.jobs.models.job import Job
from config import SECRET_KEY
from flask_migrate import Migrate
from src.components import db


app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

api = Blueprint('api', __name__, url_prefix='/api/v1')
api.register_blueprint(user)
app.register_blueprint(api)
db.init_app(app)

migrate = Migrate(app, db)
