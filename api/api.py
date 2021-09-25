from db import *
from flask import Flask
from flask import request
from flask_cors import CORS
import os
from PIL import Image
import base64
from io import BytesIO


app = Flask(__name__)
CORS(app)

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
    data_array = []
    length = len(system_info[0])-1
    for i in range(length):
        data_array.append(system_info[0][i])
    image = Image.open(BytesIO(system_info[0][13]))
    buffer = BytesIO()
    image.save(buffer,'PNG')
    imageBase64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    close_connection(connection)
    print(data_array)
    return{'systemInfo':data_array,'image':imageBase64}

@app.route('/system_publishers')
def get_system_publishers():
    connection = create_connection()
    publishers = retrieve_system_publishers(connection)
    close_connection(connection)
    return{'publishers':publishers}

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

@app.route('/send_new_system', methods=['GET','POST'])
def add_system_to_db():
    connection = create_connection()
    #retrieve id for image naming
    id = get_max_sys_id(connection)[0][0] + 1

    #get data and assign to variables
    data = request.get_json()
    name = data.get('name')
    format = data.get('format')
    publisher = data.get('publisher')
    pricePaid = data.get('pricePaid')
    ownership = data.get('ownership')
    owned = data.get('owned')
    numCont = data.get('numCont')
    region = data.get('region')
    notes = data.get('notes')
    dateAcq = data.get('dateAcq')
    image = data.get('img')
    final_img_string = ''
    alpha_image_bytes = ""

    if not os.path.isfile("../images/temp.png") and image!='':
        with open("../images/temp.png", 'wb') as fh:
            fh.write(base64.b64decode(image))
            fh.close()
        alpha_image = Image.open("../images/temp.png")
        alpha_image.putalpha(70)
        stream = BytesIO()
        alpha_image.save(stream,format="PNG")
        alpha_image_bytes = stream.getvalue()
        #alpha_image.save("../images/sys" + str(id) + ".png")
        #buffered = BytesIO()
        #alpha_image.save(buffered,format='PNG')
        #new_img = base64.b64encode(buffered.getvalue())
        #final_img_string = new_img.decode('utf-8')
        os.remove("../images/temp.png")

    query = """INSERT INTO Systems (Name,Format,Publisher,PricePaid,Ownership,Owned,
            NumberControllers,Region,Notes,DateAcquired,Wishlist,Image)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?) 
        """
    data_tuple = (
        name,format,publisher,pricePaid,ownership,owned,numCont,region,notes,dateAcq,0,alpha_image_bytes
    )
    execute_insert_query(connection,query,data_tuple)
    close_connection(connection)
    return ""
    

@app.route('/test')
def test():
    return {'test' : "test"}