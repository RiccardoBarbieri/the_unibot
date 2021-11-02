import requests
import json
import datetime
from the_unibot.database import Database
from the_unibot.utils import Utils

if __name__ == '__main__':
    with open("./resources/flat_courses_full.json") as f:
        courses = json.load(f)
    db = Database("./database/telegram.db")

    for i in courses:
        lang = Utils.get_course_lang2(i["site"])
        year = now = datetime.datetime.now().year
        course_code = i["course_code"]
        registered_year = "2019"
        for j in i["curriculas"]:
            curricula = j["value"].replace("-", "/")
            url = i["site"] + f"/{lang}/piano/{year}/{course_code}/{curricula}/{registered_year}"
            r = requests.get(url)
            if (r.status_code != 200):
                print(f'error on {i["course_name"]}, {curricula}, {url}')





# type = "laurea"
# codec = "IngegneriaInformatica"
# lang = "insegnamenti" #course-structure-diagram
# current_year = "2021"
# course_code = "9254"
# curricula_first_seg = "000"
# curricula_second_seg = "000"
# registered_year = "2019"
# url = f"https://corsi.unibo.it/{type}/{codec}/{lang}/piano/{current_year}/{course_code}/{curricula_first_seg}/{curricula_second_seg}/{registered_year}"