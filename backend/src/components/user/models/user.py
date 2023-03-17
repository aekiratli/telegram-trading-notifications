from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy
from src.components import db

class User(db.Model):
	__tablename__ = 'user'
	id = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.String(50), unique = True)
	password = db.Column(db.Text())