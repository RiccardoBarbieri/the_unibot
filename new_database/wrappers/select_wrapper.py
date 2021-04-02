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

from new_database.exceptions import NoSuchTable, WrongClauseOrder, SyntaxError

if TYPE_CHECKING:
    from new_database.model.table import Table
    from new_database.model.column import Column
    from new_database.metadata import MetaData
from new_database.statements.select import Select

class SelectWrapper():

    __metadata: Dict[AnyStr, MetaData]

    __select_clause: Dict[Table, List[Column]]
    __from_tables: List[Table]
    __where_clause: Dict[Table, Dict[Column, Any]]

    __select_clause_str: List[AnyStr]
    __where_clause_str: List[AnyStr]

    def __init__(self, metadata: Dict[AnyStr, MetaData], select_clause_str: List[AnyStr] = None, where_clause_str: Dict[AnyStr, Any] = None):
        self.__metadata = metadata

        self.__select_clause_str = select_clause_str
        self.__where_clause_str = where_clause_str

        self.__from_tables = []
        self.__select_clause = {}
        self.__where_clause = {}

        # parse bla bla bla, tables are parse from select clause (list of str pf type table.column or only table if SELECT *)
        
        tables: List[AnyStr] = [] # extracting tables and columns from select clause
        columns: Dict[AnyStr, List[AnyStr]] = {}
        if self.__select_clause_str:
            for table_col in self.__select_clause_str:
                parts = table_col.split('.')
                if len(parts) == 1:
                    tables.append(parts[0])
                elif len(parts) == 2:
                    tables.append(parts[0])
                    try:
                        columns[parts[0]].append(parts[1])
                    except KeyError:
                        columns[parts[0]] = []
                else:
                    raise SyntaxError('Select clause must be strings like table or table.column')
            for table in tables:
                try:
                    self.__from_tables.append(self.__metadata[table]['table'])
                except KeyError:
                    raise NoSuchTable('Table {table} does not exists'.format(table = table))
                if columns:
                    for col in columns[table]:
                        table_obj = self.__metadata[table]['table']
                        self.__select_clause[table_obj].append(table_obj.get_column(col))
        
        if self.__where_clause_str: # extracting where object from where string
            if len(self.__from_tables) == 1:
                for where in self.__where_clause_str.keys():
                    parts = where.split('.')
                    if len(parts) == 1:
                        try:
                            self.__where_clause[self.__from_tables[0]] = {self.__metadata[tables[0]]['table'].get_column(parts[0]): self.__where_clause_str[where]}
                        except KeyError:
                            raise NoSuchTable('Table {table} does not exists'.format(table=parts[0]))                
                    elif len(parts) == 2:
                        try:
                            self.__where_clause[self.__from_tables[0]] = {self.__metadata[tables[0]]['table'].get_column(parts[1]): self.__where_clause_str[where]}
                        except KeyError:
                            raise NoSuchTable('Table {table} does not exists'.format(table=parts[0]))
                    else:
                        raise SyntaxError('Where clause must be identified as table.column')
            else:
                for where in self.__where_clause_str.keys():
                    parts = where.split('.')
                    if len(parts) == 2:
                        try:
                            print(self.__metadata[parts[0]])
                            self.__where_clause[self.__metadata[parts[0]]['table']] = {self.__metadata[parts[0]]['table'].get_column(parts[1]): self.__where_clause_str[where]}
                        except KeyError:
                            raise NoSuchTable('Table {table} does not exists'.format(table=parts[0]))
                    else:
                        raise SyntaxError('Where clause must be identified as table.column if multiple tables are selected')
        
        
    def __str__(self) -> str:
        if (not self.__select_clause) or (not self.__where_clause):
            return str(Select(self.__select_clause, self.__from_tables, self.__where_clause))

    def select(self, select_clause_str: List[AnyStr]) -> SelectWrapper:
        return SelectWrapper(select_clause_str, self.__where_clause_str)

    def where(self, where_clause_str) -> SelectWrapper:
        if not self.__select_clause_str:
            raise WrongClauseOrder('You have to specify the select clause before')
        return SelectWrapper(self.__select_clause_str, where_clause_str)