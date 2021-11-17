import requests
import json
from pprint import pprint
from tqdm import tqdm
from bs4 import BeautifulSoup
import re

import logging
logging.basicConfig(
    filemode = 'w+',
    filename = "./logs/scraping.log",
    level = logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


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

# with open("./resources/flat_courses_full.json") as f:
#        courses = json.load(f)

def scrape_curriculas(courses: dict) -> dict:
            
    curriculas = {}

    for i in tqdm(range(len(courses))):
        course = courses[i]
        
        tqdm.write(f'{bcolors.OKBLUE}Scraping curriculas:{bcolors.ENDC}')

        url = f'{course["site"]}/{Utils.get_course_lang(course["site"])}/@@available_curricula'
        r = requests.get(url)
        if r:
            temp = json.loads(r.content)
            for i in temp:
                i.pop("selected")
            curriculas[course["course_code"]] = temp
            logging.error(f'success on {course["course_code"]}, {course["course_codec"]}, {url}')
        else:
            logging.error(f'failed on {course["course_code"]}, {course["course_codec"]}, {url}')

    with open("./resources/curriculas.json", "w") as f:
        json.dump(curriculas, f, indent=4)
    
    return curriculas

def scrape_course() -> list:

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
                    international_ = top_info_.find_all('p')[-1].find('span').text
                except Exception as e:
                    international_ = None
                
                sub_info_ = item_area.find('div', class_='text-description')
                ps = sub_info_.find_all('p')
                access_ = ps[0].text
                campus_ = ps[1].text
                languages_ = ps[2].text
                site_ = sub_info_.find('p', class_='goto').find('a')['href']
                
                course['course_name'] = course_name_.strip()
                course['course_code'] = re.sub('- cod. ([0-9]{0,6})', r'\1', course_code_.strip())
                course['campus'] = campus_.replace('Sede didattica: ', '').strip().split(',')
                course['international'] = bool(international_)
                course['access'] = access_.replace('Tipo di accesso: ', '').strip()
                course['languages'] = re.sub('Lingua:[ \n]*', '', languages_.strip()).split(', ')
                course['site'] = site_.strip()
                course['course_codec'] = site_.strip().split('/')[-1]
            
                flat_courses_full.append(course)

                logging.INFO(f'success on scheda {i + 1}/{scheda} on {item_areas.index(item_area) + 1}/{len(item_areas)}')
            except Exception as e:
                logging.ERROR(f'failed on scheda {i + 1}/{scheda} on {item_areas.index(item_area) + 1}/{len(item_areas)}')

    with open('./resources/flat_courses_full.json', 'w+') as f:
        json.dump(flat_courses_full, f, indent=4)

    return flat_courses_full