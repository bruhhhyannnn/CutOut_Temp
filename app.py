from flask import Flask, render_template
app = Flask(__name__, template_folder='templates', static_folder='static', static_url_path='/')


@app.route("/")
def index():
	return render_template('/base.html')


@app.route("/main_page")
def main_page():
	return render_template('/main-page.html')


@app.route("/swapping_select_face")
def swapping_select_face():
	return render_template('/swapping-select-face.html')


@app.route("/swapping_progress")
def swapping_progress():
	return render_template('/swapping-progress.html')


if __name__ == '__main__':
	app.run(debug=True)

