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

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from new_database.model.column import Column
    from new_database.model.table import Table


class ForeignKey():

    __from_column: Column  # contains the column object to which the column refers to

    __to_table: Table  # contains the table object to which the column refers to

    __to_column: Column  # contains the column object to which the column refers to

    # True if this foreign key should delete on cascade, False default
    __on_delete_cascade: bool

    def __init__(self, from_column: Column, to_table: Table, to_column: Column, on_delete_cascade: bool = False):

        self.__from_column = from_column

        self.__to_table = to_table

        self.__to_column = to_column

        self.__on_delete_cascade = on_delete_cascade

    def get_from_column(self) -> Column:
        return self.__from_column

    def get_column(self) -> Column:
        return self.__to_column

    def get_table(self) -> Table:
        return self.__to_table

    def __repr__(self) -> str:
        string = 'ForeignKey '
        string += 'ON DELETE CASCADE, ' if self.__on_delete_cascade else ''
        string += '<from {from_col} {table}.{column}>'.format(from_col=self.__from_column.get_name(
        ), table=self.__to_table.get_name(), column=self.__to_column.get_name())
        return '<' + string + '>'

    def __str__(self) -> str:
        string = 'FOREIGN KEY ({from_col}) REFERENCES {table}({column})'.format(from_col=self.__from_column.get_name(), table=self.__to_table.get_name(), column=self.__to_column.get_name())
        return string + (' ON DELETE CASCADE' if self.__on_delete_cascade else '')