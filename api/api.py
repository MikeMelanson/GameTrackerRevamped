from os import close
from db import *
from flask import Flask
from flask import request
from PIL import Image
from io import BytesIO
import io
import base64
import numpy

app = Flask(__name__)

@app.route('/init')
def init_db():
    connection=create_connection()
    close_connection(connection)
    return ''

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

@app.route('/np')
def get_np():
    connection = create_connection()
    np = get_np_games(connection)
    close_connection(connection)
    return {'np':np}

@app.route('/status_totals')
def get_statuses():
    connection = create_connection()
    total = get_games_count(connection)[0][0]
    unplayed = get_unplayed_total(connection)[0][0]
    unbeaten = get_unbeaten_total(connection)[0][0]
    beaten = get_beaten_total(connection)[0][0]
    completed = get_completed_total(connection)[0][0]
    nullg = get_null_total(connection)[0][0]

    unplayedPercentage = 0 if total==0 else round(unplayed*100/total,1)
    unbeatenPercentage = 0 if total==0 else round(unbeaten*100/total,1)
    beatenPercentage = 0 if total==0 else round(beaten*100/total,1)
    completedPercentage = 0 if total==0 else round(completed*100/total,1)
    nullPercentage = 0 if total==0 else round(nullg*100/total,1)
    return {'unbeaten':unbeaten,'unplayed':unplayed,'beaten':beaten,'completed':completed,'nullg':nullg,
        'unplayedP':unplayedPercentage,'unbeatenP':unbeatenPercentage,'beatenP':beatenPercentage,'completedP':completedPercentage,'nullP':nullPercentage}
    
@app.route('/system_info')
def get_system_info():
    system = request.headers.get('System')
    connection = create_connection()
    system_info = retrieve_system_info(connection,system)
    close_connection(connection)
    return{'systemInfo':system_info}

@app.route('/spec_system_totals')
def get_system_stats():
    system = request.headers.get('System')
    connection = create_connection()
    system_stats = retrieve_system_stats(connection,system)
    total = system_stats['unplayed'] + system_stats['unbeaten'] + system_stats['beaten'] + system_stats['completed'] + system_stats['nullg']
    unplayedPercentage = 0 if total==0 else round(system_stats['unplayed']*100/total,1)
    unbeatenPercentage = 0 if total==0 else round(system_stats['unbeaten']*100/total,1)
    beatenPercentage = 0 if total==0 else round(system_stats['beaten']*100/total,1)
    completedPercentage = 0 if total==0 else round(system_stats['completed']*100/total,1)
    nullPercentage = 0 if total==0 else round(system_stats['nullg']*100/total,1)
    system_stats['unplayedP']=unplayedPercentage
    system_stats['unbeatenP']=unbeatenPercentage
    system_stats['beatenP']=beatenPercentage
    system_stats['completedP']=completedPercentage
    system_stats['nullP']=nullPercentage
    system_stats['total']=total
    close_connection(connection)
    return system_stats

@app.route('/test')
def test():
    return {'test' : "test"}