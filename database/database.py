import sqlite3
import json
from pathlib import Path
from pprint import pprint
import pickle


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
                            last_command BLOB,
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
            cursor.execute('''CREATE TABLE IF NOT EXISTS test (
                            blobber BLOB,
                            PRIMARY KEY (blobber)
                            ) WITHOUT ROWID;''')

    def insert(self, table: str, **kwargs):

        data = tuple([kwargs[i] for i in kwargs])
        cols = tuple([i for i in kwargs])

        str_cols = (str(cols).replace(',', '') if len(cols) == 1 else str(cols))
        str_data = ('?, ' * len(cols))[:-2]

        query = 'INSERT INTO {table} '.format(table = table) + str_cols + ' VALUES (' + str_data + ')'

        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            try:
                cursor.execute(query, data)
            except sqlite3.IntegrityError as e:
                print('{msg}, not inserting {data}'.format(
                    msg=str(e), data=str(data)))

    # pass keys for where clause possibly first and as follows: key_[key1] = val1, key_[key2] = val2 ...
    def update(self, table: str, **kwargs):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            where_data = tuple([kwargs[i]
                                for i in kwargs if ('key_' in i)])
            where_cols = tuple([i.replace('key_', '')
                                for i in kwargs if ('key_' in i)])

            data = tuple([kwargs[i]
                          for i in kwargs if not ('key_' in i)])
            cols = tuple([i for i in kwargs if not ('key_' in i)])
            
            str_cols = (str(cols).replace(',', '') if len(cols) == 1 else str(cols)).replace('\'', '')
            str_data = '(' + ('?, ' * len(data))[:-2].replace('\'', '') + ')'

            str_where_cols = (str(where_cols).replace(',', '') if len(where_cols) == 1 else str(where_cols)).replace('\'', '')
            str_where_data = '(' + ('?, ' * len(where_data))[:-2].replace('\'', '') + ')'

            query = 'UPDATE {table} '.format(table = table) + 'SET ' + str_cols + ' = ' + str_data + ' WHERE ' + str_where_cols + ' = ' + str_where_data
            try:
                cursor.execute(query, data + where_data)
            except sqlite3.IntegrityError as e:
                print('{msg}, not inserting {data}'.format(
                    msg=str(e), data=str(data)))

    # pass keys for where clause possibly first and as follows: key_[key1] = val1, key_[key2] = val2 ...
    def query(self, table: str, **kwargs) -> dict:
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            where_data = tuple([kwargs[i]
                                for i in kwargs if ('key_' in i)])
            where_cols = tuple([i.replace('key_', '')
                                for i in kwargs if ('key_' in i)])

            str_where_cols = (str(where_cols).replace(',', '') if len(where_cols) == 1 else str(where_cols)).replace('\'', '')
            str_where_data = ('?, ' * len(where_data))[:-2].replace('\'', '')

            query = 'SELECT * FROM {table}'.format(table = table) + ' WHERE ' + str_where_cols + ' = (' + str_where_data + ')'
            
            cursor.execute(query, where_data)

            return self.__dict_creation(table, cursor.fetchall())

    def __dict_creation(self, table: str, fetchall: list) -> dict:
        result = []
        if table == 'data':    
            for i in fetchall:
                result.append(dict(
                    chat_id=i[0], user_id=i[1], course=i[2], year=i[3], detail=i[4], curricula=i[5]))
        elif table == 'courses':
            for i in fetchall:
                result.append(dict(course_name = i[0], course_code = i[1], campus = i[2], international = i[3], access = i[4], site = i[5], course_codec = i[6]))
        elif table == 'curriculas':
            for i in fetchall:
                result.append(dict(course_code = i[0], label = i[1], code = i[2]))
        elif table == 'test':
            print(fetchall)
            for i in fetchall:
                result.append(dict(blobber = i[0]))
        return result


    def query_all(self, table: str) -> dict:
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM {table}'.format(table = table))
            
            return self.__dict_creation(table, cursor.fetchall())


    def custom_query(self, query: str='', data: tuple=None) -> list:
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            
            if data is None:
                cursor.execute(query)
            else:
                cursor.execute(query, data)
            return cursor.fetchall()

    def query_by_ids(self, chat_id: int, user_id: int) -> list:
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

    def delete_all(self, table: str):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute(
                'DELETE FROM {table} WHERE 1 = 1'.format(table=table))

    def backup(self, table: str):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('SELECT * FROM {table}'.format(table=table))
            data = cursor.fetchall()
            with open('./database/backup_{table}.json'.format(table=table), 'w+') as f:
                json.dump(data, f)

    def restore_backup(self, table: str):
        with open(Path('./database/backup_{table}.json'.format(table=table))) as f:
            data = json.load(f)
        if table == 'data':
            for i in data:
                self.insert(table, chat_id=i[0], user_id=i[1],
                            course=i[2], year=i[3], detail=i[4], curricula=i[5])
        elif table == 'courses':
            for i in data:
                self.insert(table, course_name=str(i[0]), course_code=int(i[1]), campus=str(
                    i[2]), international=int(i[3]), access=str(i[4]), site=str(i[5]), course_codec=str(i[6]))
        elif table == 'curriculas':
            for i in data:
                self.insert(table, course_code=int(i[0]), label=str(i[1]),
                            code=str(i[2]))


if __name__ == '__main__':
    db = Database(Path('./database/telegram.db'))
    

    




# blob = pickle.dumps(db)
# db.insert('test', blobber = blob)
# db1 = pickle.loads(db.query_all('test')[2]['blobber'])
# print(type(db1.path))