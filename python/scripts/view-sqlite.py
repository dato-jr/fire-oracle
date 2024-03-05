"""
This script works to see all tables available in the database using sqlite3.
"""
# !/usr/bin/env python3
import sqlite3
import pandas as pd

# Connect to the SQLite database
conn = sqlite3.connect('python/data/unprocessed/FPA_FOD_20210617.sqlite')

# Create a cursor object
cursor = conn.cursor()

# Execute a SELECT statement to get all table names
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

# Fetch all the table names
table_names = cursor.fetchall()

# Now, 'table_names' is a list of tuples where each tuple corresponds to a table name in the database
print("\n")
print("*"*80)
print("Tables:")
for table_name in table_names:
    # view tables available
    print(table_name[0])

df = pd.read_sql_query("select * from Fires;", conn)
columns = (list(df.columns))
print(f"\nFire columns: {columns}")
