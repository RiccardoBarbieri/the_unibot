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

from new_database.exceptions import NoSuchTable, WrongClauseOrder

if TYPE_CHECKING:
    from new_database.model.table import Table
    from new_database.model.column import Column
    from new_database.metadata import MetaData
from new_database.statements.update import Update

class UpdateWrapper():

    __metadata: Dict[AnyStr, MetaData]

    __table: Table
    __set_clause: Dict[Column, Any]
    __where_clause: Dict[Column, Any]

    __table_str: AnyStr
    __set_clause_str: Dict[AnyStr, Any]
    __where_clause_str: Dict[AnyStr, Any]


    def __init__(self, metadata: Dict[AnyStr, MetaData], table_str: AnyStr = None, set_clause_str: Dict[AnyStr, Any] = None, where_clause_str: Dict[AnyStr, Any] = None):
        self.__metadata = metadata

        self.__table_str = table_str
        self.__set_clause_str = set_clause_str
        self.__where_clause_str = where_clause_str

        self.__set_clause = {}
        self.__where_clause = {}

        try:
            self.__table = self.__metadata[self.__table_str]['table']
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = self.__table_str))

        for col in self.__where_clause_str.keys():
            col_obj = self.__table.get_column(col)
            self.__where_clause[col_obj] = self.__where_clause_str[col]

        for col in self.__set_clause_str.keys():
            col_obj = self.__table.get_column(col)
            self.__set_clause[col_obj] = self.__set_clause_str[col]
    
    def __str__(self) -> str:
        return str(Update(self.__table, self.__set_clause, self.__where_clause))

    def update(self, table_str: AnyStr) -> UpdateWrapper:
        return UpdateWrapper(self.__metadata, table_str, self.__set_clause_str, self.__where_clause_str)

    def set(self, set_clause_str: Dict[AnyStr, Any]) -> UpdateWrapper:
        return UpdateWrapper(self.__metadata, self.__table_str, set_clause_str, self.__where_clause_str)

    def where(self, where_clause_str: Dict[AnyStr, Any]) -> UpdateWrapper:
        if not self.__set_clause:
            raise WrongClauseOrder('You have to specify the set clause before')
        return UpdateWrapper(self.__metadata, self.__table_str, self.__set_clause_str, where_clause_str)
    