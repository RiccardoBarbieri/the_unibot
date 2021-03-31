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

from typing import List

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from new_database.model.type import Type
    from new_database.model.types_enum import TypesEnum


class Column():

    __name: str  # contains the actual name of the column

    __type: Type  # contains a Type object

    __primary_key: bool  # True if this column is primary key, default False

    __unique: bool  # True if this column has unique restriction, default False

    __nullable: bool  # False if this columns has not null restriction, default True

    def __init__(self, name: str, type: Type, primary_key: bool=False, unique: bool=False, nullable: bool=True):
        self.__name = name
        self.__type = type
        self.__primary_key = primary_key
        self.__unique = unique
        self.__nullable = nullable
        if self.__primary_key:
            self.__unique = False
            self.__nullable = True

    def __str__(self) -> str:
        string = self.__name
        string += ' ' + str(self.__type)
        string += ' UNIQUE' if self.__unique else ''
        string += '' if self.__nullable else ' NOT NULL'
        return string

    def __repr__(self) -> str:
        string = 'Column.{name}, '.format(name=self.__name)
        string += repr(self.__type) + ', '
        string += ' PRIMARY KEY, ' if self.__primary_key else ''
        string += ' UNIQUE, ' if self.__unique else ''
        string += '' if self.__nullable else ' NOT NULL, '
        return '<' + string[:-2] + '>'

    def __eq__(self, o: object) -> bool:
        return (self.__name == o.__name) and (self.__type == o.__type) and (self.__primary_key == o.__primary_key) and (self.__unique == o.__unique) and (self.__nullable == o.__nullable)

    def get_name(self) -> str:
        return self.__name

    def get_type(self) -> Type:
        return self.__type
    
    def is_primary_key(self) -> bool:
        return self.__primary_key
    
    def __hash__(self) -> int:
        return hash((self.__name, self.__type, self.__primary_key, self.__unique, self.__nullable))