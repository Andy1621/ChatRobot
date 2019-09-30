#!/usr/bin/env python
# encoding: utf-8
'''
@author: Kunchnag Li
@contact: 812487273@qq.com
@file: main.py
@time: 2019/9/29 14:34
@desc:
'''
from flask import Flask, render_template, request
from datetime import timedelta
import json
import requests
import config

app = Flask(__name__)


app.config['DEBUG'] = False  # 开发期间设置为True，代码发生变动重新运行
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)

key = ""


@app.route('/')
@app.route('/index')
def hello_world():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/setting')
def setting():
    return render_template('setting.html')


@app.route('/robot')
def robot():
    return render_template('robot.html')


@app.route('/api/v1/login', methods=['POST'])
def api_login():
    name = request.form['name']
    pwd = request.form['pwd']
    res = dict()
    if name == config.NAME and pwd == config.PASSWORD:
        res['state'] = 'success'
    else:
        res['state'] = 'fail'
        if name != config.NAME:
            res['reason'] = "用户名错误"
        elif pwd != config.PASSWORD:
            res['reason'] = "密码错误"
    return json.dumps(res)


@app.route('/api/v1/getMsg', methods=['GET'])
def api_get():
    res = {
        'key': config.KEY
    }
    return json.dumps(res)


@app.route('/api/v1/submit', methods=['POST'])
def api_submit():
    global key
    key = request.form['key']
    return 'ok'


@app.route('/api/v1/ask', methods=['GET'])
def api_ask():
    global key
    data = {
        "reqType": 0,
        "perception": {
            "inputText": {
                "text": request.args.get('info')
            },
        },
        "userInfo": {
            "apiKey": key,
            "userId": "test"
        }
    }

    headers = {'Content-Type': 'application/json'}
    response = requests.post(config.ROBOT_URL, headers=headers, data=json.dumps(data)).json()
    robot_res = response["results"][0]['values']
    return json.dumps(robot_res)


if __name__ == '__main__':
    app.run()
