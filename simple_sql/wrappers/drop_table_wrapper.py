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
    from simple_sql.model.table import Table
    from simple_sql.metadata import MetaData
    from simple_sql.exceptions import NoSuchTable
from simple_sql.statements.drop_table import DropTable


class DropTableWrapper():
    """
    This class uses the table name a string with the metadata object 
    (handled by ``Database``) to obtain the correct ``Table`` object.

    Parameters
    ----------
    metadata: MetaData
        The ``MetaData`` instance of the database.
    table_str: AnyStr, optional
        The name of the table to update.

    Attributes
    ----------
    __metadata: MetaData
        The ``MetaData`` instance of the database.
    __table: Table
        The ``Table`` object to drop.
    __table_str: AnyStr
        The name of the table to update.
    """

    __metadata: MetaData

    __table: Table

    __table_str: AnyStr

    def __init__(self, metadata: MetaData, table_str: AnyStr = None):
        
        self.__metadata = metadata

        self.__table_str = table_str

    
        self.__table = self.__metadata.get_table(self.__table_str)

    def __str__(self) -> AnyStr:
        return str(DropTable(self.__table))

    # def drop(self, table_str: AnyStr) -> DropTableWrapper:
    #     return DropTableWrapper(self.__metadata, table_str)