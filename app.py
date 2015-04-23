from flask import Flask, send_from_directory
app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('static/css', path)


if __name__ == "__main__":
    app.run()