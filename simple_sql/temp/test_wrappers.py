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
from simple_sql.model.table import Table
from simple_sql.model.foreign_key import ForeignKey
from simple_sql.model.column import Column
from simple_sql.model.type import Type
from simple_sql.model.types_enum import TypesEnum
from simple_sql.statements.select import Select
from simple_sql.statements.update import Update
from simple_sql.statements.drop_table import DropTable
from simple_sql.statements.insert_into import InsertInto
from simple_sql.statements.delete import Delete
from typing import AnyStr
from simple_sql.wrappers.select_wrapper import SelectWrapper
from simple_sql.metadata import MetaData
from simple_sql.wrappers.update_wrapper import UpdateWrapper
from simple_sql.wrappers.drop_table_wrapper import DropTableWrapper
from simple_sql.wrappers.insert_into_wrapper import InsertIntoWrapper
from simple_sql.wrappers.delete_wrapper import DeleteWrapper
from pprint import pprint
import json
import pickle


metadata: MetaData = MetaData()

cols_data = [Column('chat_id', Type(TypesEnum.INT), primary_key=True), Column('user_id', Type(TypesEnum.INT)), Column('name', Type(TypesEnum.VARCHAR))]

data = Table(metadata, 'data', *cols_data, if_not_exists=True)

cols_data_str = ['chat_id', 'user_id', 'name']
metadata.add_table(data)




cols_last = [Column('chat_id', Type(TypesEnum.INT), primary_key=True), Column(
    'command', Type(TypesEnum.TEXT))]

foreigns = [ForeignKey('chat_id', 'data.chat_id')]

cols_for = cols_last + foreigns

last = Table(metadata, 'last', *cols_for)

cols_last_str = ['chat_id', 'command']
metadata.add_table(last)




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

sel_wrapper = SelectWrapper(metadata, ['data.chat_id', 'last.chat_id'], {'data.chat_id':1234, 'last.command':'asdasd'})

print(sel_wrapper)

up_wrapper = UpdateWrapper(metadata, 'data', {'chat_id':1234, 'name':'pollo'}, {'user_id':1234, 'name':'tacchino'})

print(up_wrapper)

drop_wrapper = DropTableWrapper(metadata, 'data')

print(drop_wrapper)

ins_wrapper = InsertIntoWrapper(metadata, 'data', columns_str=['chat_id', 'user_id'], values_str=[{'chat_id':1234, 'user_id':4321}])

print(ins_wrapper)

del_wrapper = DeleteWrapper(metadata, 'last', {'chat_id':1234, 'command':'asdaaaaaad'})

print(del_wrapper)
