import json


def expose_course_code():
    
    with open('courses_curriculas.json') as f:
        courses = json.load(f)

    for i in courses.keys():
        for j in courses[i]:
            temp_rev_site = j['site'][::-1]
            index = temp_rev_site.find('/')
            temp_rev_site = temp_rev_site[:index]
            j['course_codec'] = temp_rev_site[::-1]
    
    with open('5courses_curriculas_codec.json', 'w+') as f:
        json.dump(courses, f)

