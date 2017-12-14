from flask import Flask, render_template, session, request, Blueprint, jsonify
from project.server.api.auth import login
from project.server.database_controller import DatabaseController
from werkzeug.security import generate_password_hash

acct_mgmt_api = Blueprint('acct_mgmt', __name__, static_folder="../../static/dist", template_folder="../../static")

# controller for adding new user data to the database
@acct_mgmt_api.route("/create_account", methods=['POST'])
def insert_data():
    data = request.get_json()
    dc = DatabaseController.get_instance()
    data['password'] = generate_password_hash(data['password'])
    dc.create_new_user(data)
    return jsonify({"result": "success"})

    #return jsonify({"result": "failure", "message": "Account not created"})

@acct_mgmt_api.route("/delete_account", methods=['POST'])
def delete_account():
    if not 'username' in session:
        #User isn't authenticated, so redirect them to login page
        return jsonify({"result": "failure", "message": "User not authenticated"})
    data = request.get_json()
    dc.delete_account(data["ndid"])
    return jsonify({"result": "success", "message": "Account deleted"})


