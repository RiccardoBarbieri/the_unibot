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

from new_database.wrappers.select_wrapper import SelectWrapper
from new_database.wrappers.delete_wrapper import DeleteWrapper
from new_database.wrappers.update_wrapper import UpdateWrapper
from new_database.wrappers.drop_table_wrapper import DropTableWrapper
from new_database.wrappers.insert_into_wrapper import InsertIntoWrapper

from typing import Dict, Any, List

from pathlib import Path



class Database():

    __credentials: Dict[str, str] = {} # dictionary ('host', 'user', 'password')

    __metadata: MetaData # contains metadata for current session of database

    __connection: MySQLConnection

    __cursor: CursorBase

    def __init__(self, host: str, user: str, password: str):

        self.__credentials['host'] = host
        self.__credentials['user'] = user
        self.__credentials['password'] = password

        self.__connection = connector.connect(**self.__credentials)

        self.__metadata = MetaData()

        self.__cursor = self.__connection.cursor()

    def select_database(self, database: str):
        try:
            self.cursor.execute('USE DATABASE {database};'.format(database = database))
            self.__metadata.update_current_database(database)
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
        self.__cursor.execute(str(table))

        self.__metadata.add_table(table)
        self.__connection.commit()

    def select(self, select_clause: List[str]) -> SelectWrapper:
        return SelectWrapper(self.__metadata, select_clause_str=select_clause)
    
    def execute(self, query: Any) -> List: # TODO: refactor creating a type query?
        self.__cursor.execute(query)
        if 'SELECT' in str(query): # using dict for select query, find other cases
            result = self.__create_dictionary(self.__cursor.fetchall(), query.get_columns())
        else:
            result = self.__cursor.fetchall()
        self.__connection.commit()
        return result

    
    def __create_dictionary(self, fetchall: List[tuple], cols: List[str]) -> List:
        result = []
        for i in fetchall:
            temp = {}
            for col_name, val in zip(cols, i):
                temp[col_name] = val
            result.append(temp)
        return result
        

with open(Path('./new_database/creds.txt')) as f:
    temp = f.readlines()


db = Database(temp[0], 'root', temp[1])
print(db.get_databases())

#1046 no database select
#1049 non existent database
