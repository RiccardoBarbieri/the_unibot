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

from typing import TYPE_CHECKING, Any, Dict, AnyStr

from simple_sql.exceptions import NoSuchTable, WrongClauseOrder

if TYPE_CHECKING:
    from simple_sql.model.table import Table
    from simple_sql.model.column import Column
    from simple_sql.metadata import MetaData
from simple_sql.statements.update import Update

class UpdateWrapper():

    """
    This class uses the table name, the set clause and where clause
    as strings with the metadata object (handled by ``Database``) to obtain
    the correct ``Table`` object and to create the where and set clauses.
    Using the update, set and where methods, ``UpdateWrapper`` instances will be
    created and returned to add clauses separately.
    In the future all where clauses will be modeled with a class.

    Parameters
    ----------
    metadata: MetaData, optional
        The ``MetaData`` instance of the database.
    table_str: AnyStr, optional
        The name of the table to update.
    set_clause_str: Dict[AnyStr, Str], optional
        The set clause containing which column to update
        and with which value.
    where_clause_str: Dict[AnyStr, Str], optional
        The where clause to restrict which entries to updates.

    Attributes
    ----------
    __metadata: MetaData, optional
        The ``MetaData`` instance of the database.
    __table: Table
        The ``Table`` object to update.
    __set_clause: Dict[AnyStr, Any]
        The set clause generated from the string set clause.
    __where_clause: Dict[AnyStr, Any]
        The where clause generated from the string where clause.
    __table_str: AnyStr, optional
        The name of the table to update.
    __set_clause_str: Dict[AnyStr, Str], optional
        The set clause containing which column to update
        and with which value.
    __where_clause_str: Dict[AnyStr, Str], optional
        The where clause to restrict which entries to updates.

    Raises
    ------
    NoSuchTable
        If the table specified does not exists.
    """

    __metadata: MetaData

    __table: Table
    __set_clause: Dict[Column, Any]
    __where_clause: Dict[Column, Any]

    __table_str: AnyStr
    __set_clause_str: Dict[AnyStr, Any]
    __where_clause_str: Dict[AnyStr, Any]


    def __init__(self, metadata: MetaData, table_str: AnyStr = None, set_clause_str: Dict[AnyStr, Any] = None, where_clause_str: Dict[AnyStr, Any] = None):
        self.__metadata = metadata

        self.__table_str = table_str
        self.__set_clause_str = set_clause_str
        self.__where_clause_str = where_clause_str

        self.__set_clause = {}
        self.__where_clause = {}

        try:
            self.__table = self.__metadata.get_table(self.__table_str)
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = self.__table_str))

        for col in self.__where_clause_str.keys():
            col_obj = self.__table.get_column(col)
            self.__where_clause[col_obj] = self.__where_clause_str[col]

        for col in self.__set_clause_str.keys():
            col_obj = self.__table.get_column(col)
            self.__set_clause[col_obj] = self.__set_clause_str[col]
    
    def __str__(self) -> str:
        """
        Calls the ``Update`` object string representation.

        Returns
        -------
        str
            MySQL compliant string of the update statement execution.
        """
        return str(Update(self.__table, self.__set_clause, self.__where_clause))

    # def update(self, table_str: AnyStr) -> UpdateWrapper:
    #     return UpdateWrapper(self.__metadata, table_str, self.__set_clause_str, self.__where_clause_str)

    def set(self, set_clause_str: Dict[AnyStr, Any]) -> UpdateWrapper:
        """
        Used to specify the set clause.

        Parameters
        ----------
        set_clause_str: Dict[AnyStr, Any]
            The set clause containing which column to update
            and with which value.
        
        Returns
        -------
        UpdateWrapper
            A ``UpdateWrapper`` instance with the same metadata, table
            name and where clause and the set_clause_str passed as parameter.
        """
        return UpdateWrapper(self.__metadata, self.__table_str, set_clause_str, self.__where_clause_str)

    def where(self, where_clause_str: Dict[AnyStr, Any]) -> UpdateWrapper:
        """
        Used to specify the where clause.

        Parameters
        ----------
        where_clause_str: Dict[AnyStr, Any]
            The where clause to restrict which entries to update.
        
        Returns
        -------
        UpdateWrapper
            A ``UpdateWrapper`` instance with the same metadata, table
            name and set clause and the where_clause_str passed as parameter.

        Raises
        ------
        WrongClauseOrder
            If the where clause is being specified before the set clause.
        """
        if not self.__set_clause:
            raise WrongClauseOrder('You have to specify the set clause before')
        return UpdateWrapper(self.__metadata, self.__table_str, self.__set_clause_str, where_clause_str)
    