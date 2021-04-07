from __future__ import annotations
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

from mysql import connector
from mysql.connector.connection import CursorBase, MySQLConnection
from mysql.connector.errors import IntegrityError, ProgrammingError

from new_database.metadata import MetaData

from new_database.exceptions import DatabaseNotSelected, NoSuchDatabase

from new_database.model.table import Table
from new_database.model.column import Column
from new_database.model.types_enum import TypesEnum
from new_database.model.type import Type

from new_database.wrappers.select_wrapper import SelectWrapper
from new_database.wrappers.delete_wrapper import DeleteWrapper
from new_database.wrappers.update_wrapper import UpdateWrapper
from new_database.wrappers.drop_table_wrapper import DropTableWrapper
from new_database.wrappers.insert_into_wrapper import InsertIntoWrapper

from typing import Dict, AnyStr, List

from pathlib import Path



class Database():

    __credentials: Dict[str, str] = {} # dictionary ('host', 'user', 'password')

    __metadata: MetaData # contains metadata for current session of database

    __connection: MySQLConnection

    __cursor: CursorBase

    def __init__(self, host: str, user: str, password: str, metadata: MetaData):

        self.__credentials['host'] = host
        self.__credentials['user'] = user
        self.__credentials['password'] = password

        self.__connection = connector.connect(**self.__credentials)

        self.__metadata = metadata

        self.__cursor = self.__connection.cursor()

    def select_database(self, database: str):
        try:
            self.__cursor.execute('USE {database};'.format(database = database))
            self.__metadata.update_current_database(database)
            self.__connection.commit()
        except ProgrammingError as e:
            if e.errno == 1049:
                raise NoSuchDatabase('Database {db} not selected, try Database.get_databases() to print all available databases'.format(db = database))
        
    def get_databases(self) -> List[str]:
        self.__cursor.execute('SHOW DATABASES;')
        fetch = self.__cursor.fetchall()
        databases = []
        for i in fetch:
            databases.append(i[0])
        return databases

    def create_table(self, table: Table):
        self.__metadata.add_table(table)

        self.__cursor.execute(str(table))

        self.__connection.commit()

    def select(self, select_clause: List[str]) -> SelectWrapper:
        return SelectWrapper(self.__metadata, select_clause_str=select_clause)

    def update(self, table: str) -> UpdateWrapper:
        return UpdateWrapper(self.__metadata, table_str=table)

    def insert_into(self, table: AnyStr, columns: List[AnyStr] = None) -> InsertIntoWrapper:
        return InsertIntoWrapper(table_str=table, columns_str=columns)
    
    def drop_table(self, table: str) -> DropTableWrapper:
        self.__metadata.remove_table(table)
        return DropTableWrapper(self.__metadata, table)

    def delete(self, table: str) -> DeleteWrapper:
        return DeleteWrapper(self.__metadata, table)

    def execute(self, query: SelectWrapper | AnyStr) -> List[Dict]:
        if 'SELECT' in str(query): # using dict for select query, find other cases
            self.__cursor.execute(str(query))
            result = self.__create_dictionary(self.__cursor.fetchall(), query.get_elements())
        elif 'ALTER' in str(query):
            print('Feature not yet implemented')
        else:
            self.__cursor.execute(str(query))
            result = self.__cursor.fetchall()
        self.__connection.commit()
        return result

    def __create_dictionary(self, fetchall: List[tuple], elements: Dict[str, List[str]]) -> List:
        result = []
        cols = []
        for item in elements.items():
            for col in item[1]:
                cols.append(str(item[0]) + '.' + str(col))
        for i in fetchall:
            temp = {}
            for col, val in zip(cols, i):
                temp[col] = val
            result.append(temp)
        return result
        


metadata = MetaData('./new_database/metadata_telegram.dump')

with open(Path('./new_database/creds.txt')) as f:
    temp = f.readlines()

db = Database(temp[0], 'root', temp[1], metadata)

db.select_database('telegram')

test = Table(metadata, 'test', Column('id', Type(TypesEnum.INT), primary_key=True), Column('value', Type(TypesEnum.VARCHAR, 255), default='ASD'))
print(test)
db.create_table(test)

query = db.select(['test.id', 'test.value'])
print(query)

print(db.execute(query))

