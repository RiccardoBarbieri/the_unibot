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

class SelectWrapper():

    __metadata: Dict[AnyStr, MetaData]

    __select_clause: Dict[Table, List[Column]]
    __from_tables: List[Table]
    __where_clause: Dict[Table, Dict[Column, Any]]

    __select_clause_str: List[AnyStr]
    __from_tables_str: List[AnyStr]
    __where_clause_str: List[AnyStr]

    def __init__(self, metadata, select_clause_str: List[AnyStr] = None, from_tables_str: List[AnyStr] = None, where_clause_str: List[AnyStr] = None):
        self.__metadata = metadata

        self.__from_tables_str = from_tables_str
        self.__select_clause_str = select_clause_str
        self.__where_clause_str = where_clause_str

        # parse bla bla bla

    def select(self, )