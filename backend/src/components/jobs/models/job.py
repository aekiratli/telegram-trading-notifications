from src.components import db

class Job(db.Model):
	__tablename__ = 'job'
	id = db.Column(db.Integer, primary_key = True)
	job_nameee = db.Column(db.String(50), unique = True)
