from flask import Flask, render_template, session, request, Blueprint

iceform_api = Blueprint('iceform', __name__, static_folder="../../static/dist", template_folder="../../static")

@iceform_api.route("/<netid>", methods=['GET'])
def getUserIceformData(netid):
    return "some data"
