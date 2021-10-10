import sqlite3
from sqlite3 import Error
import os
from variables import games_table_query,systems_table_query, gvalues_table_query, options_table_query,changes_table_query,metacritic_table_query

def create_connection():
    conn = None
    try:
        if os.path.isfile(r"../GameTracker.db"):
            conn = sqlite3.connect(r"../GameTracker.db")
        else:
            conn = sqlite3.connect(r"../GameTracker.db")
            cursor = conn.cursor()
            cursor.execute(games_table_query)
            cursor.execute(systems_table_query)
            cursor.execute(gvalues_table_query)
            cursor.execute(options_table_query)
            cursor.execute("INSERT INTO Options default values;")
            conn.commit()
            cursor.execute(changes_table_query)
            cursor.execute(metacritic_table_query)
            
            cursor.close()
    except Error as e:
        print(e)
        print('error')

    return conn

def select_all_games(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM Games ORDER BY Title ASC")

    rows = cur.fetchall()
    return rows

def select_all_systems(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM Systems ORDER BY Name")

    rows = cur.fetchall()
    return rows

def select_all_non_wl_systems(conn):
    cur = conn.cursor()
    cur.execute("SELECT Name FROM Systems WHERE Wishlist = 0 ORDER BY Name")
    rows = cur.fetchall()
    return rows

def get_systems_count(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Name) AS total FROM Systems WHERE Wishlist=0")
    rows = cur.fetchall()
    return rows

def get_max_sys_id(conn):
    cur = conn.cursor()
    cur.execute("SELECT MAX(Id) FROM Systems")
    rows = cur.fetchall()
    return rows

def get_max_game_id(conn):
    cur = conn.cursor()
    cur.execute("SELECT MAX(Id) FROM Games")
    rows = cur.fetchall()
    return rows

def get_max_comp_id(conn):
    cur = conn.cursor()
    cur.execute("SELECT MAX(Id) FROM Compilations")
    rows = cur.fetchall()
    return rows

def get_games_count(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Id) AS total FROM Games WHERE Wishlist=0")
    rows = cur.fetchall()
    return rows

def get_np_games(conn):
    cur = conn.cursor()
    cur.execute("SELECT Title,System,Status FROM Games WHERE Wishlist=0 AND NowPlaying=1 ORDER BY System")
    rows = cur.fetchall()
    return rows

def get_unplayed_total(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Id) AS Total FROM Games WHERE Status='Unplayed' and Wishlist=0")
    rows = cur.fetchall()
    return rows

def get_unbeaten_total(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Id) AS Total FROM Games WHERE Status='Unbeaten' and Wishlist=0")
    rows = cur.fetchall()
    return rows

def get_beaten_total(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Id) AS Total FROM Games WHERE Status='Beaten' and Wishlist=0")
    rows = cur.fetchall()
    return rows

def get_completed_total(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Id) AS Total FROM Games WHERE Status='Completed' and Wishlist=0")
    rows = cur.fetchall()
    return rows

def get_null_total(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Id) AS Total FROM Games WHERE Status='Null' and Wishlist=0")
    rows = cur.fetchall()
    return rows

def retrieve_system_info(conn,system):
    cur = conn.cursor()
    cur.execute("SELECT * FROM Systems WHERE Name = '"  + system + "' AND Wishlist=0")
    rows = cur.fetchall()
    return rows

def retrieve_system_stats(conn,system):
    cur = conn.cursor()
    rows = {'unplayed':0,'unbeaten':0,'beaten':0,'completed':0,'nullg':0}
    cur.execute("SELECT Count(g.Id) AS number FROM Games g LEFT JOIN Compilations c ON g.Id = c.ParentID  WHERE g.System='" + system + "' AND (g.Status = 'Unplayed' OR c.Status = 'Unplayed') AND g.Wishlist = 0")
    rows['unplayed'] = cur.fetchall()[0][0]
    cur.execute("SELECT Count(g.Id) AS number FROM Games g LEFT JOIN Compilations c ON g.Id = c.ParentID  WHERE g.System='" + system + "' AND (g.Status = 'Unbeaten' OR c.Status = 'Unbeaten') AND g.Wishlist = 0")
    rows['unbeaten'] = cur.fetchall()[0][0]
    cur.execute("SELECT Count(g.Id) AS number FROM Games g LEFT JOIN Compilations c ON g.Id = c.ParentID  WHERE g.System='" + system + "' AND (g.Status = 'Beaten' OR c.Status = 'Beaten') AND g.Wishlist = 0")
    rows['beaten'] = cur.fetchall()[0][0]
    cur.execute("SELECT Count(g.Id) AS number FROM Games g LEFT JOIN Compilations c ON g.Id = c.ParentID  WHERE g.System='" + system + "' AND (g.Status = 'Completed' OR c.Status = 'Completed') AND g.Wishlist = 0")
    rows['completed'] = cur.fetchall()[0][0]
    cur.execute("SELECT Count(g.Id) AS number FROM Games g LEFT JOIN Compilations c ON g.Id = c.ParentID  WHERE g.System='" + system + "' AND (g.Status = 'Null' OR c.Status = 'Null') AND g.Wishlist = 0")
    rows['nullg'] = cur.fetchall()[0][0]
    return rows

def retrieve_system_publishers(conn):
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT Publisher FROM Systems WHERE Wishlist=0 AND Publisher!='' ORDER BY Publisher COLLATE NOCASE ASC")
    rows = cur.fetchall()
    return rows

def retrieve_game_publishers(conn):
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT Publisher FROM Games WHERE Wishlist=0 AND Publisher!='' ORDER BY Publisher COLLATE NOCASE ASC")
    rows = cur.fetchall()
    return rows

def retrieve_game_developers(conn):
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT Developer FROM Games WHERE Wishlist=0 AND Developer!='' ORDER BY Developer COLLATE NOCASE ASC")
    rows = cur.fetchall()
    return rows

def retrieve_game_genres(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM (SELECT Genre1 AS Genre FROM Games UNION SELECT Genre2 AS Genre FROM Games)t Order by t.Genre COLLATE NOCASE ASC;")
    rows = cur.fetchall()
    return rows

def close_connection(conn):
    conn.close()

def execute_query(conn,query):
    cur = conn.cursor()
    cur.execute(query)

    rows = cur.fetchall()
    return rows

def execute_update_query(conn,query,dtuple):
    cur = conn.cursor()
    cur.execute(query,dtuple)
    conn.commit()
    cur.close()

def execute_update_query_no_tuple(conn,query):
    cur = conn.cursor()
    cur.execute(query)
    conn.commit()
    cur.close()

def execute_insert_query(conn,query,dtuple):
    cur = conn.cursor()
    cur.execute(query,dtuple)
    conn.commit()
    cur.close()

def execute_delete_query(conn,query):
    cur = conn.cursor()
    cur.execute(query)
    conn.commit()
    cur.close()
