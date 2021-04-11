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

from typing import TYPE_CHECKING, Any, Dict

from simple_sql.exceptions import NoSuchColumn, ZeroColumns

if TYPE_CHECKING:
    from simple_sql.model.column import Column
    from simple_sql.model.table import Table

class Delete():
    """
    This class represents a DELETE statement (MySQL compliant).
    Its string form is the syntax needed to execute a DELETE statement
    according to the table and where_clause specified. All the parameters
    are optional to enable the user to specify one clause a time.
    In the future all where clauses will be modeled with a class.

    Parameters
    ----------
    table: Table, optional
        The table to delete from.
    where_clause: Dict[Column, Any], optional
        The where clause.
    
    Attributes
    ----------
    __table: Table
        The table to delete from.
    __where_clause: Dict[Column, Any]
        The where clause.
    """

    __table: Table # table to delete from

    __where_clause: Dict[Column, Any] # dict of column and respective value for where clause

    def __init__(self, table: Table = None, where_clause: Dict[Column, Any] = None):
        self.__table = table
        self.__where_clause = where_clause

    def __str__(self) -> str:
        """
        Creates the MySQL compliant string to execute the delete statement.

        Returns
        -------
        str
            MySQL compliant string declaration of the delete statement.
        """
        string = 'DELETE FROM {table}'.format(table = self.__table.get_name())
        if self.__where_clause:
            string += ' WHERE '
            for col in self.__where_clause.keys():
                if type(self.__where_clause[col]) is str:
                    string += '{col} = "{val}", '.format(col = col.get_name(), val = self.__where_clause[col])
                else:
                    string += '{col} = {val}, '.format(col = col.get_name(), val = self.__where_clause[col])
        string = string[:-2]
        return string