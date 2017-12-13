from flask import Flask, render_template, session, request, Blueprint, jsonify
from project.server.database_controller import DatabaseController

auth_api = Blueprint('auth', __name__, static_folder="../../static/dist", template_folder="../../static")

# Controller for user logins
@auth_api.route("/login", methods=['POST'])
def login_user():
    data = request.get_json()
    if login(data['username'], data['password']):
        return jsonify({"result":"success", "message": "Logged in"})

    return jsonify({"result": "failure", "message": "Try again"})

# Controller for user logouts
@auth_api.route("/logout", methods=['GET'])
def logout():
    session.pop('username', None)
    return jsonify({"result": "success", "message": "Successfully logged out"})

def login(username, password):
    dc = DatabaseController.get_instance()
    if dc.authenticateUser(username, password):
        session['username'] = username
        return True
    else:
        return False
