def is_sha1(maybe_sha):
    if len(maybe_sha) != 40:
        return False
    try:
        sha_int = int(maybe_sha, 16)
    except ValueError:
        return False
    return True

def validate(date_text):
    try:
        datetime.datetime.strptime(date_text, '%d-%m-%Y:%S-%M-%H')
        return True
    except ValueError:
        return False

from flask_cors import CORS
from flask import Flask, render_template, Response, request, jsonify
import pandas as pd
import os
import json
import shutil
import datetime
import base64
import binascii
import datetime

LOGIN_FILE_NAME = "login.csv"
DB = "templates/images" 
GLOBAL_LIST = "acts.csv"
count_requests = 0

app = Flask(__name__)
CORS(app)


@app.errorhandler(405)
def method_not_allowed(e):
	global count_requests
	count_requests += 1
	return jsonify({'error': 405}), 405

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/v1/users", methods = ['POST', 'GET'])
def add_user():
    global count_requests
    count_requests += 1
    if request.method == 'POST':
        #print(request.data.decode('utf-8'))
        request_json =json.loads(request.data.decode('utf-8'))
        user_n = request_json['username']
        pwd = request_json['password']
        
        if not LOGIN_FILE_NAME in os.listdir():
            data = pd.DataFrame(columns = ['username', 'password'])
            data.to_csv(LOGIN_FILE_NAME, index = False)

        if not is_sha1(str(pwd)):
            return Response('{}', status=400, mimetype='application/json')

        data = pd.read_csv(LOGIN_FILE_NAME)
        if user_n in data['username'].tolist():
            return Response('{}', status=400, mimetype='application/json')

        data = data.append({'username': user_n, 'password': pwd}, ignore_index = True)
        data.to_csv(LOGIN_FILE_NAME, index = False)
        return Response('{}', status=201, mimetype='application/json')
    
    elif request.method == 'GET':    
        print(request.headers)
        if not LOGIN_FILE_NAME in os.listdir():
            data = pd.DataFrame(columns = ['username', 'password'])
            data.to_csv(LOGIN_FILE_NAME, index = False)
            return Response('[]', status=204, mimetype='application/json')
        
        data = pd.read_csv(LOGIN_FILE_NAME)
        response = data["username"].tolist()
        return Response("[\"" + "\",\"".join(response) + "\"]", status = 200, mimetype='application/json')
        
    else:
        return Response('{}', status=405, mimetype='application/json')
    
@app.route("/api/v1/users/<username>", methods = ["DELETE"])
def remove_user(username = None):
    global count_requests
    count_requests += 1
    if request.method == 'DELETE':
        if not LOGIN_FILE_NAME in os.listdir():
            data = pd.DataFrame(columns = ['username', 'password'])
            data.to_csv(LOGIN_FILE_NAME, index = False)
        
        data = pd.read_csv(LOGIN_FILE_NAME)
        if username not in data['username'].tolist():
            return Response('{}', status=400, mimetype='application/json')

        data = data[data.username != username]
        data.to_csv(LOGIN_FILE_NAME, index = False)
        return Response('{}', status=200, mimetype='application/json')

    else:
        return Response('{}', status=405, mimetype='application/json')

@app.route("/api/v1/acts/count", methods = ["GET"])
def count_act():
    if request.method == 'GET':
        if not GLOBAL_LIST in os.listdir():
            return Response('[0]', status=200, mimetype='application/json')
        else:
            data_acts = pd.read_csv(GLOBAL_LIST)
            count_acts = data_acts.shape[0]
            return Response('['+ str(count_acts) +']', status=200, mimetype='application/json')
    else:
        return Response('{}', status=405, mimetype='application/json')

@app.route("/api/v1/_count", methods = ["GET", "DELETE"])
def count_request():
    global count_requests
    if request.method == 'GET':
        return Response('['+ str(count_requests) +']', status=200, mimetype='application/json')
    elif request.method == 'DELETE':
        count_requests = 0
        return Response('{}', status=200, mimetype='application/json')
    else:
        return Response('{}', status=405, mimetype='application/json')
    
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 80, threaded=True)
    #app.run(threaded = True, debug = True)
