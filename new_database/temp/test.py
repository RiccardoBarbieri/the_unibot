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


from new_database.model.table import Table
from new_database.model.foreign_key import ForeignKey
from new_database.model.column import Column
from new_database.model.type import Type
from new_database.model.types_enum import TypesEnum
from new_database.statements.select import Select
from new_database.statements.update import Update
from new_database.statements.drop_table import DropTable
from new_database.statements.insert_into import InsertInto
from new_database.statements.delete import Delete

