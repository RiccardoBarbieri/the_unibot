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

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from simple_sql.model.type import Type


class Column():

    """
    Describes a table column, the string form of this object is the
    string that declares a column with MySQL compliant syntax.

    Attributes
    ----------
    __name: str
        The name of the column as a string.
    __type: Type
        The type of the column as a Type object.
    __primary_key: bool
        True if the column is a primary key.
    __unique: bool
        True if the column has UNIQUE keyword.
    __nullable: bool, default True
        True if the column is nullable.
    __constraint: str
        Contains a basic CHECK constraint; *this is a temporary solution,
        the constraints will be handled differently in the future*.
    __default : Any
        Contains the value that will be set as default, if no value
        is passed the DEFAULT clause won't be used; *this is a temporary solution,
        this clause will be handled differently in the future*.
    
    Parameters
    ----------
    name: str
        The name of the column as a string.
    type: Type
        The type of the column as a Type object.
    primary_key: bool, default False
        True if the column is a primary key.
    unique: bool, default False
        True if the column has UNIQUE keyword.
    nullable: bool, default True
        True if the column is nullable.
    constraint: str, optional
        Contains a basic CHECK constraint.
    default : Any, optional
        Contains the value that will be set as default, if no value
        is passed the DEFAULT clause won't be used.
    """

    __name: str  # contains the actual name of the column

    __type: Type  # contains a Type object

    __primary_key: bool  # True if this column is primary key, default False

    __unique: bool  # True if this column has unique restriction, default False

    __nullable: bool  # False if this columns has not null restriction, default True

    # TODO: refactor this, temporary solution
    __constraint: str # Contains a string corresponding the simple constraint
    __default: Any # Contains default value


    def __init__(self, name: str, type: Type, primary_key: bool = False, unique: bool = False, nullable: bool = True, constraint: str = None, default: Any = None):
        self.__name = name
        self.__type = type
        self.__primary_key = primary_key
        self.__unique = unique
        self.__nullable = nullable
        if self.__primary_key:
            self.__unique = False
            self.__nullable = True
        self.__constraint = constraint
        self.__default = default

    def __str__(self) -> str:
        """
        Creates the MySQL compliant string to declare the column.

        Returns
        -------
        str
            MySQL compliant string declaration of the column.
        """
        string = self.__name
        string += ' ' + str(self.__type)
        # string += ' PRIMARY KEY' if self.__primary_key else ''
        string += ' UNIQUE' if self.__unique else ''
        string += '' if self.__nullable else ' NOT NULL'
        string += ' ' + str(self.__constraint) if self.__constraint else ''
        if self.__default:
            if type(self.__default) is str:
                string += ' DEFAULT "' + self.__default + '"'
            else:
                string += ' DEFAULT ' + str(self.__default)
        return string

    def __repr__(self) -> str:
        string = 'Column.{name}, '.format(name=self.__name)
        string += repr(self.__type) + ', '
        string += ' PRIMARY KEY, ' if self.__primary_key else ''
        string += ' UNIQUE, ' if self.__unique else ''
        string += '' if self.__nullable else ' NOT NULL, '
        return '<' + string[:-2] + '>'

    def __eq__(self, o: object) -> bool:
        return (self.__name == o.__name) and \
            (self.__type == o.__type) and \
            (self.__primary_key == o.__primary_key) and \
            (self.__unique == o.__unique) and \
            (self.__nullable == o.__nullable) and \
            (self.__constraint == o.__constraint) and \
            (self.__default == o.__default)

    def is_compatible(self, column: Column) -> bool:
        """
        Defines the way in which two columns are compatible
        in terms of type.

        Parameters
        ----------
        column: Column
            The column to compare with.

        Returns
        -------
        bool
            Returns true if the types of the column is the same
            as the column passed.
        """
        return self.__type == column.__type

    def get_name(self) -> str:
        """
        Returns
        -------
        str
            The name of the column.
        """
        return self.__name

    def get_type(self) -> Type:
        """
        Returns
        -------
        Type
            The type of the column as a Type object.
        """
        return self.__type

    def is_primary_key(self) -> bool:
        """
        Returns
        -------
        bool
            True if the column is primary key.
        """
        return self.__primary_key
    
    def is_nullable(self) -> bool:
        """
        Returns
        -------
        bool
            True if the column is nullable.
        """
        return self.__nullable
    
    def is_unique(self) -> bool:
        """
        Returns
        -------
        bool
            True if the column must be unique.
        """
        return self.__unique

    def get_constraint(self) -> str:
        """
        Returns
        -------
        str
            The string representing the constraint.
        """
        return self.__constraint

    def get_default(self) -> Any:
        """
        Returns
        -------
        Any
            The default value.
        """
        return self.__default

    def __hash__(self) -> int:
        return hash((self.__name, self.__type, self.__primary_key, self.__unique, self.__nullable, self.__constraint))
