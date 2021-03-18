import sqlite3
import json
from pathlib import Path
from pprint import pprint


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
                            course INTEGER NOT NULL,
                            year INTEGER CHECK (year >= 1 AND year <= 5) DEFAULT 1,
                            detail INTEGER CHECK (detail >= 1 AND detail <= 3) DEFAULT 2,
                            curricula TEXT DEFAULT "000-000",
                            PRIMARY KEY (chat_id, user_id)
                            ) WITHOUT ROWID;''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS courses (
                            course_name TEXT NOT NULL,
                            course_code INTEGER,
                            campus TEXT NOT NULL,
                            international INTEGER NOT NULL,
                            access TEXT NOT NULL,
                            site TEXT NOT NULL,
                            course_codec TEXT NOT NULL,
                            PRIMARY KEY (course_code)
                            ) WITHOUT ROWID;''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS curriculas (
                            course_code INTEGER NOT NULL,
                            label TEXT,
                            code TEXT NOT NULL,
                            PRIMARY KEY (label),
                            FOREIGN KEY (course_code) REFERENCES data(course_code) ON DELETE CASCADE
                            ) WITHOUT ROWID;''')

    def insert(self, table, **kwargs):

        data = tuple([kwargs[i] for i in kwargs])
        cols = tuple([i for i in kwargs])

        if len(data) == 1:
            data = str(data)[:-2] + ')'
            cols = str(cols)[:-2] + ')'

        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            try:
                cursor.execute('INSERT INTO {table} {cols} VALUES {data}'.format(
                    table=str(table), cols=str(cols).replace('\'', ''), data=str(data)))
            except sqlite3.IntegrityError as e:
                print('{msg}, not inserting {data}'.format(
                    msg=str(e), data=str(data)))

    # pass primary key possibly first and as follows: primary_key_[key1] = val1, primary_key_[key2] = val2 ...
    def update(self, table, **kwargs):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            where_data = tuple([kwargs[i]
                                for i in kwargs if ('primary_key' in i)])
            where_cols = tuple([i.replace('primary_key_', '') for i in kwargs if ('primary_key' in i)])
            
            data = tuple([kwargs[i]
                          for i in kwargs if not ('primary_key' in i)])
            cols = tuple([i for i in kwargs if not ('primary_key' in i)])

            if len(data) == 1:
                data = str(data)[:-2] + ')'
                cols = str(cols)[:-2] + ')'
            if len(where_data) == 1:
                where_data = str(where_data)[:-2] + ')'
                where_cols = str(where_cols)[:-2] + ')'
            
            try:
                cursor.execute('UPDATE {table} SET {cols} = {data} WHERE {where_cols} = {where_data}'.format(
                    table=table, cols=str(cols).replace('\'', ''), data=str(data), where_cols=str(where_cols).replace('\'', ''), where_data=str(where_data)))
            except sqlite3.IntegrityError as e:
                print('{msg}, not inserting {data}'.format(
                    msg=str(e), data=str(data)))

    def query_all(self, table):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM {table}'.format(table = table))
            result = []
            for i in cursor.fetchall():
                result.append(dict(
                    chat_id=i[0], user_id=i[1], course=i[2], year=i[3], detail=i[4], curricula=i[5]))
            return result

    def custom_query(self, query='', data=None):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            if data is None:
                cursor.execute(query)
            else:
                cursor.execute(query, data)
            return cursor.fetchall()

    def query_by_ids(self, chat_id, user_id):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            data = (chat_id, user_id)
            query = 'SELECT * FROM data WHERE (chat_id, user_id) = (?,?)'
            cursor.execute(query, data)
            result = []
            for i in cursor.fetchall():
                result.append(dict(
                    chat_id=i[0], user_id=i[1], course=i[2], year=i[3], detail=i[4], curricula=i[5]))
            return result

    def delete_all(self, table):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('DELETE FROM {table} WHERE 1 = 1'.format(table = table))

    def backup(self, table):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM {table}'.format(table = table))
            data = cursor.fetchall()
            with open('./database/backup.json', 'w+') as f:
                json.dump(data, f)

    def restore_backup(self):
        with open(Path('./database/backup.json')) as f:
            data = json.load(f)
        for i in data:
            self.insert('data', chat_id=i[0], user_id=i[1],
                        course=i[2], year=i[3], detail=i[4], curricula=i[5])


if __name__ == '__main__':
    db = Database(Path('./database/telegram.db'))
    db.insert('data', chat_id = 1234, user_id = 1234, course = 9234, year = 2, curricula = '000-000', detail = 2)
    print(db.query_all('data'))
