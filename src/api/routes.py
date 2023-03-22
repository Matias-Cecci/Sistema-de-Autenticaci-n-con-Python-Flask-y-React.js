"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pet
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def user_login():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user = User.query.filter_by(email= body_email, password=body_password).first()
    if not user:
        return jsonify({"Error": "Invalid credentials"}), 401
    token = create_access_token(identity=user.id)

    return jsonify({"response": "Hola", "token": token}), 200
    
@api.route('/user', methods=['GET'])
@jwt_required()
def current_user_email():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"response": "Hola", "email": user.email}), 200


@api.route('/register', methods=['POST'])
def user_register():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user_already_exist = User.query.filter_by(email= body_email).first()
    if user_already_exist:
        return jsonify({"response": "Email already used"}), 300
    new_user = User(email=body_email, password=body_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"response": "User registered successfully"}), 200    

    
@api.route('/pet', methods=['POST'])
@jwt_required()
def create_pet():
    user_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_age = request.json.get("age")
    body_breed = request.json.get("breed")
    body_sterilized = request.json.get("sterilized")
    new_pet = Pet(name=body_name, age=int(body_age), breed=body_breed, sterilized=body_sterilized, user_id=user_id)
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({"response": "Pet registered successfully"}), 200    


@api.route('/pets', methods=['GET'])
@jwt_required()
def get_all_current_user_pets():
    user_id = get_jwt_identity()
    pets = Pet.query.filter_by(user_id=user_id)
    return jsonify({"results": [x.serialize() for x in pets]}), 200 
