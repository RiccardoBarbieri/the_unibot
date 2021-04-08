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

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from simple_sql.model.table import Table


class DropTable():

    __table: Table

    def __init__(self, table: Table = None) -> None:
        self.__table = table

    def __str__(self) -> str:
        return 'DROP TABLE {table}'.format(table = self.__table.get_name())