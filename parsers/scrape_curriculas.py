import requests
import json
from the_unibot.utils import Utils
from bs4 import BeautifulSoup
from pprint import pprint

from tqdm import tqdm
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
            
    curriculas = {}
    old = {}
    with open("./logs/srcape_curriculas.log", "w+") as f:

        for course, i in zip(courses, tqdm(range(len(courses)))):
            
            url = f'{course["site"]}/{Utils.get_course_lang(course["site"])}/@@available_curricula'
            r = requests.get(url)
            if r:
                temp = json.loads(r.content)
                for i in temp:
                    i.pop("selected")
                curriculas[course["course_code"]] = temp
                tqdm.write(f"{bcolors.OKGREEN}[+]{bcolors.ENDC} {course['course_code']}")
            else:
                tqdm.write(f"{bcolors.FAIL} {course['course_code']} {bcolors.ENDC}")
                f.write(f'ERROR on {course["course_code"]}, {course["course_codec"]}, {url}\n')
    with open("./resources/curriculas.json", "w") as f:
        json.dump(curriculas, f, indent=4)
