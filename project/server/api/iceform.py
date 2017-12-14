from flask import Flask, render_template, session, request, Blueprint, jsonify
from project.server.database_controller import DatabaseController
from flask import session

iceform_api = Blueprint('iceform', __name__, static_folder="../../static/dist", template_folder="../../static")

@iceform_api.route("/resident_info/<netid>", methods=['GET'])
def getUserIceformData(netid):
    dc = DatabaseController.get_instance()
    info = dc.get_resident_info(netid)
    return jsonify({"result":"success", "data":info})



@iceform_api.route("/resident_info", methods=['GET'])
def getCurrentUserIceformData():
    dc = DatabaseController.get_instance()
    info = dc.get_resident_info(session['username'])
    return jsonify({"result":"success", "data":info})


@iceform_api.route("/update_account", methods=['POST'])
def update_data():
    if not 'username' in session:
        # User isn't authenticated, so return failure
        return jsonify({"result": "failure", "message": "User not authenticated"})
    data = request.get_json()
    dc.update_resident_data(data)
    return jsonify({"result": "success", "message": "User data updated"})

# return all of the users and their netids
@iceform_api.route("/get_residents", methods=['GET'])
def return_residents():
    dc = DatabaseController.get_instance()
    data = dc.get_residents()
    return jsonify({"result": "success", "data":data})


