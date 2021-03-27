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

from pprint import pprint
from typing import List, Dict

from new_database.column import Column
from new_database.exceptions import ZeroColumns
from new_database.foreign_key import ForeignKey

class Table():

    __columns: List[Column] # contains a list of the columns of the table

    __name: str # contains the name of the table

    __references: List[ForeignKey] # contains a list of ForeignKey describing what columns references which column

    def __init__(self, name: str, columns: List[Column], references: List[ForeignKey] = None):
        self.__name = name

        self.__columns = columns

        if len(columns) == 0:
            raise ZeroColumns('Number of columns must be more than zero')

        col_dict: Dict[str, Column] = {i.get_name():i for i in columns}

        self.__dict__.update(col_dict)

        self.__references = references

    
    def get_columns(self) -> List[str]:
        return self.__columns
    
    def get_name(self) -> str:
        return self.__name

    def get_references(self) -> List[ForeignKey]:
        return self.__references
