import json
import requests
from bs4 import BeautifulSoup
from bs4.element import ResultSet
import re
from time import sleep

from tqdm.std import tqdm

def print_result(course_name_, course_code_, campus_, international_, access_, languages_, site_):
    print('Course name:     ' + course_name_.strip())
    print('Course code:     ' + course_code_.strip())
    print('Campus:          ' + campus_.strip())
    print('International:   ' + str(bool(international_)))
    print('Access:          ' + access_.strip())
    print('Languages:       ' + languages_.strip())
    print('Site:            ' + site_)



if __name__ == "__main__":

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
        
        item_areas = soup.find_all('div', class_=f'item area{i + 1}')
        tqdm.write(str(len(item_areas)).center(4, ' ') + " - " + url)
        for item_area in item_areas:
            course = {}
            top_info_ = item_area.find('div', class_='text-wrapper')

            title_ = top_info_.find('div', class_='title')
            course_name_ = title_.find('h3').text
            course_code_ = title_.find('span').text
            campus_ = title_.find('p').text
            try:
                international_ = top_info_.find_all('p')[-1].find('span').text
            except:
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

    with open('./resources/flat_courses_full.json', 'w+') as f:
        json.dump(flat_courses_full, f, indent=4)