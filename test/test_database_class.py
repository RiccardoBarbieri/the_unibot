import sqlite3
import json
from the_unibot.database import Database
from pathlib import Path

db = Database(Path('./database/telegram.db'))

print(db.query_all())