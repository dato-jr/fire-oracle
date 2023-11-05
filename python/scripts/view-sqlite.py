# !/usr/bin/env python3
import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('data/Data/FPA_FOD_20210617.sqlite')

# Create a cursor object
cursor = conn.cursor()

# Execute a SELECT statement to get all table names
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

# Fetch all the table names
table_names = cursor.fetchall()

# Now, 'table_names' is a list of tuples where each tuple corresponds to a table name in the database
for table_name in table_names:
    print(table_name[0])
