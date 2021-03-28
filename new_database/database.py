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
from mysql.connector.errors import IntegrityError

import sqlalchemy as db

from typing import Dict



class Database():

    __credentials: Dict[str, str] # dictionary ('host', 'user', 'password')



    def __init__(self, host: str, user: str, password: str):

        self.__credentials['host'] = host
        self.__credentials['user'] = user
        self.__credentials['password'] = password



