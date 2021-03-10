import sys
import getpass
if getpass.getuser() == 'ricca':
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram') #TODO: change this path when migrating to another platform
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
import sqlite3
import json
from database.database import Database
from pathlib import Path

db = Database(Path('./database/telegram.db'))

print(db.query_all())