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

from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from simple_sql.model.column import Column
    from simple_sql.model.table import Table


class ForeignKey():

    __from_column: Column  # contains the column object to which the column refers to

    __to_table: Table  # contains the table object to which the column refers to

    __to_column: Column  # contains the column object to which the column refers to

    __from_column_str: str
    __to_column_str: str
    __to_table_str: str

    __on_delete_cascade: bool # True if this foreign key should delete on cascade, False default

    def __init__(self, from_column: str, to_column: str, on_delete_cascade: bool = False):

        if len(to_column.split('.')) != 2:
            raise SyntaxError('The referenced column must be identified as table.column')

        self.__from_column = None
        self.__to_column = None
        self.__to_table = None

        self.__from_column_str = from_column

        self.__to_table_str = to_column.split('.')[0]

        self.__to_column_str = to_column.split('.')[1]

        self.__on_delete_cascade = on_delete_cascade

    def get_from_column(self) -> str:
        return self.__from_column

    def get_column(self) -> str:
        return self.__to_column

    def get_table(self) -> str:
        return self.__to_table
    
    def get_strings(self) -> List:
        return [self.__from_column_str, self.__to_table_str, self.__to_column_str]

    def set_objects(self, from_column: Column = None, to_table: Table = None, to_column: Column = None):
        if not self.__from_column:
            self.__from_column = from_column
        if not self.__to_table:
            self.__to_table = to_table
        if not self.__to_column:
            self.__to_column = to_column

    def __repr__(self) -> str:
        string = 'ForeignKey '
        string += 'ON DELETE CASCADE, ' if self.__on_delete_cascade else ''
        string += '<from {from_col} to {to_col}>'.format(
            from_col=self.__from_column_str, to_col=self.__to_table_str + '.' + self.__to_column_str)
        return '<' + string + '>'

    def __str__(self) -> str:
        string = 'FOREIGN KEY ({from_col}) REFERENCES {table}({column})'.format(
            from_col=self.__from_column_str, table=self.__to_table_str, column=self.__to_column_str)
        return string + (' ON DELETE CASCADE' if self.__on_delete_cascade else '')
