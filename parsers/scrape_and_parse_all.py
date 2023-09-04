import sys  # nopep8
sys.path.append('.')  # nopep8
from utils import Utils
import requests
import json
from tqdm import tqdm

import re
from datetime import datetime

from bs4 import BeautifulSoup
from bs4.element import Tag

import logging
logging.basicConfig(
    filemode='w+',
    filename="./logs/scraping.log",
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


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


def get_full_title(tr: Tag):
    title = tr.find("td", {"class": "title"})
    if title:
        return title.text.strip()


def get_title(tr: Tag):
    title = tr.find("td", {"class": "title"})
    if title:
        return re.sub(r'[0-9]{0,7}(.*)', r'\1', get_full_title(tr)).strip()


def get_ssd(tr: Tag):
    ssd = tr.find("td", {"class": "ssd"})
    if ssd:
        return ssd.text.strip()
    else:
        return ''


def get_site(tr: Tag):
    title = tr.find("td", {"class": "title"})
    if title and title.find("a"):
        return title.find("a")['href']
    else:
        return ''


def get_cfu(tr: Tag):
    infos = tr.find_all("td", {"class": "info"})
    if infos:
        cfu = infos[-1].text.strip()
    if re.fullmatch(r'[0-9]{0,2}', cfu):
        return cfu
    else:
        return ''


def get_code(tr: Tag):
    code = tr.find("td", {"class": "code"})
    if code.text == '':
        return re.sub(r'([0-9]{0,7}).*', r'\1', get_full_title(tr)).strip()
    else:
        return code.text.strip()


def scrape_curriculas(courses: dict) -> dict:
    logging.info('SCRAPING CURRICULAS')

    curriculas = {}

    for i in tqdm(range(len(courses))):
        course = courses[i]

        url = f'{course["site"]}/{Utils.get_course_lang(course["site"])}/@@available_curricula'
        r = requests.get(url)
        if r:
            if r.url != url:
                logging.error(
                    f'failed on {course["course_code"]}, {course["course_codec"]}, {url}')
                continue
            temp = json.loads(r.content)
            for i in temp:
                i.pop("selected")
            curriculas[course["course_code"]] = temp
            logging.info(
                f'success on {course["course_code"]}, {course["course_codec"]}, {url}')
        else:
            logging.error(
                f'failed  on {course["course_code"]}, {course["course_codec"]}, {url}')

    with open("./resources/curriculas.json", "w") as f:
        json.dump(curriculas, f, indent=4)

    return curriculas


def scrape_courses() -> list:
    logging.info('SCRAPING COURSES')

    flat_courses_full = []
    scheda = 1

    while True:
        url = f'https://www.unibo.it/it/didattica/corsi-di-studio/elenco?schede={scheda}'

        r = requests.get(url)
        soup = BeautifulSoup(r.content, 'html.parser')

        if not soup.find_all('div', {'class': f'item area{scheda}'}):
            scheda -= 1
            break
        scheda += 1

    for i in tqdm(range(scheda)):

        url = f'https://www.unibo.it/it/didattica/corsi-di-studio/elenco?schede={i + 1}'

        r = requests.get(url)
        soup = BeautifulSoup(r.content, 'html.parser')

        item_areas: list = soup.find_all('div', class_=f'item area{i + 1}')

        for item_area in item_areas:
            course = {}
            try:
                top_info_ = item_area.find('div', class_='text-wrapper')

                title_ = top_info_.find('div', class_='title')
                course_name_ = title_.find('h3').text
                course_code_ = title_.find('span').text
                campus_ = title_.find('p').text
                try:
                    international_ = top_info_.find_all(
                        'p')[-1].find('span').text
                except Exception as e:
                    international_ = None

                sub_info_ = item_area.find('div', class_='text-description')
                ps = sub_info_.find_all('p')
                access_ = ps[0].text
                campus_ = ps[1].text
                languages_ = ps[2].text
                site_ = sub_info_.find('p', class_='goto').find('a')['href']

                course['course_name'] = course_name_.strip()
                course['course_code'] = re.sub(
                    '- cod. ([0-9]{0,6})', r'\1', course_code_.strip())
                course['campus'] = campus_.replace(
                    'Sede didattica: ', '').strip().split(',')
                course['international'] = bool(international_)
                course['access'] = access_.replace(
                    'Tipo di accesso: ', '').strip()
                course['languages'] = re.sub(
                    'Lingua:[ \n]*', '', languages_.strip()).split(', ')
                course['site'] = site_.strip()
                course['course_codec'] = site_.strip().split('/')[-1]

                flat_courses_full.append(course)

                logging.info(
                    f'success on scheda {i + 1}/{scheda} on {item_areas.index(item_area) + 1}/{len(item_areas)}')
            except Exception as e:
                logging.error(
                    f'failed  on scheda {i + 1}/{scheda} on {item_areas.index(item_area) + 1}/{len(item_areas)}')

    with open('./resources/courses.json', 'w+') as f:
        json.dump(flat_courses_full, f, indent=4)

    return flat_courses_full


def scrape_teachings(courses: dict):
    logging.info('SCRAPING TEACHINGS')

    years = ["2016", "2017", "2018", "2019", "2020", "2021"]

    # teachings_final = []
    threads = []
    for j in tqdm(range(len(courses))):
        course = courses[j]

        lang = Utils.get_course_lang2(course["site"])
        year = datetime.now().year
        course_code = course["course_code"]
        for j in course["curriculas"]:
            curricula = j["value"].replace("-", "/")
            for y in years:
                url = course["site"] + \
                    f"/{lang}/piano/{year}/{course_code}/{curricula}/{y}"
                r = requests.get(url)
                if r.status_code != 200:
                    logging.error(f'failed  on {course["course_name"]}, {url}')
                else:
                    logging.info(f'success on {course["course_name"]}, {url}')

                    soup = BeautifulSoup(
                        r.content.decode("utf-8"), "html.parser")
                    teachings = soup.find_all("tr")
                    teachings_filtered = []
                    last = None
                    for i in teachings:
                        if last and 'modulo' in i.get('class', []) and 'modulo' not in last.get('class', []):
                            teachings_filtered.remove(last)
                        if i.find_all('th') == []:
                            teachings_filtered.append(i)

                        last = i

                    for i in teachings_filtered:
                        temp = {}
                        temp['title'] = get_title(i)
                        temp['ssd'] = get_ssd(i)
                        temp['cfu'] = get_cfu(i)
                        temp['code'] = get_code(i)
                        temp['site'] = get_site(i)
                        temp['from'] = url

                        teachings_final.append(temp)

        with open('./resources/teachings.json', 'w+') as f:
            json.dump(teachings_final, f, indent=4)


teachings_final = []

if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == 'lazy':
        with open('./resources/curriculas.json', 'r') as f:
            curriculas = json.load(f)
        with open('./resources/courses.json', 'r') as f:
            courses = json.load(f)
    else:
        courses = scrape_courses()

        curriculas = scrape_curriculas(courses)

    final = []
    logging.info('JOINING COURSES AND CURRICULAS')
    for course in courses:
        if course['course_code'] not in curriculas.keys():
            logging.error(f'failed  on {course["course_code"]}')
            continue
        temp = {}
        temp = course
        temp['curriculas'] = curriculas[course['course_code']]
        final.append(temp)
        logging.error(f'success on {course["course_code"]}')

        with open('./resources/courses_curriculas.json', 'w+') as f:
            json.dump(final, f, indent=4)
    if not (len(sys.argv) == 2 and sys.argv[1] == 'lazy'):
        teachings = scrape_teachings(final)
