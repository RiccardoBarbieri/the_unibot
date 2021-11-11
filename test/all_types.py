import json
from the_unibot.utils import Utils

if __name__ == '__main__':
    with open("./resources/flat_courses_full.json") as f:
        courses = json.load(f)
    
    types = set()
    for i in courses:
        types.add(Utils.get_course_type(i["site"]))
    
    print(types)