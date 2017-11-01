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

# Controller for user ICE forms
@app.route("/iceform", methods=['GET'])
def iceform():
    if not 'username' in session:
        # User isn't authenticated, so redirect them to login page
        return render_template("index.html")

    return render_template('iceform.html')

# Controller for user logouts
@app.route("/logout", methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

# Register blueprints for the REST APIs
app.register_blueprint(iceform_api, url_prefix='/api/iceform')

if __name__ == "__main__":
	app.run(host='0.0.0.0',port='5005')
