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

from simple_sql.exceptions import NoSuchTable, WrongClauseOrder, SyntaxError

if TYPE_CHECKING:
    from simple_sql.model.table import Table
    from simple_sql.model.column import Column
    from simple_sql.metadata import MetaData
from simple_sql.statements.select import Select

class SelectWrapper():
    """
    This class uses the table name, the select clause and where clause
    as strings with the metadata object (handled by ``Database``) to obtain
    the correct ``Table`` object and to create the where and select clauses.
    Using the select and where methods, ``SelectWrapper`` instances will be
    created and returned to add clauses separately.
    In the future all where clauses will be modeled with a class.

    Parameters
    ----------
    metadata: MetaData
        The ``MetaData`` instance of the database.
    select_clause_str: List[AnyStr], optional
        The select clause containing table.column values
        or table values.
    where_clause_str: Dict[AnyStr, Any], optional
        The where clause.

    __metadata: MetaData
        The ``MetaData`` instance of the database.
    __select_clause: Dict[Table, List[Column]]
        The select clause as object.
    __from_tables: List[Table]
        The tables to select from as objects.
    __where_clause: Dict[Table, Dict[Column, Any]]
        The where clause as object.
    __select_clause_str: List[AnyStr]
        The select clause containing table.column values
        or table values.
    __where_clause_str: Dict[AnyStr, Any]
        The where clause as string.
    __table_col_mix: Dict[AnyStr, List[AnyStr]]
        A dictionary of table and list of columns to select
        from that table.

    Raises
    ------
    SyntaxError
        If the select or where clause does not respect specifications.
    """

    __metadata: MetaData

    __select_clause: Dict[Table, List[Column]]
    __from_tables: List[Table]
    __where_clause: Dict[Table, Dict[Column, Any]]

    __select_clause_str: List[AnyStr]
    __where_clause_str: List[AnyStr]

    __table_col_mix: Dict[AnyStr, List[AnyStr]]

    def __init__(self, metadata: MetaData, select_clause_str: List[AnyStr] = None, where_clause_str: Dict[AnyStr, Any] = None):
        self.__metadata = metadata

        self.__select_clause_str = select_clause_str
        self.__where_clause_str = where_clause_str

        self.__from_tables = []
        self.__select_clause = {}
        self.__where_clause = {}
        
        tables: List[AnyStr] = [] # extracting tables and columns from select clause
        columns: Dict[AnyStr, List[AnyStr]] = {}
        if self.__select_clause_str:
            for table_col in self.__select_clause_str:
                parts = table_col.split('.')
                if (len(parts) == 1) and (tables.count(parts[0]) == 0):
                    tables.append(parts[0])
                    for i in self.__metadata.get_table(parts[0]).get_columns():
                        try:
                            columns[parts[0]].append(i.get_name())
                        except KeyError:
                            columns[parts[0]] = []
                            columns[parts[0]].append(i.get_name())
                elif len(parts) == 2:
                    if (tables.count(parts[0]) == 0):
                        tables.append(parts[0])
                    try:
                        columns[parts[0]].append(parts[1])
                    except KeyError:
                        columns[parts[0]] = []
                        columns[parts[0]].append(parts[1])
                else:
                    raise SyntaxError('Select clause must be strings like table or table.column')
            for table in tables:
                self.__from_tables.append(self.__metadata.get_table(table))
                if columns:
                    for col in columns[table]:
                        table_obj = self.__metadata.get_table(table)
                        try:
                            self.__select_clause[table_obj].append(table_obj.get_column(col))
                        except KeyError:
                            self.__select_clause[table_obj] = []
                            self.__select_clause[table_obj].append(table_obj.get_column(col))
        
        self.__table_col_mix = columns

        if self.__where_clause_str: # extracting where object from where string
            if len(self.__from_tables) == 1:
                for where in self.__where_clause_str.keys():
                    parts = where.split('.')
                    if len(parts) == 1:
                        self.__where_clause[self.__from_tables[0]] = {self.__metadata.get_table(tables[0]).get_column(parts[0]): self.__where_clause_str[where]}
                    elif len(parts) == 2:
                        self.__where_clause[self.__from_tables[0]] = {self.__metadata.get_table(tables[0]).get_column(parts[1]): self.__where_clause_str[where]}
                    else:
                        raise SyntaxError('Where clause must be identified as table.column')
            else:
                for where in self.__where_clause_str.keys():
                    parts = where.split('.')
                    if len(parts) == 2:
                        self.__where_clause[self.__metadata.get_table(parts[0])] = {self.__metadata.get_table(parts[0]).get_column(parts[1]): self.__where_clause_str[where]}
                    else:
                        raise SyntaxError('Where clause must be identified as table.column if multiple tables are selected')
    
    
    def get_elements(self) -> Dict[AnyStr, List[AnyStr]]:
        """
        Function used in database to create the dictionary with correct
        table and colum names for better accessibility.

        Returns
        -------
        Dict[AnyStr, List[AnyStr]]
            A dictionary that associates to a table name a list with the
            relative column names.
        """
        return self.__table_col_mix
        
    def __str__(self) -> str:
        """
        Calls the ``Select`` object string representation.

        Returns
        -------
        str
            MySQL compliant string of the select statement execution.
        
        Raises
        ------
        WrongClauseOrder
            If the select clause is not yet specified.
        """
        if self.__select_clause:
            return str(Select(self.__select_clause, self.__from_tables, self.__where_clause))
        else:
            raise WrongClauseOrder('You must specify select clause first')

    # def select(self, select_clause_str: List[AnyStr]) -> SelectWrapper:
    #     return SelectWrapper(self.__metadata, select_clause_str, self.__where_clause_str)

    def where(self, where_clause_str: Dict[AnyStr, Any]) -> SelectWrapper:
        """
        Used to specify the where clause.

        Parameters
        ----------
        where_clause_str: Dict[AnyStr, Any]
            The pairs of column names and values for the where clause.
        
        Returns
        -------
        SelectWrapper
            A ``SelectWrapper`` instance with the same metadata, table
            name and select clause and the where_clause_str passed as parameter.
        
        Raises
        ------
        WrongClauseOrder
            When the where clause is being specified before the select clause.
        """

        if not self.__select_clause_str:
            raise WrongClauseOrder('You have to specify the select clause before')
        return SelectWrapper(self.__metadata, self.__select_clause_str, where_clause_str)