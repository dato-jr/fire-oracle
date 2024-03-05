"""
This script is meant to extract the table Fires from the database, using 
pandas to make the query and sqlite3 to connect to the local database.
"""
# !/usr/bin/env python3
import sqlite3
import pandas as pd 

# connect to the sqlite database
conn = sqlite3.connect("python/data/unprocessed/FPA_FOD_20210617.sqlite")

# execute a select statement to select Fires table from database
df_fire = pd.read_sql_query("SELECT * FROM Fires", conn)
df_other = pd.read_sql_query("SELECT * FROM NWCG_UnitIDActive_20200123", conn)

# select path to where the data from the fires table will be saved 
df_fire.to_csv('python/data/unprocessed/wildfire-dataset_copy.csv', index=False)
df_other.to_csv('python/data/unprocessed/NWCG_UnitIDActive_20200123_copy.csv', index=False)