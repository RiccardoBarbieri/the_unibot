import pprint
import json
from pathlib import Path
from database.database import Database


# with open(Path('./flat_courses_curriculas.json'), 'r') as f:
#     courses = json.load(f)

# for i in courses:
#     if (len(i['curriculas']) in (0,1)):
#         print(i['site'])

db = Database(Path('./database/telegram.db'))

print(db.query_join('courses', 'curriculas', {'course_code1':'9244'}, 'course_code1', 'code2', course_code = 'course_code'))
# print(db.custom_query('SELECT COUNT(*) FROM courses'))
# db.delete_all('courses')
# db.delete_all('curriculas')
