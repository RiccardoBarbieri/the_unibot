from logging import exception
import re
from database.database import Database
from utils.utils import Utils
from pprint import pprint

db = Database('./database/telegram.db')

# db.update('data', key_chat_id = -535696384, key_user_id = 913871757, course = 9244)
print(db.query_by_ids(-535696384, 913871757))