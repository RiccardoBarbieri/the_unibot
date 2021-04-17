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

from mysql import connector
from mysql.connector.connection import CursorBase, MySQLConnection
from mysql.connector.errors import IntegrityError, ProgrammingError

from simple_sql.metadata import MetaData

from simple_sql.exceptions import DatabaseNotSelected, NoSuchDatabase

from simple_sql.model.table import Table
from simple_sql.model.column import Column
from simple_sql.model.types_enum import TypesEnum
from simple_sql.model.type import Type

from simple_sql.wrappers.select_wrapper import SelectWrapper
from simple_sql.wrappers.delete_wrapper import DeleteWrapper
from simple_sql.wrappers.update_wrapper import UpdateWrapper
from simple_sql.wrappers.drop_table_wrapper import DropTableWrapper
from simple_sql.wrappers.insert_into_wrapper import InsertIntoWrapper

from typing import Dict, AnyStr, List

from pathlib import Path



class Database():
    """
    This is the main class of the module. Using the methods in this class
    you can create, drop, select, update, insert into and delete tables.
    First you must select the database, for now this works only on a
    database level (not serer level like grant options).
    There is also the possibility of executing custom queries
    but you should use that function correctly.
    When initialized the class will connect to the server using the
    provided credentials, create the connection and the cursor.
    
    Note
    ----
    The user must create a :class:`simple_sql.metadata.MetaData` object
    to pass to the instance but the class will take care of updating it.

    Parameters
    ----------
    host: str
        The host of the server to connect to.
    user: str
        The name of the user to use for login.
    password: str
        The string of the password.
    metadata: MetaData
        The metadata instance.
    
    Attributes
    ----------
    __credentials: Dict[str, str]
        The dictionary for the credentials.
    __metadata: MetaData
        The metadata instance.
    __connection: :class:`MySQLConnection`
        The connection to the MySQL server.
    __cursor: :class:`CursorBase`
        The cursor to execute the statements.
    """

    __credentials: Dict[str, str] = {} # dictionary ('host', 'user', 'password')

    __metadata: MetaData # contains metadata for current session of database

    __connection: MySQLConnection

    __cursor: CursorBase

    def __init__(self, host: str, user: str, password: str, metadata: MetaData):

        self.__credentials['host'] = host
        self.__credentials['user'] = user
        self.__credentials['password'] = password

        self.__connection = connector.connect(**self.__credentials)

        self.__metadata = metadata

        self.__cursor = self.__connection.cursor()

    def select_database(self, database: str):
        """
        Use this method to select the working database.

        Parameters
        ----------
        database: str
            The name of the database to select. Use get_databases
            to obtain all the available databases.
        
        Raises
        ------
        NoSuchDatabase
            If the requested database does not exists.
        """
        try:
            self.__cursor.execute('USE {database};'.format(database = database))
            self.__metadata.update_current_database(database)
            self.__connection.commit()
        except ProgrammingError as e:
            if e.errno == 1049:
                raise NoSuchDatabase('Database {db} not selected, try Database.get_databases() to print all available databases'.format(db = database))
        
    def get_databases(self, print_them: bool = True) -> List[str]:
        """
        Use this method to see which databases are available.
        To disable the log print of the list pass False as print_them
        parameter.

        Parameters
        ----------
        print_them: bool, default True
            True if the function should print the list.

        Returns
        -------
        List[str]
            A list of the names of the databases.
        """
        self.__cursor.execute('SHOW DATABASES;')
        fetch = self.__cursor.fetchall()
        databases = []
        for i in fetch:
            databases.append(i[0])
        return databases

    def create_table(self, table: Table):
        """
        Creates a table and adds it to the metadata instance.
        Commits the changes to the connection.

        Parameters
        ----------
        table: Table
            The :class:`Table` to add to the database.
        """
        self.__metadata.add_table(table)

        self.__cursor.execute(str(table))

        self.__connection.commit()

    def select(self, select_clause: List[str]) -> SelectWrapper:
        """
        Initialize a select statement with the select clause.
        The select clause is a list of strings that will be used to
        create the select AND from clause.
        It must be formatted as follows:
        
          * Use the format `table.column` if you want to add a single 
            column to the selection, the table will be added
            to the from clause.
          * Use the format `table` if you want to add all the
            columns of the table to the selection, the table will
            be added to the from clause.

        You can make a list that mixes these two formats.

        Parameters
        ----------
        select_clause: List[str]
            The list of select clause columns.
        
        Returns
        -------
        SelectWrapper
            A :class:`SelectWrapper` instance with the current metadata
            instance and the provided select clause.
        """
        return SelectWrapper(self.__metadata, select_clause_str=select_clause)

    def update(self, table: str) -> UpdateWrapper:
        """
        Initialize a update statement with the name of the table to
        update.

        Parameters
        ----------
        table: str
            The name of the table to update.
        
        Returns
        -------
        UpdateWrapper
            An :class:`UpdateWrapper` instance with the current metadata
            instance and the provided table name.
        """
        return UpdateWrapper(self.__metadata, table_str=table)

    def insert_into(self, table: AnyStr, columns: List[AnyStr] = None) -> InsertIntoWrapper:
        """
        Initialize a insert into statement with the name of the table to
        insert into and eventually the set of column to insert into.

        Parameters
        ----------
        table: str
            The name of the table to insert into.
        columns: List[str]
            The list of column names to insert into.

        Returns
        -------
        InsertIntoWrapper
            An :class:`InsertIntoWrapper` instance with the current
            metadata instance and the provided table name and eventually
            columns list.
        """
        return InsertIntoWrapper(table_str=table, columns_str=columns)
    
    def drop_table(self, table: str) -> DropTableWrapper:
        """
        Initialize a drop table statement with the name of the table
        to drop.
        This method also removes the table from the metadata instance.

        Parameters
        ----------
        table: str
            The name of the table to drop.
        
        Returns
        -------
        DropTableWrapper
            A :class:`DropTableWrapper` instance with the current metadata
            instance and the provided table name.
        """
        self.__metadata.remove_table(table)
        return DropTableWrapper(self.__metadata, table)

    def delete(self, table: str) -> DeleteWrapper:
        """
        Initialize a delete statement with the name of the table
        to delete from.

        Parameters
        ----------
        table: str
            The name of the table to delete from.
        """
        return DeleteWrapper(self.__metadata, table)

    def execute(self, query: SelectWrapper | AnyStr | object) -> List[Dict]: # TODO: change object in anywrapper here and in docstring
        # !!!! Put in anywrapper a get element method interface, all
        # !!!! have to implement it
        """
        Execute a query. To execute the queries you create using the
        appropriate methods you should provide the return value of
        the method. If the query is a select statement you can obtain
        the output of the statement.
        You can also use this method to execute a custom query providing
        a string in MySQL compliant syntax.

        Warning
        -------
        Be careful while executing custom queries because in that case
        the execution is unchecked.

        Parameters
        ----------
        query: str or object
            A string or a wrapper object.
        
        Returns
        -------
        List[Dict] or List[Tuple]
            The result of the fetchall of the execution. If the query is a
            select statement the result is parsed as a list of dictionaries
            with `table.column` key format and the respective value.
            If the query is not a select statement the result is a list
            of tuples.
        """
        if 'SELECT' in str(query): # using dict for select query, find other cases
            self.__cursor.execute(str(query))
            result = self.__create_dictionary(self.__cursor.fetchall(), query.get_elements())
        elif 'ALTER' in str(query):
            print('Feature not yet implemented')
        else:
            self.__cursor.execute(str(query))
            result = self.__cursor.fetchall()
        self.__connection.commit()
        return result

    def __create_dictionary(self, fetchall: List[tuple], elements: Dict[str, List[str]]) -> List[Dict]:
        """
        Private method used to create the dictionary representing
        the result of a select statement using the fetchall and
        the elements.

        Parameters
        ----------
        fetchall: List[Tuple]
            The result of the fetchall of the query execution.
        elements: Dict[str, List[str]]
            A dictionary that associates to a table name a list
            of the table columns' names.

        Returns
        -------
        List[Dict]
            A list of dictionaries with `table.column` as keys and
            values as items.
        """
        result = []
        cols = []
        for item in elements.items():
            for col in item[1]:
                cols.append(str(item[0]) + '.' + str(col))
        for i in fetchall:
            temp = {}
            for col, val in zip(cols, i):
                temp[col] = val
            result.append(temp)
        return result

        


# metadata = MetaData('./simple_sql/metadata_telegram.dump')

# with open(Path('./simple_sql/creds.txt')) as f:
#     temp = f.readlines()

# db = Database(temp[0], 'root', temp[1], metadata)

# db.select_database('telegram')

# test = Table(metadata, 'test', Column('id', Type(TypesEnum.INT), primary_key=True), Column('value', Type(TypesEnum.VARCHAR, 255), default='ASD'))
# print(test)
# db.create_table(test)

# query = db.select(['test.id', 'test.value'])
# print(query)

# print(db.execute(query))

