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

from typing import TYPE_CHECKING, AnyStr, List, Dict, Any

from simple_sql.exceptions import NoSuchTable

if TYPE_CHECKING:
    from simple_sql.model.table import Table
    from simple_sql.metadata import MetaData
    from simple_sql.model.column import Column
from simple_sql.statements.insert_into import InsertInto

class InsertIntoWrapper():
    """
    This class uses the table name, the column list and values list
    as strings with the metadata object (handled by ``Database``) to obtain
    the correct ``Table`` object and to create the column and values list as 
    MySQL compliant clauses.
    Using the insert and values methods, ``InsertIntoWrapper`` instances will be
    created and returned to add clauses separately.

    Parameters
    ----------
    metadata: MetaData
        The ``MetaData`` instance of the database.
    table_str: Table, optional
        The name of the table to insert into.
    columns_str: List[AnyStr], optional
        The list of column names to that defines the set of columns
        to insert the values into.
    values_str: List[Dict[AnyStr, Any]], optional
        The list of pairs of column names and values to insert into the
        table.

    Attributes
    ----------
    __metadata: MetaData
        The ``MetaData`` instance of the database.
    __table: Table
        The ``Table`` object to insert into.
    __columns: List[Column]
        The list of ``Column`` objects that defines the set of columns
        to insert the values into.
    __values: List[Dict[Column, Any]]
        The list of pairs of ``Column`` objects and values to insert into the
        table.
    __table_str: Table
        The name of the table to insert into.
    __columns_str: List[AnyStr]
        The list of column names to that defines the set of columns
        to insert the values into.
    __values_str: List[Dict[AnyStr, Any]]
        The list of pairs of column names and values to insert into the
        table.
    """

    __metadata: MetaData

    __table: Table
    __columns: List[Column]
    __values: List[Dict[Column, Any]]

    __table_str: AnyStr
    __columns_str: List[AnyStr]
    __values_str: List[Dict[AnyStr, Any]] 


    def __init__(self, metadata: MetaData, table_str: AnyStr = None, columns_str: List[AnyStr] = None, values_str: List[Dict[AnyStr, Any]] = None):
        
        self.__metadata = metadata

        self.__table_str = table_str
        self.__columns_str = columns_str
        self.__values_str = values_str

        self.__columns = []
        self.__values = []

        try:
            self.__table = self.__metadata.get_table(self.__table_str)
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = self.__table_str))
        
        if self.__columns_str:
            for i in self.__columns_str:
                self.__columns.append(self.__table.get_column(i))
        
        if self.__values_str:
            for i in self.__values_str:
                temp = {}
                for col in i.keys():
                    col_obj = self.__table.get_column(col)
                    val = i[col]
                    temp[col_obj] = val
                self.__values.append(temp)


    def __str__(self) -> str:
        """
        Calls the ``InsertInto`` object string representation.

        Returns
        -------
        str
            MySQL compliant string of the insert into statement execution.
        """
        return str(InsertInto(self.__table, self.__columns, self.__values))

    # def insert_into(self, table_str: AnyStr, columns_str: List[AnyStr]) -> InsertIntoWrapper:
    #     return InsertIntoWrapper(self.__metadata, table_str, columns_str, self.__values_str)

    def values(self, values_str: List[Dict[AnyStr, Any]]) -> InsertIntoWrapper:
        """
        Used to specify the values to insert.

        Parameters
        ----------
        values_str: List[Dict[AnyStr, Any]]
            The list of pairs of column names and values to insert into the
            table.
        
        Returns
        -------
        InsertIntoWrapper
            A ``InsertIntoWrapper`` instance with the same metadata, table
            name and columns and the values_str passed as parameter.
        """
        return InsertIntoWrapper(self.__metadata, self.__table_str, self.__columns_str, values_str)
