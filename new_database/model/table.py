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


from new_database.exceptions import ZeroColumns, PrimaryKeyError, ForeignKeyError, NoSuchColumn
from typing import List, Dict, TYPE_CHECKING
if TYPE_CHECKING:
    from new_database.model.foreign_key import ForeignKey
    from new_database.metadata import MetaData
from new_database.model.column import Column
from new_database.model.foreign_key import ForeignKey


class Table():

    __columns: List[Column] = []  # contains a list of the columns of the table

    __name: str  # contains the name of the table

    # contains a list of ForeignKey describing what columns references which column
    __references: List[ForeignKey] = []

    # True if the create table query should cotain IF NOT EXISTS clause, default True
    __if_not_exists: bool

    # list of columns that are primary key
    __primary_key: List[Column] = []

    __metadata: MetaData

    def __init__(self, metadata: MetaData, name: str, *columns_and_foreign: List, if_not_exists: bool = True):
#references: List[ForeignKey] = None,
        self.__metadata = metadata

        self.__name = name

        self.__columns = []

        self.__references = []

        if len(columns_and_foreign) == 0:
            raise ZeroColumns('Number of columns must be more than zero')

        for i in columns_and_foreign:
            if type(i) is Column:
                self.__columns.append(i)
            elif type(i) is ForeignKey:
                self.__references.append(i)
            
        temp_from_col: Column        
        check_exists = False # checking that foreigns reference an existent column in this table and setting objects
        for i in self.__references:
            check_exists = False
            for j in self.__columns:
                if i.get_strings()[0] == j.get_name():
                    check_exists = True
                    temp_from_col = j
            if not check_exists:
                raise NoSuchColumn('Foreign key {fk} is invalid, column {col} is not a column of table {table}'.format(fk = repr(i), col = j.get_name(), table = self.get_name()))
            else:
                i.set_objects(from_column=temp_from_col)


        temp_to_table_str: str # checking that foreigns reference an existing table and column
        temp_to_col_str: str
        for i in self.__references:
            temp_to_col_str = i.get_strings()[2]
            temp_to_table_str = i.get_strings()[1]
            temp_to_table = self.__metadata.get_table(temp_to_table_str)
            temp_to_col = temp_to_table.get_column(temp_to_col_str)
            i.set_objects(to_table=temp_to_table, to_column=temp_to_col)

        check_primary = False # checking if there is at least one primary key
        for i in self.__columns:
            if i.is_primary_key():
                self.__primary_key.append(i)
                check_primary = True
        if not check_primary:
            raise PrimaryKeyError('There should be at least one primary key in table {table}'.format(table = self.__name))

        if self.__references: # checking correct assignment of foreign keys
            for i in self.__references:
                if (i.get_from_column() not in self.__columns):
                    raise ForeignKeyError('Foreign key {fkey} does not refer to an existent column'.format(fkey = repr(i)))

        col_dict: Dict[str, Column] = {i.get_name(): i for i in self.__columns}

        self.__dict__.update(col_dict)

        self.__if_not_exists = if_not_exists

    def get_columns(self) -> List[Column]:
        return self.__columns

    def get_name(self) -> str:
        return self.__name

    def get_references(self) -> List[ForeignKey]:
        return self.__references

    def get_column(self, column_name: str) -> Column:
        for i in self.__columns:
            if i.get_name() == column_name:
                return i
        raise NoSuchColumn('Column {col} for table {table} does not exists'.format(col = column_name, table = self.__name))


    def contains(self, column: Column) -> bool:
        return column in self.__columns
        

    def __repr__(self) -> str:
        string = 'Table.{name} '.format(name=self.__name)
        string += str([repr(i) for i in self.__columns]).replace('\'', '') + ', '
        if self.__references:
            string += str([repr(i) for i in self.__references]).replace('\'', '') + ', '
        string += 'IF NOT EXISTS' if self.__if_not_exists else ''
        return '<' + string + '>'

    def __str__(self) -> str:
        string = 'CREATE TABLE '
        string += 'IF NOT EXISTS ' if self.__if_not_exists else ''
        string += '{name} '.format(name = self.__name)
        string += '('
        for i in self.__columns:
            string += str(i) + ', '
        if self.__references:
            for i in self.__references:
                string += str(i) + ', '
        string = string[:-2] + ')'
        return string


        