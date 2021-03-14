import sqlite3
import json
from pathlib import Path


class Database():

    path = None

    def __init__(self, file_path):
        self.path = file_path
        self.create_table()
    
    def create_table(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('''CREATE TABLE IF NOT EXISTS data (
                            chat_id INTEGER,
                            user_id INTEGER,
                            course TEXT,
                            year INTEGER CHECK (year >= 0 AND year <= 3),
                            detail INTEGER CHECK (detail >= 0 AND detail <= 3),
                            curricula TEXT,
                            PRIMARY KEY (chat_id, user_id)
                            ) WITHOUT ROWID;''')
    
    def insert(self, chat_id, user_id, course = '', detail = 0, curricula = '', year = 0):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            val = (chat_id, user_id, course, year, detail, curricula)
            try:
                cursor.execute('INSERT INTO data VALUES (?,?,?,?,?,?)', val)
            except sqlite3.IntegrityError:
                print('Primary key duplicated, not inserting ' + str(val))
            connection.commit()
        
    def update(self, chat_id, user_id, course = '', detail = 0, curricula = '', year = 0):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            data = (course, detail, curricula, year, chat_id, user_id)
            cursor.execute('UPDATE data SET course = ?, detail = ?, curricula = ?, year = ? WHERE (chat_id, user_id) = (?,?)', data)
            connection.commit()
    
    def query_all(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM data')
            connection.commit()
            return cursor.fetchall()
    
    def custom_query(self, query = '', data = None):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            if data is None:
                cursor.execute(query)
            else:
                cursor.execute(query, data)
            connection.commit()
            return cursor.fetchall()

    def query_by_ids(self, chat_id, user_id):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            data = (chat_id, user_id)
            query = 'SELECT * FROM data WHERE (chat_id, user_id) = (?, ?)'
            cursor.execute(query, data)
            connection.commit()
            return cursor.fetchall()

    def delete_all(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('DELETE FROM data WHERE 1 = 1')

    def backup(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM data')
            dictionary = cursor.fetchall()
            with open('./database/backup.json', 'w+') as f:
                json.dump(dictionary, f)

if __name__ == '__main__':
    db = Database(Path('./database/telegram.db'))

    print(db.query_all())