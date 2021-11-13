import requests
import json
import datetime
from the_unibot.database import Database
from the_unibot.utils import Utils
from tqdm import tqdm

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
    with open("./resources/flat_courses_curriculas.json") as f:
        courses = json.load(f)
    db = Database("./database/telegram.db")

    years = ["2016", "2017", "2018", "2019", "2020", "2021"]

    f = open("parsers/teachings.log.md", "w+")

    try:
        for i, j in zip(courses, tqdm(range(len(courses)))):
            lang = Utils.get_course_lang2(i["site"])
            year = now = datetime.datetime.now().year
            course_code = i["course_code"]
            for j in i["curriculas"]:
                curricula = j["value"].replace("-", "/")
                for y in years:
                    url = i["site"] + f"/{lang}/piano/{year}/{course_code}/{curricula}/{y}"
                    r = requests.get(url)
                    if r.status_code != 200:
                        tqdm.write(bcolors.FAIL + 'error   ' + bcolors.ENDC + f' on {i["course_name"]}, {url}')
                        f.write('<span style="color:red;font-family:courier-new;font-size:20px">error   </span>' + f' on {i["course_name"]}, {url}\n')
                    else:
                        tqdm.write(bcolors.OKGREEN + 'success ' + bcolors.ENDC + f' on {i["course_name"]}, {url}')
                        f.write('<span style="color:green;font-family:courier-new;font-size:20px">success </span>' + f' on {i["course_name"]}, {url}\n')
                        with open(f'./resources/teachings/{course_code}.{j["value"]}.{year}.html', "w+") as f2:
                            f2.write(r.content.decode("utf-8"))
    except KeyboardInterrupt as e:
        print(e)
    finally:
        f.close()
            



# type = "laurea"
# codec = "IngegneriaInformatica"
# lang = "insegnamenti" #course-structure-diagram
# current_year = "2021"
# course_code = "9254"
# curricula_first_seg = "000"
# curricula_second_seg = "000"
# registered_year = "2019"
# url = f"https://corsi.unibo.it/{type}/{codec}/{lang}/piano/{current_year}/{course_code}/{curricula_first_seg}/{curricula_second_seg}/{registered_year}"