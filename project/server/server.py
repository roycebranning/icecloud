# server.py
from flask import Flask, render_template, session, request, jsonify, redirect, url_for
from project.server.database_controller import DatabaseController
from project.server.api.iceform import iceform_api
import os

app = Flask(__name__, static_folder="../static/dist",
template_folder="../static")
dc = DatabaseController(app)
app.secret_key = os.environ['session_key']

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/<path:path>", methods=['GET'])
def any_root_path(path):
	return render_template("index.html")

# Controller for user logins
@app.route("/api/login", methods=['POST'])
def login():
	data = request.get_json()
	if dc.authenticateUser(data['username'], data['password']):
		session['username'] = data['username']
		return jsonify({"result":"Logged in"})
	else:
		return jsonify({"result":"Try again"})

# controller for adding new user data to the database
@app.route("/api/create_account", methods=['POST'])
def insert_data():
    data = request.get_json()
    print(data)
    #dc.insert_resident_data(data)
	# should probably return a token here as well for session mgmt
    return jsonify({"result":"User added"})

# return all of the users and their netids
@app.route("/api/get_residents", methods=['GET'])
def return_residents():
    data = dc.get_residents()
    print(data)
    return jsonify({"data":data})

"""
# Controller for user logins
@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        if dc.authenticateUser(data['username'], data['password']):
            session['username'] = data['username']
            return jsonify({"result":"Logged in"});
        else:
            return jsonify({"result":"Try again"});
    else:
        if 'username' in session:
            return "Already logged in"
        else:
            return render_template("login.html")

# Controller for user logouts
@app.route("/logout", methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))


# controller for adding new user data to the database
@app.route("/create_account", methods=['POST'])
def insert_data():
    data = request.get_json()
    print(data)
    dc.insert_resident_data(data)
    return redirect(url_for('login'))

@app.route("/update_account", methods=['POST'])
def update_data():
    if not 'username' in session:
        # User isn't authenticated, so redirect them to login page
        return render_template("index.html")
    data = request.get_json()
    print(data)
    dc.update_resident_data(data)
    return redirect(url_for('login'))

@app.route("/delete_account", methods=['POST'])
def delete_account():
    if not 'username' in session:
        #User isn't authenticated, so redirect them to login page
        return redirect(url_for('login'))
    data = request.get_json()
    print(data)
    dc.delete_account(data["ndid"])
    return "Account deleted"

# Register blueprints for the REST APIs
app.register_blueprint(iceform_api, url_prefix='/api/iceform')
"""
if __name__ == "__main__":
	app.run()
