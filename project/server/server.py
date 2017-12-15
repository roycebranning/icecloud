# server.py
from flask import Flask, render_template, session, request, jsonify, redirect, url_for
from project.server.database_controller import DatabaseController
from project.server.map_generator import MapGenerator
from project.server.api.iceform import iceform_api
from project.server.api.acct_mgmt import acct_mgmt_api
from project.server.api.auth import auth_api
from project.server.api.map_gen import map_gen_api
import os

app = Flask(__name__, static_folder="../static/dist",
template_folder="../static")
dc = DatabaseController(app)
mg = MapGenerator(app)
app.secret_key = os.environ['session_key']

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/<path:path>", methods=['GET'])
def any_root_path(path):
	return render_template("index.html")

# Register blueprints for the REST APIs
app.register_blueprint(iceform_api, url_prefix='/api/iceform')
app.register_blueprint(acct_mgmt_api, url_prefix='/api/account')
app.register_blueprint(auth_api, url_prefix='/api/auth')
app.register_blueprint(map_gen_api, url_prefix='/api/map_gen')

if __name__ == "__main__":
	app.run()
