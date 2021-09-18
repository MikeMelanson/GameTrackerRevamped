from db import *
from flask import Flask

app = Flask(__name__)

@app.route('/systems')
def get_systems():
    connection = create_connection()
    systems_arr = select_all_non_wl_systems(connection)
    connection.close
    return {'systems': systems_arr}

@app.route('/test')
def test():
    return {'test' : "test"}