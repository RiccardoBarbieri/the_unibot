import json
from pprint import pprint


if __name__ == '__main__':
    with open('./resources/curriculas.json') as f:
        curriculas = json.load(f)
    with open('./resources/flat_courses_full.json') as f:
        courses = json.load(f)
    
    final = []
    for course in courses:
        temp = {}
        temp = course
        temp['curriculas'] = curriculas[course['course_code']]
        final.append(temp)
    
    with open('./resources/flat_courses_curriculas.json', 'w+') as f:
        json.dump(final, f, indent=4)