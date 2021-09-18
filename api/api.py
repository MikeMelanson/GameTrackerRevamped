from db import *
from flask import Flask

app = Flask(__name__)

@app.route('/systems')
def get_systems():
    connection = create_connection()
    systems_arr = select_all_non_wl_systems(connection)
    close_connection(connection)
    return {'systems': systems_arr}

@app.route('/systems_total')
def get_systems_total():
    connection = create_connection()
    total = get_systems_count(connection)
    close_connection(connection)
    return {'total':total}

@app.route('/games_total')
def get_games_total():
    connection = create_connection()
    total = get_games_count(connection)
    close_connection(connection)
    return {'total':total}

@app.route('/test')
def test():
    return {'test' : "test"}