from flask import Flask, render_template, session, request, Blueprint, jsonify
from project.server.api.auth import login

acct_mgmt_api = Blueprint('acct_mgmt', __name__, static_folder="../../static/dist", template_folder="../../static")

# controller for adding new user data to the database
@acct_mgmt_api.route("/create_account", methods=['POST'])
def insert_data():
    data = request.get_json()
    #dc.insert_resident_data(data)
    
    # Log user in
    if login():
        return jsonify({"result":"success", "message": "User added"})

    return jsonify({"result": "failure", "message": "Account not created"})

@acct_mgmt_api.route("/delete_account", methods=['POST'])
def delete_account():
    if not 'username' in session:
        #User isn't authenticated, so redirect them to login page
        return jsonify({"result": "failure", "message": "User not authenticated"})
    data = request.get_json()
    dc.delete_account(data["ndid"])
    return jsonify({"result": "success", "message": "Account deleted"})


