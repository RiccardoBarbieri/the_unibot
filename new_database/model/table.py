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


from new_database.exceptions import ZeroColumns, PrimaryKeyError, ForeignKeyError, NoSuchColumn
from typing import List, Dict, TYPE_CHECKING
if TYPE_CHECKING:
    from new_database.model.column import Column
    from new_database.model.foreign_key import ForeignKey
    from new_database.model.type import Type
    from new_database.model.types_enum import TypesEnum


class Table():

    __columns: List[Column] = []  # contains a list of the columns of the table

    __name: str  # contains the name of the table

    # contains a list of ForeignKey describing what columns references which column
    __references: List[ForeignKey] = []

    # True if the create table query should cotain IF NOT EXISTS clause, default True
    __if_not_exists: bool

    # list of columns that are primary key
    __primary_key: List[Column] = []

    def __init__(self, name: str, columns: List[Column], references: List[ForeignKey] = None, if_not_exists: bool = True):
        self.__name = name

        self.__columns = columns

        self.__references = references

        if len(columns) == 0:
            raise ZeroColumns('Number of columns must be more than zero')

        check_primary = False # checking if there is at least one primary key
        for i in self.__columns:
            if i.is_primary_key():
                self.__primary_key.append(i)
                check_primary = True
        if not check_primary:
            raise PrimaryKeyError('There should be at least one primary key in table {table}'.format(table = self.__name))

        if self.__references: # checking correct assignment of foreign keys
            for i in self.__references:
                if (i.get_from_column() not in self.__columns):
                    raise ForeignKeyError('Foreign key {fkey} does not refer to an existent column'.format(fkey = repr(i)))

        col_dict: Dict[str, Column] = {i.get_name(): i for i in columns}

        self.__dict__.update(col_dict)

        self.__if_not_exists = if_not_exists

    def get_columns(self) -> List[Column]:
        return self.__columns

    def get_name(self) -> str:
        return self.__name

    def get_references(self) -> List[ForeignKey]:
        return self.__references

    def get_column(self, column_name: str) -> Column:
        for i in self.__columns:
            if i.get_name() == column_name:
                return i
        raise NoSuchColumn('Column {col} does not exists'.format(col = column_name))


    def contains(self, column: Column) -> bool:
        return column in self.__columns
        

    def __repr__(self) -> str:
        string = 'Table.{name} '.format(name=self.__name)
        string += str([repr(i) for i in self.__columns]).replace('\'', '') + ', '
        if self.__references:
            string += str([repr(i) for i in self.__references]).replace('\'', '') + ', '
        string += 'IF NOT EXISTS' if self.__if_not_exists else ''
        return '<' + string + '>'

    def __str__(self) -> str:
        string = 'CREATE TABLE {name} '.format(name = self.__name)
        string += 'IF NOT EXISTS ' if self.__if_not_exists else ''
        string += '('
        for i in self.__columns:
            string += str(i) + ', '
        if self.__references:
            for i in self.__references:
                string += str(i) + ', '
        string = string[:-2] + ')'
        return string


        