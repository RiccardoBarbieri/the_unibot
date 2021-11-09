import requests
import json
from the_unibot.utils import Utils
from bs4 import BeautifulSoup
from pprint import pprint

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

if __name__ == '__main__':
    with open("./resources/flat_courses_full.json") as f:
        courses = json.load(f)
    all_years = ["1", "2", "3", "4", "5"]
    curriculas = []
    old = {}
    print(all_years[:3])
    print(all_years[3:])
    for course, i in zip(courses, range(len(courses))):
        # if course["course_codec"] != "storia":
        #     continue
        print(f"{i}/{len(courses)}")
        if Utils.get_course_type(course["site"]) in ["magistrale", "2cycle"]:
            years = all_years[3:]
        if Utils.get_course_type(course["site"]) in ["laurea", "1cycle"]:
            years = all_years[:3]
        for year in years:
            url = f'{course["site"]}/orario-lezioni/@@available_curricula?anno={year}'
            r = requests.get(url)
            if r:
                curriculas.append({"year":year, "course_code":course["course_code"], "curriculas":json.loads(r.content), "len":len(json.loads(r.content))})
    pprint(curriculas)
            