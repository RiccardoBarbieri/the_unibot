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

from new_database.exceptions import SyntaxError

if TYPE_CHECKING:
    pass # to secure imports


class Statement():

    statements: List[str] = [
        'SELECT',
        'UPDATE',
        'DELETE',
        'INSERT INTO',
        'CREATE DATABASE',
        'ALTER DATABASE',
        'CREATE TABLE',
        'ALTER TABLE',
        'DROP TABLE',
        'CREATE INDEX',
        'ALTER INDEX'
    ]

    __statement: str

    def __init__(self, statement: str, table_name: str, update_set):

        if statement.upper() not in self.statements:
            raise SyntaxError('{statement} is not a valid SQL statemnt'.format(statement = statement))
        
        self.__statement = statement

        self.__table
    
    def  


# SELECT -> FROM -> WHERE
# UPDATE -> SET -> WHERE
# DELETE FROM -> WHERE
# INSERT INTO -> VALUES