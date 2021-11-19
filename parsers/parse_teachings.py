import json
import os
from bs4 import BeautifulSoup
from bs4.element import Tag
import re
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

if __name__ == '__main__':
    course_file = os.listdir("./resources/teachings")


    teachings_final = []
    for file_name, num in zip(course_file, range(len(course_file))):

        with open("./resources/teachings/" + file_name, "r") as f:
            soup = BeautifulSoup(f, "html.parser")
        
        print(soup.find_all("link")[2]["href"])
        
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
        
            teachings_final.append(temp)

    with open('./resources/teachings.json', 'w+') as f:
        json.dump(teachings_final, f, indent = 4)
