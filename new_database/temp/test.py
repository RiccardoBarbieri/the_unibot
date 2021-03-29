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



cols_data = [Column('chat_id', Type(TypesEnum.INT), primary_key=True), Column('user_id', Type(
    TypesEnum.INT)), Column('name', Type(TypesEnum.VARCHAR))]

data = Table('data', cols_data, if_not_exists=True)

cols_last = [Column('chat_id', Type(TypesEnum.INT), primary_key=True), Column(
    'command', Type(TypesEnum.TEXT))]

foreigns = [ForeignKey(Column('chat_id', Type(TypesEnum.INT), primary_key=True), data, Column(
    'chat_id', Type(TypesEnum.INT), primary_key=True))]

last = Table('last', cols_last, references=foreigns)

print(last)
print(data)

select_clause = {
    data: [Column('chat_id', Type(TypesEnum.INT), primary_key=True)],
    last: [Column('command', Type(TypesEnum.TEXT))]
}

from_clause = [data, last]

where_clause = {
    data: {Column('chat_id', Type(TypesEnum.INT), primary_key=True): '1234'}
}

select = Select(select_clause, from_clause, where_clause)

print(select)