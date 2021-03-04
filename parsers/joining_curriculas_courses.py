import json


def join():
    with open('courses.json') as f:
        courses = json.load(f)

    with open('curriculas_with_codes.json') as f:
        curriculas_codes = json.load(f)



    for i in courses.keys():
        for j in courses[i]:
            if j['site'] in curriculas_codes.keys():
                j['curriculas'] = curriculas_codes[j['site']].copy()

    with open('courses_curriculas.json', 'w+') as f:
        json.dump(courses, f)

