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

from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from simple_sql.model.column import Column
    from simple_sql.model.table import Table


class ForeignKey():
    """
    Describes a foreign key, the string form of this object is the
    string that declares a foreign key with MySQL compliant syntax.
    The table of the referencing column is not passed because it is
    handled inside the creation of the relative Table object.

    Attributes
    ----------
    __from_column: Column
        The column in the current table that references another column
    __to_table: Table
        The table to which the column in ``__to_column`` is bound
    __to_column: Column
        The column that is referenced by ``__from_column``
    __from_column_str: str
        The name of ``__from_column``
    __to_table_str: str
        The name of ``__to_table``
    __to_column_str: str
        The name of ``__to_column``
    __on_delete_cascade: bool
        It's True if the reference should cascade on delete

    Parameters
    ----------
    from_column: str
        String name of the column in the current table that references another column
    to_column: str
        String of type table.column, represent the column that is referenced by ``from_column``
    on_delete_cascade: bool, default False
        It's True if the reference should cascade on delete

    Raise
    -----
    SyntaxError
        If the to_column is not identified as table.column
    """

    __from_column: Column  # contains the column object to which the column refers to

    __to_table: Table  # contains the table object to which the column refers to

    __to_column: Column  # contains the column object to which the column refers to

    __from_column_str: str
    __to_column_str: str
    __to_table_str: str

    __on_delete_cascade: bool # True if this foreign key should delete on cascade, False default

    def __init__(self, from_column: str, to_column: str, on_delete_cascade: bool = False):

        if len(to_column.split('.')) != 2:
            raise SyntaxError('The referenced column must be identified as table.column')

        self.__from_column = None
        self.__to_column = None
        self.__to_table = None

        self.__from_column_str = from_column

        self.__to_table_str = to_column.split('.')[0]

        self.__to_column_str = to_column.split('.')[1]

        self.__on_delete_cascade = on_delete_cascade

    def get_from_column(self) -> Column:
        """
        Returns
        -------
        Column
            The referencing column.
        """
        return self.__from_column

    def get_column(self) -> Column:
        """
        Returns
        -------
        Column
            The referenced column.
        """
        return self.__to_column

    def get_table(self) -> Table:
        """
        Returns
        -------
        Table
            The table to which the referenced column belongs to.
        """
        return self.__to_table
    
    def get_strings(self) -> List:
        """
        Returns
        -------
        List
            A list containing the strings respectively of ``from_column``, ``to_table``
            and ``to_column``.
        """
        return [self.__from_column_str, self.__to_table_str, self.__to_column_str]

    def set_objects(self, from_column: Column = None, to_table: Table = None, to_column: Column = None):
        """
        Set the ``from_column``, ``to_table`` and ``to_column`` (all at once or one at a time),
        it is used primarly by the ``Table`` object when parsing the strings.

        Parameters
        ----------
        from_column: Column, optional
            The object that will be assigned to the ``__from_column`` attribute
        to_table: Table, optional
            The object that will be assigned to the ``__to_table`` attribute
        to_column: Column, optional
            The object that will be assigned to the ``__to_column`` attribute
        """
        if not self.__from_column:
            self.__from_column = from_column
        if not self.__to_table:
            self.__to_table = to_table
        if not self.__to_column:
            self.__to_column = to_column

    def __repr__(self) -> str:
        string = 'ForeignKey '
        string += 'ON DELETE CASCADE, ' if self.__on_delete_cascade else ''
        string += '<from {from_col} to {to_col}>'.format(
            from_col=self.__from_column_str, to_col=self.__to_table_str + '.' + self.__to_column_str)
        return '<' + string + '>'

    def __str__(self) -> str:
        """
        Creates the MySQL compliant string to declare the reference.

        Returns
        -------
        str
            MySQL compliant string declaration of the reference.
        """
        string = 'FOREIGN KEY ({from_col}) REFERENCES {table}({column})'.format(
            from_col=self.__from_column_str, table=self.__to_table_str, column=self.__to_column_str)
        return string + (' ON DELETE CASCADE' if self.__on_delete_cascade else '')
