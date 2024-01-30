"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello=', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route('/signup', methods=['POST'])
# def register():
    
#     data = request.json

#     if not data["email"]:
#         return jsonify({"msg": "No email provided"}), 401

#     if not data["password"]:
#         return jsonify({"msg": "No password provided"}), 401
    
#     user = User(email=data["email"], password=data["password"], is_active=True)

#     db.session.add(user)
#     db.session.commit()

#     return jsonify({"msg": "Successfully created a new user"})
@api.route("/signup", methods=["POST"])
def signup():
    request_body = request.get_json(force=True)

    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    verify_email = User.query.filter_by(email=request_body["email"]).first()
    if verify_email:
        raise APIException("An account with this email already exists", 400)

    user = User(email=request_body["email"], password=request_body["password"])

    db.session.add(user)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Successfully created user",
        "user": user.serialize()
    }

    return jsonify(response_body), 200

# @api.route('/signup', methods=['POST'])
# def signup():
#     request_body = request.get_json(force=True)
#     user = User(email = request_body["email"], password = request_body["password"])
#     db.session.add(user)
#     db.session.commit()
#     # my_token = create_access_token(identity = user.id)
#     return jsonify(), 200
@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True)
    email = request_body["email"]
    password = request_body["password"]

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify("Incorrect information"), 401

    access_token = create_access_token(identity=user.id)
    print(access_token)

    response_body = {
        "msg": "logged",
        "user": user.serialize(),
        "token": access_token
    }
    print(response_body),
    return jsonify(response_body), 200

# @api.route('/login', methods=['POST'])
# def login():
#     data = request.json

#     user = User.query.filter_by(email=data['email']).first()

#     if user:
#         token = create_access_token(identity=user.id)
#         return jsonify({"token": token}), 200
    
#     return jsonify({"msg": "Incorrect information."}), 200

# @api.route('/user', methods=['GET'])
# @jwt_required()
# def show_users():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     return jsonify(user.serialize())

@api.route("/private", methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    response_body = {
        "logged_in_as": current_user ,
        "user": user.serialize()
    }

    return jsonify(success=True, response=response_body), 200