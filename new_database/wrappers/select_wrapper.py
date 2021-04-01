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
    from new_database.model.table import Table
    from new_database.model.column import Column
    from new_database.metadata import MetaData
    from new_database.statements.select import Select

class SelectWrapper():

    __metadata: Dict[AnyStr, MetaData]

    __select_clause: Dict[Table, List[Column]]
    __from_tables: List[Table]
    __where_clause: Dict[Table, Dict[Column, Any]]

    __select_clause_str: List[AnyStr]
    __where_clause_str: List[AnyStr]

    def __init__(self, metadata, select_clause_str: List[AnyStr] = None, where_clause_str: List[AnyStr] = None):
        self.__metadata = metadata

        self.__select_clause_str = select_clause_str
        self.__where_clause_str = where_clause_str

        # parse bla bla bla, tables are parse from select clause (list of str pf type table.column or only table if SELECT *)

    def __str__(self) -> str:
        return str(Select(self.__select_clause, self.__from_tables, self.__where_clause))

    def select(self, select_clause_str: List[AnyStr]):
        return SelectWrapper(select_clause_str, self.__where_clause_str)

    def where(self, where_clause_str):
        if not self.__select_clause_str:
            raise WrongClauseOrder('You have to specify the select clause before')
        return SelectWrapper(self.__select_clause_str, where_clause_str)