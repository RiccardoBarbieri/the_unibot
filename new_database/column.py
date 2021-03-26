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
from new_database.type import Type

class Column():
    
    __name: str # contains the actual name of the column

    __type: Type # contains a Type object
    
    def __init__(self, name: str, type: Type):
        self.__name = name
        self.__type = type

    def __str__(self) -> str:
        return self.__name + ' ' + self.__type

    def get_name(self) -> str:
        return self.__name

    def get_type(self) -> Type:
        return self.__type