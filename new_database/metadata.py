from __future__ import annotations
import pickle
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

PATH_TO_BACKUP = './new_database/metadata_backup.dump'

from typing import TYPE_CHECKING, Dict

from new_database.exceptions import DuplicateTable, NoSuchTable

from pathlib import Path
from os.path import isfile

if TYPE_CHECKING:
    from new_database.model.table import Table

class MetaData():

    __tables: Dict[str, Table]

    __current_database: str

    def __init__(self):
        if isfile(Path(PATH_TO_BACKUP)):
            self.__tables = self.__restore_backup()
        else:
            self.__tables = {}

    def get_table(self, name: str) -> Table:
        try:
            temp = self.__tables[name]
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = name))
        return temp
    
    def add_table(self, table: Table):
        if table.get_name() not in self.__tables.keys():
            self.__tables[table.get_name()] = table
        else:
            raise DuplicateTable('Table {table} already exists, use metadata.update_table if the table has changed')
        self.__backup()

    def update_table(self, table: Table):
        if table.get_name() in self.__tables.keys():
            self.__tables[table.get_name()] = table
        else:
            raise NoSuchTable('Table {table} does not exists'.format(table = table.get_name()))
        self.__backup()

    def update_current_database(self, database):
        self.__current_database = database
        self.__backup()

    def get_current_database(self) -> str:
        return self.__current_database

    def __backup(self):
        with open(Path(PATH_TO_BACKUP), 'wb+') as f:
            pickle.dump(self.__tables, f)

    def __restore_backup(self):
        with open(Path(PATH_TO_BACKUP), 'rb') as f:
            return pickle.load(f)