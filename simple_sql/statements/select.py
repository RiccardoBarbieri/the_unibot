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

from typing import AnyStr, TYPE_CHECKING, List, Any, Dict

from simple_sql.exceptions import NoSuchColumn, ZeroColumns, ZeroTables

if TYPE_CHECKING:
    from simple_sql.model.column import Column
    from simple_sql.model.table import Table


class Select():

    __from_tables: List[Table] # contains tables for from clause

    __select_clause: Dict[Table, List[Column]] # contains columns for select clause

    __where_clause: Dict[Table, Dict[Column, Any]] # contains a dictionary for the where clause

    def __init__(self, select_clause: Dict[Table, List[Column]] = None, from_tables: List[Table] = None, where_clause: Dict[Table, Dict[Column, Any]] = None):
        self.__select_clause = select_clause
        self.__from_tables = from_tables
        self.__where_clause = where_clause
 
        for table in self.__select_clause.keys(): # check if columns from select clause actually belong to the associated table
            for col in self.__select_clause[table]:
                if not table.contains(col):
                    raise NoSuchColumn('Column {col} (for select clause) does not belong to table {table}'.format(col = col.get_name(), table = table.get_name()))
        
        for table in self.__where_clause.keys(): # check if columns from where clause actually belong to the associated table
            for col in self.__where_clause[table].keys():
                if not table.contains(col):
                    raise NoSuchColumn('Column {col} (for where clause) does not belong to table {table}'.format(col = col.get_name(), table = table.get_name()))


    def __str__(self) -> AnyStr:
        # if not self.__select_clause.keys():
        #     raise ZeroColumns('This query is not complete, specify SELECT clause arguments')
        if not self.__from_tables:
            raise ZeroTables('This query is not complete, specify FROM clause arguments')
        string = 'SELECT '
        if not self.__select_clause:
            string += '* '
        else:
            for table in self.__select_clause.keys():
                for col in self.__select_clause[table]:
                    string += '{table}.{column}, '.format(table = table.get_name(), column = col.get_name())
            string = string[:-2] + ' '
        if self.__from_tables:
            string += 'FROM '
            for table in self.__from_tables:
                string += table.get_name() + ', '
        string = string[:-2] + ' '
        if self.__where_clause:
            string += 'WHERE '
            for table in self.__where_clause.keys():
                for col in self.__where_clause[table].keys():
                    if type(self.__where_clause[table][col]) is str:
                        string += '{table}.{column} = "{value}", '.format(table = table.get_name(), column = col.get_name(), value = self.__where_clause[table][col])
                    else:
                        string += '{table}.{column} = {value}, '.format(table = table.get_name(), column = col.get_name(), value = self.__where_clause[table][col])
            string = string[:-2]
        return string


# SELECT -> FROM -> WHERE
# UPDATE -> SET -> WHERE
# DELETE FROM -> WHERE
# INSERT INTO -> VALUES