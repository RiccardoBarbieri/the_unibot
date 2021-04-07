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

from typing import TYPE_CHECKING, Dict

from new_database.exceptions import NoSuchTable

from pathlib import Path
from os.path import isfile
import pickle

if TYPE_CHECKING:
    from new_database.model.table import Table

class MetaData():

    __tables: Dict[str, Table]

    __current_database: str

    __backup_path: str

    def __init__(self, backup_path: str):
        self.__backup_path = backup_path
        if isfile(Path(self.__backup_path)):
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
            print('MetaData: Table {table} already exists, updating the existing table'.format(table = table.get_name()))
            self.update_table(table)
        self.__backup()
    
    def remove_table(self, table: str):
        try:
            self.__tables.pop(table)
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = table))
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
        with open(Path(self.__backup_path), 'wb+') as f:
            pickle.dump(self.__tables, f)

    def __restore_backup(self):
        with open(Path(self.__backup_path), 'rb') as f:
            return pickle.load(f)