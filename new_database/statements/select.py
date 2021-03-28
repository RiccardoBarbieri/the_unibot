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
    
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    pass # to secure imports


class Select():



    def __init__(self, ) -> None:
        
        




# SELECT -> FROM -> WHERE
# UPDATE -> SET -> WHERE
# DELETE FROM -> WHERE
# INSERT INTO -> VALUES