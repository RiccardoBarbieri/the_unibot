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

from typing import Any, Dict, TYPE_CHECKING, AnyStr

if TYPE_CHECKING:
    from new_database.model.table import Table
    from new_database.metadata import MetaData
    from new_database.model.column import Column
    from new_database.statements.delete import Delete

class DeleteWrapper():

    __metadata: Dict[AnyStr, MetaData]

    __table: Table
    __where_clause: Dict[Column, Any]

    __table_str: AnyStr
    __where_clause_str: Dict[AnyStr, Any]

    def __init__(self, metadata: Dict[AnyStr, MetaData], table_str: AnyStr, where_clause_str: Dict[AnyStr, Any]):
        
        self.__metadata = metadata

        self.__table_str = table_str
        self.__where_clause_str = where_clause_str

        # parse bla bla bla

    def __str__(self) -> str:
        return str(Delete(self.__table, self.__where_clause))

    def delete_from(self, table_str: AnyStr) -> DeleteWrapper:
        return DeleteWrapper(self.__metadata, table_str, self.__where_clause_str)

    def where(self, where_clause_str: Dict[AnyStr, Any]) -> DeleteWrapper:
        return DeleteWrapper(self.__metadata, self.__table_str, where_clause_str)