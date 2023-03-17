from flask import Blueprint, jsonify, request
from src.components.user.views.exceptions import *
from src.components.user.repositories.user_repository import UserController

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/login', methods=['POST'])
def login():
    try:
        token = UserController.login(request.json)
    except FormDataMissing:
        return jsonify({'message': 'form data is missing.'}), 400
    except UserIsNotRegistered:
        return jsonify({'message' : 'User is not registerd.'}), 404
    except WrongPasswordOrUsername:
        return jsonify({'message' : 'Password or Username is wrong.'}), 401
    return jsonify({'token': token}), 200

@user.route('/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        is_register_succesful = UserController.register_user(data)
    except FormDataMissing:
        return jsonify({'message': 'Form data is missing'}), 400
    if is_register_succesful:
        return jsonify({'message': 'Registered'}), 200
    else:
        return jsonify({'message': 'User is registered'}), 400