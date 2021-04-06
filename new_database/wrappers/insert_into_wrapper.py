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

from new_database.exceptions import NoSuchTable

if TYPE_CHECKING:
    from new_database.model.table import Table
    from new_database.metadata import MetaData
    from new_database.model.column import Column
from new_database.statements.insert_into import InsertInto

class InsertIntoWrapper():

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
        return str(InsertInto(self.__table, self.__columns, self.__values))

    def insert_into(self, table_str: AnyStr, columns_str: List[AnyStr]) -> InsertIntoWrapper:
        return InsertIntoWrapper(self.__metadata, table_str, columns_str, self.__values_str)

    def values(self, values_str: List[Dict[AnyStr, Any]]) -> InsertIntoWrapper:
        return InsertIntoWrapper(self.__metadata, self.__table_str, self.__columns_str, values_str)
