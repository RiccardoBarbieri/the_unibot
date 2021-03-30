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

from typing import TYPE_CHECKING, List, Any, Dict

from new_database.exceptions import NoSuchColumn, ZeroTables, ZeroColumns

if TYPE_CHECKING:
    from new_database.model.table import Table


class DropTable():

    __table: Table

    def __init__(self, table: Table) -> None:
        self.__table = table

    def __str__(self) -> str:
        return 'DROP TABLE {table}'.format(table = self.__table)