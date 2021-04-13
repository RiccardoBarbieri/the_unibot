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

from simple_sql.exceptions import NoSuchTable

if TYPE_CHECKING:
    from simple_sql.model.table import Table
    from simple_sql.metadata import MetaData
    from simple_sql.model.column import Column
from simple_sql.statements.delete import Delete

class DeleteWrapper():
    """
    This class uses the table name and the where clause as strings
    with the metadata object (handled by ``Database``) to obtain
    the correct ``Table`` object and to create the where clause.
    Using the delete and where methods, ``DeleteWrapper`` instances will be
    created and returned to add clauses separately.
    In the future all where clauses will be modeled with a class.

    Parameters
    ----------
    metadata: MetaData, optional
        The ``MetaData`` instance of the database.
    table_str: AnyStr, optional
        The name of the table to delete from.
    where_clause_str: Dict[AnyStr, Any], optional
        The where clause to restrict which entries to delete.

    Attributes
    ----------
    __metadata: MetaData
        The ``MetaData`` instance of the database.
    __table: Table
        The ``Table`` object.
    __where_clause: Dict[Column, Any]
        The where clause generated from the string where clause.
    __table_str: AnyStr
        The name of the table to delete from.
    __where_clause_str: Dict[AnyStr, Any]
        The where clause to restrict which entries to delete.
    """

    __metadata: MetaData

    __table: Table
    __where_clause: Dict[Column, Any]

    __table_str: AnyStr
    __where_clause_str: Dict[AnyStr, Any]

    def __init__(self, metadata: MetaData, table_str: AnyStr, where_clause_str: Dict[AnyStr, Any]):
        
        self.__metadata = metadata

        self.__table_str = table_str
        self.__where_clause_str = where_clause_str

        self.__where_clause = {}

    
        self.__table = self.__metadata.get_table(self.__table_str)
        
        if self.__where_clause_str:
            for i in self.__where_clause_str.keys():
                self.__where_clause[self.__table.get_column(i)] = self.__where_clause_str[i]
        

    def __str__(self) -> str:
        """
        Calls the ``Delete`` object string representation.

        Returns
        -------
        str
            MySQL compliant string of the delete statement execution.
        """
        return str(Delete(self.__table, self.__where_clause))

    # def delete_from(self, table_str: AnyStr) -> DeleteWrapper:
    #     return DeleteWrapper(self.__metadata, table_str, self.__where_clause_str)

    def where(self, where_clause_str: Dict[AnyStr, Any]) -> DeleteWrapper:
        """
        Used to specify the where clause.

        Parameters
        ----------
        where_clause_str: Dict[AnyStr, Any]
            The where clause to restrict which entries to delete.
        
        Returns
        -------
        DeleteWrapper
            A ``DeleteWrapper`` instance with the same metadata and table
            name and the where_clause_str passed as parameter.
        """
        return DeleteWrapper(self.__metadata, self.__table_str, where_clause_str)