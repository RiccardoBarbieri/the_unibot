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

from typing import Dict, TYPE_CHECKING, AnyStr

if TYPE_CHECKING:
    from new_database.model.table import Table
    from new_database.metadata import MetaData
    from new_database.exceptions import NoSuchTable
from new_database.statements.drop_table import DropTable


class DropTableWrapper():

    __metadata: Dict[AnyStr, MetaData]

    __table: Table

    __table_str: AnyStr

    def __init__(self, metadata: Dict[AnyStr, MetaData], table_str: AnyStr = None):
        
        self.__metadata = metadata

        self.__table_str = table_str

        try:
            self.__table = self.__metadata[self.__table_str]['table']
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = self.__table_str))

    def __str__(self) -> AnyStr:
        return str(DropTable(self.__table))

    def drop(self, table_str: AnyStr) -> DropTableWrapper:
        return DropTableWrapper(self.__metadata, table_str)