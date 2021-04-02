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

from typing import TYPE_CHECKING, Any, Dict

from new_database.exceptions import NoSuchColumn, ZeroColumns

if TYPE_CHECKING:
    from new_database.model.column import Column
    from new_database.model.table import Table

class Delete():

    __table: Table # table to delete from

    __where_clause: Dict[Column, Any] # dict of column and respective value for where clause

    def __init__(self, table: Table = None, where_clause: Dict[Column, Any] = None):
        self.__table = table
        self.__where_clause = where_clause

    def __str__(self) -> str:
        string = 'DELETE FROM {table}'.format(table = self.__table.get_name())
        if self.__where_clause:
            string += ' WHERE '
            for col in self.__where_clause.keys():
                if type(self.__where_clause[col]) is str:
                    string += '{col} = "{val}", '.format(col = col.get_name(), val = self.__where_clause[col])
                else:
                    string += '{col} = {val}, '.format(col = col.get_name(), val = self.__where_clause[col])
        string = string[:-2]
        return string