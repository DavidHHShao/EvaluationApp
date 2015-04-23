from flask import Flask, send_from_directory, request
import os
from pymongo import MongoClient
app = Flask(__name__, static_url_path='')

mongo_uri = os.environ['MONGOLAB_URI']
mongo_database_str = mongo_uri.split('/')[-1]
client = MongoClient(mongo_uri)
db = client[mongo_database_str]
users_collection = db['users']

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('static/css', path)


@app.route('/register', methods=['POST'])
def register():
    post_obj = request.get_json()
    doc = {
        'username': post_obj['username'],
        'email': post_obj['email'],
        'password': post_obj['password']
    }
    users_collection.insert(doc)
    return 'Success'


if __name__ == "__main__":
    app.run()