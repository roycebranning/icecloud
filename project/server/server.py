# server.py
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static/dist",
template_folder="../static")

@app.route("/")
def index():
	return render_template("index.html")

'''@app.route("/index2")
def index2():
	return render_template("index2.html")'''

@app.route("/hello")
def hello():
	return "Hello World!"

if __name__ == "__main__":
	app.run()
