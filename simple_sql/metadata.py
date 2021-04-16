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

from typing import TYPE_CHECKING, Dict

from simple_sql.exceptions import NoSuchTable

from pathlib import Path
from os.path import isfile
import pickle

if TYPE_CHECKING:
    from simple_sql.model.table import Table

class MetaData():

    """
    This class is an object abstraction of the structure
    of the database, an instance of this class contains all 
    the tables created by USING THIS MODULE, in the future 
    a simple mirror functionality will be added to get tables 
    already declared on the database. 
    This instance also contains the name of the current
    selected database (for now the module only has database-related
    functionalities, not server-related like privileges).
    Every time a change is done on the database structure (new tables, 
    altering actions on tables) the MetaData instance is backed up in
    a file (using python builtin pickle): its path is specified 
    at the creation of the instance. If the backup already
    exists at the specified path then it is restored.

    Parameters
    ----------
    backup_path: str
        The path to the backup file.

    Attributes
    ----------
    __tables: Dict[str, Table]
        A dictionary that pairs a table object with its name.
        Contains all the tables created using ``Database`` or
        restore by a backup.
    __current_database: str
        The name of the current selected database.
    __backup_path: str
        The path of the file to backup to/from. 
    """

    __tables: Dict[str, Table]

    __current_database: str

    __backup_path: str

    def __init__(self, backup_path: str):
        self.__backup_path = backup_path
        if isfile(Path(self.__backup_path)):
            old = self.__restore_backup()
            self.__tables = old.__tables
            self.__current_database = old.__current_database
        else:
            self.__tables = {}

    def get_table(self, name: str) -> Table:
        """
        Used to obtain the ``Table`` object from table name.

        Parameters
        ----------
        name: str
            The name of the table to search for.
        
        Raises
        ------
        NoSuchTable
            If the table requested is not found.

        Returns
        -------
        Table
            The table that has the requested name.
        """
        try:
            temp = self.__tables[name]
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = name))
        return temp
    
    def add_table(self, table: Table):
        """
        Method used to add a table to this ``MetaData`` instance.
        After adding the table the instance is backed up.

        Parameters
        ----------
        table: Table
            The table object to add.
        """
        if table.get_name() not in self.__tables.keys():
            self.__tables[table.get_name()] = table
        else:
            print('MetaData: Table {table} already exists, updating the existing table'.format(table = table.get_name()))
            self.update_table(table)
        self.__backup()
    
    def remove_table(self, table: str):
        """
        Method used to remove a table from this ``MetaData`` instance.
        After removing the table the instance is backed up.

        Parameters
        ----------
        table: str
            The name of the table to remove.

        Raises
        ------
        NoSuchTable
            If the table name passed does not exists in this
            ``MetaData`` instance.
        """
        try:
            self.__tables.pop(table)
        except KeyError:
            raise NoSuchTable('Table {table} does not exists'.format(table = table))
        self.__backup()

    def update_table(self, table: Table):
        """
        Method used to update a table already present in this 
        ``MetaData`` instance. After updating the table the 
        instance is backed up.

        Parameters
        ----------
        table: Table
            The new table object to replace the old one.

        Raises
        ------
        NoSuchTable
            If the table object passed does not exists in this
            ``MetaData`` instance.
        """
        if table.get_name() in self.__tables.keys():
            self.__tables[table.get_name()] = table
        else:
            raise NoSuchTable('Table {table} does not exists'.format(table = table.get_name()))
        self.__backup()

    def update_current_database(self, database: str):
        """
        Method used to update the current working database.
        The ``MetaData`` instance is backed up updating the
        database.

        Parameters
        ----------
        database: str
            The name of the new database to select.
        """
        self.__current_database = database
        self.__backup()

    def get_current_database(self) -> str:
        """
        Method used to know which is the current working
        database.
        
        Returns
        -------
        str
            The name of the database.
        """
        return self.__current_database

    def __backup(self):
        """
        Private method that dumps (using pickle) the current state
        of this :class:`simple_sql.metadata.MetaData` instance at the specified backup_path.
        """
        with open(Path(self.__backup_path), 'wb+') as f:
            pickle.dump(self.__tables, f)

    def __restore_backup(self) -> MetaData:
        """
        Private method used to load a backup of a ``MetaData`` instance
        from the file at the backup_path of this instance.

        Returns
        -------
        MetaData
            The backed up metadata instace.
        """
        with open(Path(self.__backup_path), 'rb') as f:
            return pickle.load(f)