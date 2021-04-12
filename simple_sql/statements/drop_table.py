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
    """
    This class represents a DROP TABLE statement (MySQL compliant).
    Its string form is the syntax needed to execute a DROP TABLE statement
    according to the table. All the parameters are optional to enable 
    the user to specify one clause a time.

    Parameters
    ----------
    table: Table, optional
        The table to drop.
    
    Attributes
    ----------
    __table: Table
        The table to drop.
    """

    __table: Table

    def __init__(self, table: Table = None) -> None:
        self.__table = table

    def __str__(self) -> str:
        """
        Creates the MySQL compliant string to execute the drop table statement.

        Returns
        -------
        str
            MySQL compliant string of the drop table statement execution.
        """
        return 'DROP TABLE {table}'.format(table = self.__table.get_name())