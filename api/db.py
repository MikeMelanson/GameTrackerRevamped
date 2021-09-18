import sqlite3
from sqlite3 import Error
import os
from variables import games_table_query,systems_table_query, gvalues_table_query, options_table_query,changes_table_query

def create_connection():
    conn = None
    try:
        if os.path.isfile(r"../GameTracker.db"):
            conn = sqlite3.connect(r"../GameTracker.db")
            print('exists')
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
            
            cursor.close()
            print('does not exist')
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
    cur.execute("SELECT * FROM Systems WHERE Wishlist = 0 ORDER BY Name")
    rows = cur.fetchall()
    return rows

def get_systems_count(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Name) AS total from Systems WHERE Wishlist=0")
    rows = cur.fetchall()
    return rows

def get_games_count(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(Id) AS total from Games WHERE Wishlist=0")
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
