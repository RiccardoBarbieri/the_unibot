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

from typing import TYPE_CHECKING, Any, Dict, AnyStr

from simple_sql.exceptions import ZeroTables, ZeroColumns

if TYPE_CHECKING:
    from simple_sql.model.column import Column
    from simple_sql.model.table import Table


class Update():

    __table: Table # contains the table on which to perform the update

    __set_clause: Dict[Table, Dict[Column, Any]] # contains a dictionary of column:value to set

    __where_clause: Dict[Table, Dict[Column, Any]] # contains a dictionary for the where clause

    def __init__(self, table: Table = None, set_clause: Dict[Column, Any] = None, where_clause: Dict[Column, Any] = None):
        self.__table = table
        self.__set_clause = set_clause
        self.__where_clause = where_clause
        
        # for table in self.__set_clause.keys(): # check if columns from set clause actually belong to the associated table
        #     for col in self.__set_clause[table].keys():
        #         if not table.contains(col):
        #             raise NoSuchColumn('Column {col} (for set clause) does not belong to table {table}'.format(col = col.get_name(), table = table.get_name()))
        
        # for table in self.__where_clause.keys(): # check if columns from where clause actually belong to the associated table
        #     for col in self.__where_clause[table].keys():
        #         if not table.contains(col):
        #             raise NoSuchColumn('Column {col} (for where clause) does not belong to table {table}'.format(col = col.get_name(), table = table.get_name()))

    def __str__(self) -> AnyStr:
        if not self.__table:
            raise ZeroTables('This query is not complete, specify UPDATE clause arguments')
        if not self.__set_clause.keys():
            raise ZeroColumns('This query is not complete, specify SET clause arguments')
        string = 'UPDATE {table} SET '.format(table = self.__table.get_name())
        for col in self.__set_clause.keys():
            if type(self.__set_clause[col]) is str:
                string += '{col} = "{value}", '.format(col = col.get_name(), value = self.__set_clause[col])
            else:
                string += '{col} = {value}, '.format(col = col.get_name(), value = self.__set_clause[col])
        string = string[:-2] + ' '
        if self.__where_clause.keys():
            string += 'WHERE '
            for col in self.__where_clause.keys():
                if type(self.__where_clause[col]) is str:
                    string += '{col} = "{value}", '.format(col = col.get_name(), value = self.__where_clause[col])
                else:
                    string += '{col} = {value}, '.format(col = col.get_name(), value = self.__where_clause[col])
            string = string[:-2]
        return string


