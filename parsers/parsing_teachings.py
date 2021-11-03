import requests
import json
import datetime
from the_unibot.database import Database
from the_unibot.utils import Utils

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
    db = Database("./database/telegram.db")

    years = ["2018", "2019", "2020", "2021"]

    for i in courses:
        lang = Utils.get_course_lang2(i["site"])
        year = now = datetime.datetime.now().year
        course_code = i["course_code"]
        for j in i["curriculas"]:
            curricula = j["value"].replace("-", "/")
            for y in years:
                url = i["site"] + f"/{lang}/piano/{year}/{course_code}/{curricula}/{y}"
                r = requests.get(url)
                if r.status_code != 200:
                    print(bcolors.FAIL + 'error   ' + bcolors.ENDC + f' on {i["course_name"]}, {url}')
                else:
                    print(bcolors.OKGREEN + 'success ' + bcolors.ENDC + f' on {i["course_name"]}, {url}')



# type = "laurea"
# codec = "IngegneriaInformatica"
# lang = "insegnamenti" #course-structure-diagram
# current_year = "2021"
# course_code = "9254"
# curricula_first_seg = "000"
# curricula_second_seg = "000"
# registered_year = "2019"
# url = f"https://corsi.unibo.it/{type}/{codec}/{lang}/piano/{current_year}/{course_code}/{curricula_first_seg}/{curricula_second_seg}/{registered_year}"