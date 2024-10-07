from flask import Flask
app = Flask(__name__, template_folder='templates', static_folder='static', static_url_path='/')


@app.route("/")
def index():
	return "Hello World, from flask!"


if __name__ == '__main__':
	app.run(debug=True)

