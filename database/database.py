import sys  # nopep8

sys.path.append(".")  # nopep8
import sqlite3
import json
from pathlib import Path
from utils import Utils

"""
This class is used to manage the database.
It is possible to insert, update, query and delete data.
The database is composed of 4 tables:
    - data: contains the data of the users
    - courses: contains the data of the courses
    - curriculas: contains the data of the curriculas
    - last_command: contains the last command sent by the user

The data table has the following columns:
    - chat_id: the id of the chat
    - user_id: the id of the user
    - course: the course of the user
    - year: the year of the user
    - detail: the detail of the user
    - curricula: the curricula of the user
    - autosend_time: the time of the autosend
    - autosend: the autosend status
    - language: the language of the user
    - hide_show: the hide_show status
    - filter: the schedule filter of the user

The courses table has the following columns:
    - course_name: the name of the course
    - course_code: the code of the course
    - campus: the campus of the course
    - international: the international status of the course
    - access: the access of the course
    - site: the site of the course
    - course_codec: the codec of the course

The curriculas table has the following columns:
    - course_code: the code of the course
    - label: the label of the curricula
    - code: the code of the curricula
    
The last_command table has the following columns:
    - text: the text of the last command
    - chat_id: the id of the chat
    - user_id: the id of the user

Attributes
----------
path : str
    the path of the database
ip : str
    the ip of the database

Methods
-------
create_table()
    creates the tables if they don't exist
insert(table: str, **kwargs)
    inserts data into the table
update(table: str, **kwargs)
    updates data in the table
query(table: str, **kwargs) -> dict
    queries data from the table
query_all(table: str) -> dict
    queries all the data from the table
query_join(table1: str, table2: str, val_conds: dict, *args, **kwargs) -> dict
    queries data from the table using a join
custom_query(query: str = '', data: tuple = None) -> list
    queries data from the table using a custom query
query_by_ids(chat_id: int) -> list
    queries data from the table using the chat_id
delete_all(table: str)
    deletes all the data from the table
backup(table: str)
    creates a backup of the table
restore_backup(table: str)
    restores the backup of the table
"""


class Database:
    path = None

    ip = ""

    def __init__(self, file_path):
        self.path = file_path
        self.create_table()

    def create_table(self):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute(
                """CREATE TABLE IF NOT EXISTS data (
                            chat_id INTEGER,
                            user_id INTEGER,
                            course TEXT NOT NULL,
                            year INTEGER CHECK (year >= 1 AND year <= 5) DEFAULT 1,
                            detail INTEGER CHECK (detail >= 1 AND detail <= 3) DEFAULT 2,
                            curricula TEXT DEFAULT "default",
                            autosend_time TEXT DEFAULT "00:00",
                            autosend INTEGER CHECK (autosend IN (0,1)) DEFAULT 0,
                            language TEXT DEFAULT "en",
                            hide_show INTEGER CHECK (hide_show IN (0,1)) DEFAULT 0,
                            filter TEXT DEFAULT "default",
                            PRIMARY KEY (chat_id)
                            ) WITHOUT ROWID;"""
            )
            cursor.execute(
                """CREATE TABLE IF NOT EXISTS courses (
                            course_name TEXT NOT NULL,
                            course_code TEXT,
                            campus TEXT NOT NULL,
                            international INTEGER NOT NULL,
                            access TEXT NOT NULL,
                            site TEXT NOT NULL,
                            course_codec TEXT NOT NULL,
                            PRIMARY KEY (course_code)
                            ) WITHOUT ROWID;"""
            )
            cursor.execute(
                """CREATE TABLE IF NOT EXISTS curriculas (
                            course_code TEXT NOT NULL,
                            label TEXT,
                            code TEXT NOT NULL,
                            PRIMARY KEY (label),
                            FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
                            ) WITHOUT ROWID;"""
            )
            cursor.execute(
                """CREATE TABLE IF NOT EXISTS last_command (
                            text TEXT NOT NULL,
                            chat_id INTEGER NOT NULL,
                            user_id INTEGER NOT NULL,
                            PRIMARY KEY (chat_id),
                            FOREIGN KEY (chat_id) REFERENCES data(chat_id) ON DELETE CASCADE
                            ) WITHOUT ROWID;"""
            )

    def insert(self, table: str, **kwargs):
        data = tuple([kwargs[i] for i in kwargs])
        cols = tuple([i for i in kwargs])

        str_cols = str(cols).replace(",", "") if len(cols) == 1 else str(cols)
        str_data = ("?, " * len(cols))[:-2]

        query = (
            "INSERT INTO {table} ".format(table=table)
            + str_cols
            + " VALUES ("
            + str_data
            + ")"
        )

        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            try:
                cursor.execute(query, data)
            except sqlite3.IntegrityError as e:
                print("{msg}, not inserting {data}".format(msg=str(e), data=str(data)))

    # pass keys for where clause possibly first and as follows: key_[key1] = val1, key_[key2] = val2 ...
    def update(self, table: str, **kwargs):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            where_data = tuple([kwargs[i] for i in kwargs if ("key_" in i)])
            where_cols = tuple([i.replace("key_", "") for i in kwargs if ("key_" in i)])

            data = tuple([kwargs[i] for i in kwargs if not ("key_" in i)])
            cols = tuple([i for i in kwargs if not ("key_" in i)])

            str_cols = (
                str(cols).replace(",", "") if len(cols) == 1 else str(cols)
            ).replace("'", "")
            str_data = "(" + ("?, " * len(data))[:-2].replace("'", "") + ")"

            str_where_cols = (
                str(where_cols).replace(",", "")
                if len(where_cols) == 1
                else str(where_cols)
            ).replace("'", "")
            str_where_data = "(" + ("?, " * len(where_data))[:-2].replace("'", "") + ")"

            query = (
                "UPDATE {table} ".format(table=table)
                + "SET "
                + str_cols
                + " = "
                + str_data
                + " WHERE "
                + str_where_cols
                + " = "
                + str_where_data
            )
            try:
                cursor.execute(query, data + where_data)
            except sqlite3.IntegrityError as e:
                print("{msg}, not inserting {data}".format(msg=str(e), data=str(data)))

    # pass keys for where clause possibly first and as follows: key_[key1] = val1, key_[key2] = val2 ...
    def query(self, table: str, **kwargs) -> dict:
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            where_data = tuple([kwargs[i] for i in kwargs if ("key_" in i)])
            where_cols = tuple([i.replace("key_", "") for i in kwargs if ("key_" in i)])

            str_where_cols = (
                str(where_cols).replace(",", "")
                if len(where_cols) == 1
                else str(where_cols)
            ).replace("'", "")
            str_where_data = ("?, " * len(where_data))[:-2].replace("'", "")

            cursor.execute("PRAGMA table_info({table})".format(table=table))
            cols = tuple([i[1] for i in cursor.fetchall()])

            query = (
                "SELECT * FROM {table}".format(table=table)
                + " WHERE "
                + str_where_cols
                + " = ("
                + str_where_data
                + ")"
            )

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

            cursor.execute("SELECT * FROM {table}".format(table=table))
            # cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

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

            str_join1_cols = ""
            for i in join1_cols:
                str_join1_cols += table1[:index] + "." + str(i) + ", "
            str_join1_cols = "(" + (str_join1_cols[:-2]).replace("'", "") + ")"

            str_join2_cols = ""
            for i in join2_cols:
                str_join2_cols += table2[:index] + "." + str(i) + ", "
            str_join2_cols = "(" + (str_join2_cols[:-2]).replace("'", "") + ")"

            str_cols_selection = ""
            for i in cols_selection:
                if i.find("1") != -1:
                    current_prefix = table1[:index]
                elif i.find("2") != -1:
                    current_prefix = table2[:index]
                else:
                    raise sqlite3.OperationalError("Column specification wrong")
                str_cols_selection += current_prefix + "." + str(i)[:-1] + ", "
            str_cols_selection = str_cols_selection[:-2]

            query = (
                "SELECT "
                + str_cols_selection
                + " FROM {table1} {t1in}, {table2} {t2in}".format(
                    table1=table1,
                    t1in=table1[:index],
                    table2=table2,
                    t2in=table2[:index],
                )
                + " WHERE "
                + str_join1_cols
                + " = "
                + str_join2_cols
            )

            if len(val_conds.keys()) != 0:
                val_cols = val_conds.keys()
                val_vals = [val_conds[i] for i in val_conds.keys()]

                str_val_cols = ""
                for i in val_cols:
                    if i.find("1") != -1:
                        current_prefix = table1[:index]
                    elif i.find("2") != -1:
                        current_prefix = table2[:index]
                    else:
                        raise sqlite3.OperationalError("Column specification wrong")
                    str_val_cols += current_prefix + "." + str(i)[:-1] + ", "
                str_val_cols = str_val_cols[:-2]

                str_val_vals = ""
                for i in val_vals:
                    str_val_vals += str(i) + ", "
                str_val_vals = str_val_vals[:-2]

                query += (
                    " AND "
                    + "("
                    + str_val_cols
                    + ")"
                    + " = "
                    + "("
                    + str_val_vals
                    + ")"
                )

            cursor.execute(query)

            cols_parsed = tuple()
            for i in cols_selection:
                cols_parsed += tuple([i[:-1]])

            return self.__dict_creation(cols_parsed, cursor.fetchall())

    def custom_query(self, query: str = "", data: tuple = None) -> list:
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

            cursor.execute("PRAGMA table_info({table})".format(table="data"))
            cols = tuple([i[1] for i in cursor.fetchall()])

            query = "SELECT * FROM data WHERE chat_id = " + str(chat_id)
            cursor.execute(query)

            return self.__dict_creation(cols, cursor.fetchall())

    def delete_all(self, table: str):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()
            cursor.execute("DELETE FROM {table} WHERE 1 = 1".format(table=table))

    def backup(self, table: str):
        with sqlite3.connect(self.path) as connection:
            cursor = connection.cursor()

            cursor.execute("PRAGMA table_info({table})".format(table=table))
            cols = tuple([i[1] for i in cursor.fetchall()])

            cursor.execute("SELECT * FROM {table}".format(table=table))

            dump = self.__dict_creation(cols, cursor.fetchall())

            with open("./database/backup_{table}.json".format(table=table), "w+") as f:
                json.dump(dump, f)

    def restore_backup(self, table: str):
        with open(Path("./database/backup_{table}.json".format(table=table))) as f:
            data = json.load(f)

        for i in data:
            self.insert(table, **i)


if __name__ == "__main__":
    db = Database(Path("./database/telegram.db"))
