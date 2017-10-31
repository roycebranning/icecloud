# server.py
from flask import Flask, render_template, session, request
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
        if dc.authenticateUser(request.form['username'], request.form['password']):
            session['username'] = request.form['username']
            return "Logged in";
        else:
            return "Try again";
    else:
        if 'username' in session:
            return "Already logged in"
        else:
            return render_template("index.html")

# Controller for user logouts
@app.route("/logout", methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

if __name__ == "__main__":
	app.run()
