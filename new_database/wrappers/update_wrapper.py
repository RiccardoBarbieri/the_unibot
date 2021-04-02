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

from typing import TYPE_CHECKING, Any, Dict, List, AnyStr

from new_database.exceptions import WrongClauseOrder

if TYPE_CHECKING:
    from new_database.statements.update import Update
    from new_database.model.table import Table
    from new_database.model.column import Column
    from new_database.metadata import MetaData

class UpdateWrapper():

    __metadata: Dict[AnyStr, MetaData]

    __table: Table
    __set_clause: Dict[Column, Any]
    __where_clause: Dict[Column, Any]

    __table_str: AnyStr
    __set_clause_str: List[AnyStr]
    __where_clause_str: List[AnyStr]


    def __init__(self, metadata: Dict[AnyStr, MetaData], table_str: AnyStr = None, set_clause_str: List[AnyStr] = None, where_clause_str: List[AnyStr] = None):
        self.__metadata = metadata

        self.__table_str = table_str
        self.__set_clause_str = set_clause_str
        self.__where_clause_str = where_clause_str

        # parse strings using metadata to those structures
    
    def __str__(self) -> str:
        return str(Update(self.__table, self.__set_clause, self.__where_clause))

    def update(self, table_str: AnyStr) -> UpdateWrapper:
        return UpdateWrapper(self.__metadata, table_str, self.__set_clause_str, self.__where_clause_str)

    def set(self, set_clause_str: List[AnyStr]) -> UpdateWrapper:
        return UpdateWrapper(self.__metadata, self.__table_str, set_clause_str, self.__where_clause_str)

    def where(self, where_clause_str: List[AnyStr]) -> UpdateWrapper:
        if not self.__set_clause:
            raise WrongClauseOrder('You have to specify the set clause before')
        return UpdateWrapper(self.__metadata, self.__table_str, self.__set_clause_str, where_clause_str)
    