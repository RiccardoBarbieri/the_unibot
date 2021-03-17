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
                            course INTEGER,
                            year INTEGER CHECK (year >= 1 AND year <= 5) DEFAULT 1,
                            detail INTEGER CHECK (detail >= 1 AND detail <= 3) DEFAULT 2,
                            curricula TEXT DEFAULT "000-000",
                            PRIMARY KEY (chat_id, user_id)
                            ) WITHOUT ROWID;''')
    
    def insert(self, chat_id, user_id, course = '', year = 1, detail = 1, curricula = '000-000'):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            val = (chat_id, user_id, course, year, detail, curricula)
            try:
                cursor.execute('INSERT INTO data VALUES (?,?,?,?,?,?)', val)
            except sqlite3.IntegrityError as e:
                print('{msg}, not inserting '.format(msg = str(e)) + str(val))
            connection.commit()
        
    def update(self, chat_id, user_id, course = None, year = None, detail = None, curricula = None):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            if course == None:
                course = self.query_by_ids(chat_id, user_id)[0]['course']
            if year == None:
                year = self.query_by_ids(chat_id, user_id)[0]['year']
            if detail == None:
                detail = self.query_by_ids(chat_id, user_id)[0]['detail']
            if curricula == None:
                curricula = self.query_by_ids(chat_id, user_id)[0]['curricula']
            data = (course, detail, curricula, year, chat_id, user_id)
            cursor.execute('UPDATE data SET course = ?, detail = ?, curricula = ?, year = ? WHERE (chat_id, user_id) = (?,?)', data)
            connection.commit()
    
    def query_all(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM data')
            connection.commit()
            result = []
            for i in cursor.fetchall():
                result.append(dict(chat_id = i[0], user_id = i[1], course = i[2], year = i[3], detail = i[4], curricula = i[5]))
            return result
    
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
            result = []
            for i in cursor.fetchall():
                result.append(dict(chat_id = i[0], user_id = i[1], course = i[2], year = i[3], detail = i[4], curricula = i[5]))
            return result

    def delete_all(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('DELETE FROM data WHERE 1 = 1')
            connection.commit()

    def backup(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM data')
            data = cursor.fetchall()
            with open('./database/backup.json', 'w+') as f:
                json.dump(data, f)
    
    def restore_backup(self):
        with open(Path('./database/backup.json')) as f:
            data = json.load(f)
        for i in data:
            self.insert(i[0], i[1], i[2], i[3], i[4], i[5])
        
        

        

if __name__ == '__main__':
    db = Database(Path('./database/telegram.db'))
    print(db.query_all())