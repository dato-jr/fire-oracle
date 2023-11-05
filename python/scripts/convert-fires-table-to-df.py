# !/usr/bin/env python3
import sqlite3
import pandas as pd 

# connect to the sqlite database
conn = sqlite3.connect("data/Data/FPA_FOD_20210617.sqlite")

# execute a select statement
df = pd.read_sql_query("SELECT * FROM Fires", conn)

df.to_csv('data/wildfire-dataset.csv', index=False)

