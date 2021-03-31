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

from typing import List, TYPE_CHECKING, TypedDict, Dict, AnyStr

if TYPE_CHECKING:
    from new_database.model.table import Table

class MetaData(TypedDict, total = False):
    
    columns: List[AnyStr]

    table: Table
