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

from typing import TYPE_CHECKING, List, Any

from new_database.exceptions import SyntaxError

if TYPE_CHECKING:
    from new_database.model.table import Table
    from new_database.model.column import Column

class InsertInto():

    __table: Table # table in which to insert new values

    __columns: List[Column] # contains the columns that are specified next to the table, optional

    __values: List[List[Any]] # contains the values 

    def __init__(self, table: Table = None, columns: List[Column] = None, values: List[List[Any]] = None):
        
        self.__table = table

        self.__columns = columns

        self.__values = values

        if columns: # checking that all values entries respect the number of culumns specified
            main = len(self.__columns)
            for i, j in zip(self.__values, range(len(self.__values))):
                if main != len(i):
                    raise SyntaxError('Number of values provided at row {num} does not match the number of columns specified'.format(num = j))
        else: # checking that all the values entries have the same length
            main = len(self.__table.get_columns())
            for i, j in zip(self.__values, range(len(self.__values))):
                if main != len(i):
                    raise SyntaxError('Number of values provided at row {num} does not match with the number of columns of the table'.format(num = j))

    def __str__(self) -> str:
        string = 'INSERT INTO {table} '.format(table = self.__table.get_name())
        if self.__columns:
            string += '('
            for i in self.__columns:
                string += '{col}, '.format(col = i.get_name())
            string = string[:-2] + ') '
        string += 'VALUES '
        for i in self.__values:
            string += '('
            for j in i:
                if type(j) is str:
                    string += '"{val}", '.format(val = j)
                else:
                    string += '{val}, '.format(val = j)
            string = string[:-2] + '), '
        string = string[:-2]
        return string