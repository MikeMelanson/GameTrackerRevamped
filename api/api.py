from venv import create
from db import *
from query_builder import *
from flask import Flask
from flask import request
from flask_cors import CORS
import os
from PIL import Image
import base64
from io import BytesIO
import json

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
    
    #retrieve system info
    system_info = retrieve_system_info(connection,system)

    #get all data except image data and append to array for return
    data_array = []
    length = len(system_info[0])-1
    for i in range(length):
        data_array.append(system_info[0][i])

    #open image data as PIL Image, and save in as a base64 string before passing to front end
    imageBase64 = ''
    if system_info[0][13] != '':
        image = Image.open(BytesIO(system_info[0][13]))
        buffer = BytesIO()
        image.save(buffer,'PNG')
        imageBase64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

    close_connection(connection)
    return{'systemInfo':data_array,'image':imageBase64}

@app.route('/system_publishers')
def get_system_publishers():
    connection = create_connection()
    publishers = retrieve_system_publishers(connection)
    close_connection(connection)
    return{'publishers':publishers}

@app.route('/game_options_info')
def get_game_option_info():
    connection = create_connection()
    publishers = retrieve_game_publishers(connection)
    developers = retrieve_game_developers(connection)
    systems = select_all_non_wl_systems(connection)
    genres = retrieve_game_genres(connection)
    close_connection(connection)
    return{'publishers':publishers,'developers':developers,'systems':systems,'genres':genres}

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

    #get data and assign to variables
    data = request.get_json()
    name = data.get('name').replace("'","''") #scrub input
    format = data.get('format')
    publisher = data.get('publisher')
    pricePaid = data.get('pricePaid') #allow decimals, no need to round
    ownership = data.get('ownership')
    owned = data.get('owned')
    numCont = data.get('numCont')
    region = data.get('region')
    notes = data.get('notes').replace("'","''") #scrub input
    dateAcq = data.get('dateAcq')

    image = data.get('img')
    alpha_image_bytes = ""

    #open a temp image for editing, add an alpha, then save to a stream for passing to db
    if image!='':
        with open("../images/temp.png", 'wb') as fh:
            fh.write(base64.b64decode(image))
            fh.close()
        alpha_image = Image.open("../images/temp.png")
        alpha_image.putalpha(70)
        stream = BytesIO()
        alpha_image.save(stream,format="PNG")
        alpha_image_bytes = stream.getvalue()
        os.remove("../images/temp.png") #remove temp image when done! Very important!

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

@app.route('/send_new_game', methods=['GET','POST'])
def add_game_to_db():
    connection = create_connection()

    #get data and assign to variables
    data = request.get_json()
    title = data.get('title').replace("'","''") #scrub input
    system = data.get('system')
    status = data.get('status')
    pricePaid = data.get('pricePaid')
    rating = data.get('rating')
    publisher = data.get('publisher')
    developer = data.get('developer')
    condition = data.get('condition')
    completeness = data.get('completeness')
    timePlayed = data.get('timePlayed')
    region = data.get('region')
    ownership = data.get('ownership')
    notes = data.get('notes').replace("'","''") #scrub input
    nowPlaying = data.get('nowPlaying')
    if nowPlaying:
        nowPlaying = 1
    else:
        nowPlaying = 0
    eAchieve = data.get('eAchieve')
    tAchieve = data.get('tAchieve')
    owned = data.get('owned')
    genre1 = data.get('genre1')
    genre2 = data.get('genre2')
    acquiredFrom = data.get('acquiredFrom')
    compilation = data.get('compilation')
    dateAcq = data.get('dateAcq')
    link = data.get('link')
    value = data.get('value')

    image = data.get('img')
    alpha_image_bytes = ""

    nextID = get_max_game_id(connection)[0][0]
    if nextID != None:
        nextID = nextID + 1
    else:
        nextID = 0

    #open a temp image for editing, add an alpha, then save to a stream for passing to db
    if image!='' and image != None:
        with open("../images/temp.png", 'wb') as fh:
            fh.write(base64.b64decode(image))
            fh.close()
        alpha_image = Image.open("../images/temp.png")
        alpha_image.putalpha(70)
        stream = BytesIO()
        alpha_image.save(stream,format="PNG")
        alpha_image_bytes = stream.getvalue()
        os.remove("../images/temp.png") #remove temp image when done! Very important!

    query = """INSERT INTO Games (Id,Title,System,Status,PricePaid,Rating,Publisher,Developer,Condition,Completeness,TimePlayed,Region,Ownership,
            Notes,NowPlaying,EarnedAchievements,TotalAchievements,NumberOwned,Genre1,Genre2,AcquiredFrom,Compilation,DateAcquired,Wishlist,Image,ValueLink,Value)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
        """
    data_tuple = (
        nextID,title,system,status,pricePaid,rating,publisher,developer,condition,completeness,timePlayed,region,ownership,notes,nowPlaying,eAchieve,tAchieve,owned,
        genre1,genre2,acquiredFrom,compilation,dateAcq,0,alpha_image_bytes,link,value
    )
    execute_insert_query(connection,query,data_tuple)
    close_connection(connection)
    return ""
    
@app.route('/send_new_subgame', methods=['GET','POST'])
def add_subgame_to_db():
    connection = create_connection()

    #get data and assign to variables
    data = request.get_json()
    title = data.get('title').replace("'","''") #scrub input
    status = data.get('status')
    rating = data.get('rating')
    notes = data.get('notes').replace("'","''") #scrub input
    nowPlaying = data.get('nowPlaying')
    if nowPlaying:
        nowPlaying = 1
    else:
        nowPlaying = 0
    parentID = get_max_game_id(connection)[0][0]
    gameNumber = data.get('gameNumber')

    nextID = get_max_comp_id(connection)[0][0]
    if nextID != None:
        nextID = nextID + 1
    else:
        nextID = 1

    query = """INSERT INTO Compilations (ID,ParentID,GameNumber,Title,Status,Rating,Notes,NowPlaying)
            VALUES(?,?,?,?,?,?,?,?) 
        """
    data_tuple = (
        nextID,parentID,gameNumber,title,status,rating,notes,nowPlaying
    )
    execute_insert_query(connection,query,data_tuple)
    close_connection(connection)
    return ""

@app.route('/next_game_id')
def next_game_id():
    connection = create_connection()
    maxID = get_max_game_id(connection)
    maxID = maxID[0][0] + 1
    close_connection(connection)
    return {'nextID':maxID}

@app.route('/games_list_games')
def get_games_list_for_sys():
    connection = create_connection()
    system = request.headers.get('system')
    filters = request.headers.get('filters')
    filters = json.loads(filters)
    query = game_filter_build_query(system,filters[0]['status'],filters[0]['publisher'],filters[0]['developer'],filters[0]['condition'],filters[0]['completeness'],
                                    filters[0]['region'],filters[0]['ownership'],filters[0]['genre1'],filters[0]['genre2'],filters[0]['pricePaid1'],
                                    filters[0]['pricePaid2'],filters[0]['rating1'],filters[0]['rating2'])
    games = execute_query(connection,query)
    close_connection(connection)
    return {'games':games}

@app.route('/init_game')
def get_init_game():
    connection = create_connection()
    system = request.headers.get('system')
    games = retrieve_games_from_system(connection,system)
    game = ''
    if games:
        game = games[0]
    close_connection(connection)
    return{'init':game}

@app.route('/game_info')
def get_game_info():
    connection = create_connection()
    system = request.headers.get('system')
    game = request.headers.get('game')
    info = retrieve_game_info(connection,system,game)
    close_connection(connection)
    data_array = []
    if info:
        #get all data except image data and append to array for return
        length = len(info[0])-1
        for i in range(length):
            data_array.append(info[0][i])
    
    #open image data as PIL Image, and save in as a base64 string before passing to front end
    imageBase64 = ''
    if info:
        if info[0][27] != '':
            image = Image.open(BytesIO(info[0][27]))
            buffer = BytesIO()
            image.save(buffer,'PNG')
            imageBase64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

    return{'gameInfo':data_array,'image':imageBase64}

@app.route('/game_info_ID')
def get_game_info_ID():
    connection = create_connection()
    gameID = request.headers.get('gameID')
    info = retrieve_game_info_from_ID(connection,gameID)
    close_connection(connection)
    data_array = []
    if info:
        #get all data except image data and append to array for return
        length = len(info[0])-1
        for i in range(length):
            data_array.append(info[0][i])

    return{'gameInfo':data_array}

@app.route('/sub_games_info')
def get_sub_game_info():
    connection = create_connection()
    gameID = request.headers.get('gameID')
    info = retrieve_sub_game_info(connection,gameID)
    close_connection(connection)
    return{'subInfo':info}

@app.route('/single_sub_game_info')
def get_single_sub_game_info():
    connection = create_connection()
    gameID = request.headers.get('gameID')
    info = retrieve_single_sub_game(connection,gameID)
    data_array = []
    if info:
        #get all data except image data and append to array for return
        length = len(info[0])
        for i in range(length):
            data_array.append(info[0][i])
    close_connection(connection)
    return{'subGame':data_array}


@app.route('/delete_game', methods=['GET','POST'])
def delete_game():
    connection = create_connection()
    data = request.get_json()
    gameID = data.get('game')
    system = data.get('system')

    d_query = "DELETE FROM Games WHERE Id='"+str(gameID)+"' AND System='"+system+"'"
    execute_delete_query(connection,d_query)

    return ""

@app.route('/delete_sub_game', methods=['GET','POST'])
def delete_sub_game():
    connection = create_connection()
    data = request.get_json()
    gameID = data.get('game')
    gameNum = data.get('subGame')
    print(gameID)
    print(gameNum)

    d_query = "DELETE FROM Compilations WHERE ParentID='"+str(gameID)+"' AND GameNumber='"+str(gameNum)+"'"
    execute_delete_query(connection,d_query)

    return ""

@app.route('/update_game', methods=['GET','POST'])
def update_game():
    connection = create_connection()
    data = request.get_json()
    gameID = data.get('ID')
    title = data.get('title')
    system = data.get('system')
    status = data.get('status')
    pricePaid = data.get('pricePaid')
    rating = data.get('rating')
    publisher = data.get('publisher')
    developer = data.get('developer')
    condition = data.get('condition')
    completeness = data.get('completeness')
    timePlayed = data.get('timePlayed')
    region = data.get('region')
    ownership = data.get('ownership') 
    notes = data.get('notes')
    nowPlaying = data.get('nowPlaying')
    eAcheive = data.get('eAchieve')
    tAchieve = data.get('tAchieve')
    owned = data.get('owned')
    genre1 = data.get('genre1')
    genre2 = data.get('genre2')
    acquiredFrom = data.get('acquiredFrom')
    dateAcq = data.get('dateAcq')
    link = data.get('link')
    value = data.get('value')
    img = data.get('img')
    imgRemove = data.get('imgRemove')

    alpha_image_bytes = ""

    if not imgRemove:
        #open a temp image for editing, add an alpha, then save to a stream for passing to db
        if img!='' and img != None:
            with open("../images/temp.png", 'wb') as fh:
                fh.write(base64.b64decode(img))
                fh.close()
            alpha_image = Image.open("../images/temp.png")
            alpha_image.putalpha(70)
            stream = BytesIO()
            alpha_image.save(stream,format="PNG")
            alpha_image_bytes = stream.getvalue()
            os.remove("../images/temp.png") #remove temp image when done! Very important!

            query = """UPDATE Games SET Title=?,System=?,Status=?,PricePaid=?,Rating=?,Publisher=?,Developer=?,Condition=?,Completeness=?,TimePlayed=?,Region=?,Ownership=?,
                Notes=?,NowPlaying=?,EarnedAchievements=?,TotalAchievements=?,NumberOwned=?,Genre1=?,Genre2=?,AcquiredFrom=?,DateAcquired=?,ValueLink=?,Value=?,Image=?
                WHERE Id='"""+str(gameID)+"""'"""

            d_tuple=(
                title,
                system,
                status,
                pricePaid,
                rating,
                publisher,
                developer,
                condition,
                completeness,
                timePlayed,
                region,
                ownership,
                notes,
                nowPlaying,
                eAcheive,
                tAchieve,
                owned,
                genre1,
                genre2,
                acquiredFrom,
                dateAcq,
                link,
                value,
                alpha_image_bytes
            )
        else:
            query = """UPDATE Games SET Title=?,System=?,Status=?,PricePaid=?,Rating=?,Publisher=?,Developer=?,Condition=?,Completeness=?,TimePlayed=?,Region=?,Ownership=?,
                Notes=?,NowPlaying=?,EarnedAchievements=?,TotalAchievements=?,NumberOwned=?,Genre1=?,Genre2=?,AcquiredFrom=?,DateAcquired=?,ValueLink=?,Value=?
                WHERE Id='"""+str(gameID)+"""'"""

            d_tuple=(
                title,
                system,
                status,
                pricePaid,
                rating,
                publisher,
                developer,
                condition,
                completeness,
                timePlayed,
                region,
                ownership,
                notes,
                nowPlaying,
                eAcheive,
                tAchieve,
                owned,
                genre1,
                genre2,
                acquiredFrom,
                dateAcq,
                link,
                value,
            )
    else:
        query = """UPDATE Games SET Title=?,System=?,Status=?,PricePaid=?,Rating=?,Publisher=?,Developer=?,Condition=?,Completeness=?,TimePlayed=?,Region=?,Ownership=?,
                Notes=?,NowPlaying=?,EarnedAchievements=?,TotalAchievements=?,NumberOwned=?,Genre1=?,Genre2=?,AcquiredFrom=?,DateAcquired=?,ValueLink=?,Value=?,Image=?
                WHERE Id='"""+str(gameID)+"""'"""

        d_tuple=(
            title,
            system,
            status,
            pricePaid,
            rating,
            publisher,
            developer,
            condition,
            completeness,
            timePlayed,
            region,
            ownership,
            notes,
            nowPlaying,
            eAcheive,
            tAchieve,
            owned,
            genre1,
            genre2,
            acquiredFrom,
            dateAcq,
            link,
            value,
            alpha_image_bytes
        )

    execute_update_query(connection,query,d_tuple)

    return ""

@app.route('/update_sub_game', methods=['GET','POST'])
def update_sub_game():
    connection = create_connection()
    data = request.get_json()
    gameID = data.get('ID')
    title = data.get('title')
    status = data.get('status')
    rating = data.get('rating')
    notes = data.get('notes')
    nowPlaying = data.get('nowPlaying')

    query = """UPDATE Compilations SET Title=?,Status=?,Rating=?,Notes=?,NowPlaying=? WHERE Id='"""+str(gameID)+"""'"""

    d_tuple=(
        title,
        status,
        rating,
        notes,
        nowPlaying,
    )

    execute_update_query(connection,query,d_tuple)

    return ""