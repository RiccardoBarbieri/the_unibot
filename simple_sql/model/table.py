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


from simple_sql.exceptions import ZeroColumns, PrimaryKeyError, ForeignKeyError, NoSuchColumn
from typing import List, Dict, TYPE_CHECKING
if TYPE_CHECKING:
    from simple_sql.model.foreign_key import ForeignKey
    from simple_sql.metadata import MetaData
from simple_sql.model.column import Column
from simple_sql.model.foreign_key import ForeignKey

# TODO: update primary key constraint creator

class Table():
    """
    Describes a table, the string form of this object is the
    string that declares a table with MySQL compliant syntax.
    Columns, references and primary keys are created using the
    string representation of the column and foreign key objects.
    Inside checks to ensure foreign key compatibility are handled
    here

    Attributes
    ----------
    __columns: List[Column]
        A list of the columns of this table as objects. 
    __name: str
        The name of the table.
    __references: List[ForeignKey]
        A list of the references of this table as objects
    __if_not_exists: bool
        True if the declaration should include IF NOT EXISTS clause
    __primary_keys: List[Column]
        A list of the columns that are primary keys
    __metadata: MetaData
        The ``MetaData`` object relative to this database

    Parameters
    ----------
    metadata: MetaData
    name: str
    
    """

    __columns: List[Column] = []  # contains a list of the columns of the table

    __name: str  # contains the name of the table

    # contains a list of ForeignKey describing what columns references which column
    __references: List[ForeignKey] = []

    # True if the create table query should cotain IF NOT EXISTS clause, default True
    __if_not_exists: bool

    # list of columns that are primary key
    __primary_keys: List[Column] = []

    __metadata: MetaData

    def __init__(self, metadata: MetaData, name: str, *columns_and_foreign: List, if_not_exists: bool = True):
        
        self.__metadata = metadata

        self.__name = name

        self.__columns = []

        self.__references = []

        self.__primary_keys = []

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
                self.__primary_keys.append(i)
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
        string += 'PRIMARY KEY ('
        if self.__primary_keys:
            for i in self.__primary_keys:
                string += i.get_name() + ', '
            string = string[:-2] + '))'
        else:
            string = string[:-2] + ')'
        return string


        