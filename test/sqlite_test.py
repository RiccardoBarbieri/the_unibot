import sqlite3


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except sqlite3.Error as e:
        print(e)
    return conn


connection = create_connection('telegram.db')

cursor = connection.cursor()

# creazione tabella
# cursor.execute('''CREATE TABLE IF NOT EXISTS data (
#                   chat_id INTEGER,
#                   user_id INTEGER,
#                   course TEXT,
#                   year INTEGER CHECK (year >= 1 AND year <= 3),
#                   detail INTEGER CHECK (detail >= 1 AND detail <= 3),
#                   curricula TEXT,
#                   PRIMARY KEY (chat_id, user_id)
#                   ) WITHOUT ROWID;''')

# stampa tabelle esistenti
# cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
# print((cursor.fetchall()))

connection.commit()
connection.close()
