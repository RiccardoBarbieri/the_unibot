import sys  # nopep8
sys.path.append('.')  # nopep8
from database import Database
from pathlib import Path

db = Database(Path('./database/telegram.db'))

print(db.query_all())
