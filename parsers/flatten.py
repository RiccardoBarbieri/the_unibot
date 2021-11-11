import json
from pathlib import Path

def flatten_courses():
    with open(Path('./courses_curriculas_codec.json')) as f:
        courses = json.load(f)
    flat_courses = []
    
    for i in courses.keys():
        for j in courses[i]:
            flat_courses.append(j)
    
    with open(Path('./flat_courses.json'), 'w+') as f:
        json.dump(flat_courses, f)
