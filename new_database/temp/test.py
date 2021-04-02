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

from typing import Dict
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
from typing import AnyStr
from new_database.wrappers.select_wrapper import SelectWrapper
from new_database.metadata import MetaData

# db.update().where()

metadata: Dict[AnyStr, MetaData] = {}


cols_data = [Column('chat_id', Type(TypesEnum.INT), primary_key=True), Column('user_id', Type(
    TypesEnum.INT)), Column('name', Type(TypesEnum.VARCHAR))]

data = Table('data', cols_data, if_not_exists=True)

cols_data_str = ['chat_id', 'user_id', 'name']
metadata['data'] = {'table':data, 'columns':cols_data_str}




cols_last = [Column('chat_id', Type(TypesEnum.INT), primary_key=True), Column(
    'command', Type(TypesEnum.TEXT))]

foreigns = [ForeignKey(Column('chat_id', Type(TypesEnum.INT), primary_key=True), data, Column(
    'chat_id', Type(TypesEnum.INT), primary_key=True))]

last = Table('last', cols_last, references=foreigns)

cols_last_str = ['chat_id', 'command']
metadata['last'] = {'table':last, 'columns':cols_last_str}




print(last)
print(data)



select_clause = {
    data: [Column('chat_id', Type(TypesEnum.INT), primary_key=True)],
    last: [Column('command', Type(TypesEnum.TEXT))]
}

from_clause = [data, last]

where_clause = {
    data: {Column('chat_id', Type(TypesEnum.INT), primary_key=True): 1234}
}

select = Select(select_clause, from_clause, where_clause)
print(select)

set_clause = {
    Column('chat_id', Type(TypesEnum.INT)): 123123
}

where_clause = {
    Column('chat_id', Type(TypesEnum.INT)): 3214
}

update = Update(data, set_clause, where_clause)
print(update)

asd = SelectWrapper(metadata, ['data.chat_id', 'last.chat_id'], {'data.chat_id':1234, 'last.command':'asdasd'})

print(asd)