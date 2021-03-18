import sqlite3
import json
from pathlib import Path



if __name__ == '__main__':
    with open(Path('./resources/flat_courses.json')) as f:
        courses = json.load(f)
    with sqlite3.connect(Path('./database/telegram.db')) as connection:
        cursor = connection.cursor()
        for i in courses:
            course_name = i['course_name']
            course_code = int(i['course_code'])
            campus = i['campus']
            international = 0 if i['international'] else 1
            access = i['access']
            site = i['site']
            course_codec = i['course_codec']
            course_data = (course_name, course_code, campus, international, access, site, course_codec)
            try:
                cursor.execute('INSERT INTO courses VALUES (?,?,?,?,?,?,?)', course_data)
            except sqlite3.IntegrityError as e:
                print('{msg}, not inserting '.format(msg = str(e)) + str(course_data))
            if 'curriculas' in i.keys():
                curriculas = i['curriculas']
                for j in curriculas:
                    curricula_data = (course_code, j['label'], j['value'])
                    try:
                        cursor.execute('INSERT INTO curriculas VALUES (?,?,?)', curricula_data)
                    except sqlite3.IntegrityError as e:
                        print('{msg}, not inserting '.format(msg = str(e)) + str(curricula_data))
                    
            