# server.py
from flask import Flask, render_template, session, request, jsonify, redirect, url_for
from database_controller import DatabaseController
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

# Controller for user logouts
@app.route("/logout", methods=['GET'])
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == "__main__":
	app.run()
