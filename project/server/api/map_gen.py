from flask import Flask, render_template, session, request, Blueprint, jsonify
from project.server.database_controller import DatabaseController
from project.server.map_generator import MapGenerator

map_gen_api = Blueprint('map_gen', __name__, static_folder="../../static/dist", template_folder="../../static")

# Controller for map drawing
@map_gen_api.route("/get_map_path", methods=['POST'])
def get_maps():
	data = request.get_json()
	mg = MapGenerator.get_instance()
	print(data)
	mapData = mg.generateMaps(data['src'], data['dest'])
	if mapData['error'] != 'none':
		return jsonify({"result":"failure"})
	else:
		return jsonify({"result":"success", "floors": mapData["floors"], "path":mapData["path"]})
