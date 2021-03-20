from pathlib import Path
import json
from database.database import Database
from pprint import pprint

db = Database(Path('./database/telegram.db'))

pprint(len(db.query_all('courses')))

courses: dict = {} # remove to adapt to new tables for courses
with open(Path('./resources/flat_courses.json')) as f:
    courses = json.load(f)

pprint(len(courses))