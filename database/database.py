import sys
import getpass
if getpass.getuser() == 'ricca':
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram')
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
elif getpass.getuser() == 'riccardoob':
    sys.path.append('/home/riccardoob/telegram_bot')
elif getpass.getuser() == 'pi':
    sys.path.append('/home/pi/telegram-bot')

import sqlite3
import json
from pathlib import Path
from pprint import pprint
from utils.utils import Utils
import requests


class Database():

    path = None

    ip = ''

    def __init__(self, file_path):
        self.path = file_path
        self.create_table()

    def create_table(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute('''CREATE TABLE IF NOT EXISTS data (
                            chat_id INTEGER,
                            user_id INTEGER,
                            course TEXT NOT NULL,
                            year INTEGER CHECK (year >= 1 AND year <= 5) DEFAULT 1,
                            detail INTEGER CHECK (detail >= 1 AND detail <= 3) DEFAULT 2,
                            curricula TEXT DEFAULT "default",
                            autosend_time TEXT DEFAULT "00:00",
                            autosend INTEGER CHECK (autosend IN (0,1)) DEFAULT 0,
                            PRIMARY KEY (chat_id)
                            ) WITHOUT ROWID;''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS courses (
                            course_name TEXT NOT NULL,
                            course_code TEXT,
                            campus TEXT NOT NULL,
                            international INTEGER NOT NULL,
                            access TEXT NOT NULL,
                            site TEXT NOT NULL,
                            course_codec TEXT NOT NULL,
                            PRIMARY KEY (course_code)
                            ) WITHOUT ROWID;''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS curriculas (
                            course_code TEXT NOT NULL,
                            label TEXT,
                            code TEXT NOT NULL,
                            PRIMARY KEY (label),
                            FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
                            ) WITHOUT ROWID;''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS last_command (
                            text TEXT NOT NULL,
                            chat_id INTEGER NOT NULL,
                            user_id INTEGER NOT NULL,
                            PRIMARY KEY (chat_id),
                            FOREIGN KEY (chat_id) REFERENCES data(chat_id) ON DELETE CASCADE
                            ) WITHOUT ROWID;''')

    def insert(self, table: str, **kwargs):

        data = tuple([kwargs[i] for i in kwargs])
        cols = tuple([i for i in kwargs])

        str_cols = (str(cols).replace(',', '')
                    if len(cols) == 1 else str(cols))
        str_data = ('?, ' * len(cols))[:-2]

        query = 'INSERT INTO {table} '.format(
            table=table) + str_cols + ' VALUES (' + str_data + ')'

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

            str_cols = (str(cols).replace(',', '') if len(cols)
                        == 1 else str(cols)).replace('\'', '')
            str_data = '(' + ('?, ' * len(data))[:-2].replace('\'', '') + ')'

            str_where_cols = (str(where_cols).replace(',', '') if len(
                where_cols) == 1 else str(where_cols)).replace('\'', '')
            str_where_data = '(' + ('?, ' * len(where_data)
                                    )[:-2].replace('\'', '') + ')'

            query = 'UPDATE {table} '.format(table=table) + 'SET ' + str_cols +\
            ' = ' + str_data + ' WHERE ' + str_where_cols + ' = ' + str_where_data
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

            str_where_cols = (str(where_cols).replace(',', '') if len(
                where_cols) == 1 else str(where_cols)).replace('\'', '')
            str_where_data = ('?, ' * len(where_data))[:-2].replace('\'', '')

            cursor.execute("PRAGMA table_info({table})".format(table=table))
            cols = tuple([i[1] for i in cursor.fetchall()])

            query = 'SELECT * FROM {table}'.format(
                table=table) + ' WHERE ' + str_where_cols + ' = (' + str_where_data + ')'

            cursor.execute(query, where_data)

            return self.__dict_creation(cols, cursor.fetchall())

    def __dict_creation(self, cols: tuple, fetchall: list) -> list:
        result = []

        for i in fetchall:
            temp = {}
            for col_name, val in zip(cols, i):
                temp[col_name] = val
            result.append(temp)
        return result

    def query_all(self, table: str) -> dict:
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()

            cursor.execute("PRAGMA table_info({table})".format(table=table))
            cols = tuple([i[1] for i in cursor.fetchall()])

            cursor.execute('SELECT * FROM {table}'.format(table=table))
            #cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

            return self.__dict_creation(cols, cursor.fetchall())

    # pass columns to display as follows: col1[1/2], col2[1/2] ...
    # pass keys for where clause as follows: col11 = col21, col12 = col22 ...
    # val conds per condizioni con valori
    def query_join(self, table1, table2, val_conds: dict, *args, **kwargs):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()

            index = Utils.first_difference(table1, table2) + 1

            join1_cols = tuple([i for i in kwargs])
            join2_cols = tuple([kwargs[i] for i in kwargs])

            cols_selection = tuple([i for i in args])

            str_join1_cols = ''
            for i in join1_cols:
                str_join1_cols += table1[:index] + '.' + str(i) + ', '
            str_join1_cols = '(' + \
                (str_join1_cols[:-2]).replace('\'', '') + ')'

            str_join2_cols = ''
            for i in join2_cols:
                str_join2_cols += table2[:index] + '.' + str(i) + ', '
            str_join2_cols = '(' + \
                (str_join2_cols[:-2]).replace('\'', '') + ')'

            str_cols_selection = ''
            for i in cols_selection:
                if i.find('1') != -1:
                    current_prefix = table1[:index]
                elif i.find('2') != -1:
                    current_prefix = table2[:index]
                else:
                    raise sqlite3.OperationalError(
                        'Column specification wrong')
                str_cols_selection += current_prefix + '.' + str(i)[:-1] + ', '
            str_cols_selection = str_cols_selection[:-2]

            query = 'SELECT ' + str_cols_selection + ' FROM {table1} {t1in}, {table2} {t2in}'.format(
                table1=table1, t1in=table1[:index], table2=table2, t2in=table2[:index]) + ' WHERE ' + str_join1_cols + ' = ' + str_join2_cols

            if len(val_conds.keys()) != 0:
                val_cols = val_conds.keys()
                val_vals = [val_conds[i] for i in val_conds.keys()]

                str_val_cols = ''
                for i in val_cols:
                    if i.find('1') != -1:
                        current_prefix = table1[:index]
                    elif i.find('2') != -1:
                        current_prefix = table2[:index]
                    else:
                        raise sqlite3.OperationalError(
                            'Column specification wrong')
                    str_val_cols += current_prefix + '.' + str(i)[:-1] + ', '
                str_val_cols = str_val_cols[:-2]

                str_val_vals = ''
                for i in val_vals:
                    str_val_vals += str(i) + ', '
                str_val_vals = str_val_vals[:-2]

                query += ' AND ' + '(' + str_val_cols + ')' + \
                    ' = ' + '(' + str_val_vals + ')'

            cursor.execute(query)

            cols_parsed = tuple()
            for i in cols_selection:
                cols_parsed += tuple([i[:-1]])

            return self.__dict_creation(cols_parsed, cursor.fetchall())

    def custom_query(self, query: str = '', data: tuple = None) -> list:
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()

            if data is None:
                cursor.execute(query)
            else:
                cursor.execute(query, data)
            return cursor.fetchall()

    def query_by_ids(self, chat_id: int) -> list:
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()

            cursor.execute("PRAGMA table_info({table})".format(table='data'))
            cols = tuple([i[1] for i in cursor.fetchall()])


            query = 'SELECT * FROM data WHERE chat_id = ' + str(chat_id)
            cursor.execute(query)

            return self.__dict_creation(cols, cursor.fetchall())

    def delete_all(self, table: str):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute(
                'DELETE FROM {table} WHERE 1 = 1'.format(table=table))

    def backup(self, table: str):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()

            cursor.execute("PRAGMA table_info({table})".format(table=table))
            cols = tuple([i[1] for i in cursor.fetchall()])

            cursor.execute('SELECT * FROM {table}'.format(table=table))

            dump = self.__dict_creation(cols, cursor.fetchall())

            with open('./database/backup_{table}.json'.format(table=table), 'w+') as f:
                json.dump(dump, f)

    def restore_backup(self, table: str):
        with open(Path('./database/backup_{table}.json'.format(table=table))) as f:
            data = json.load(f)

        for i in data:
            self.insert(table, **i)


if __name__ == '__main__':
    db = Database(Path('./database/telegram.db'))

    
