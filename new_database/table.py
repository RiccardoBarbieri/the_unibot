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

from new_database.types_enum import TypesEnum
from new_database.column import Column
from new_database.type import Type
from new_database.exceptions import ZeroColumns

class Table():

    __name: str

    __columns: List[Column]

    def __init__(self, name: str, columns: List[Column]):

        self.__name = name
        self.__columns = columns

        if len(columns) == 0:
            raise ZeroColumns('Number of columns must be more than zero')

        col_dict: Dict[str, Column] = {i.get_name():i for i in columns}

        self.__dict__.update(col_dict)

    
    def get_columns(self) -> List[str]:
        return self.__columns

cols = []
names = ['user_id', 'chat_id']

for i in names:
    cols.append(Column(i, Type(TypesEnum.INT, 10)))
