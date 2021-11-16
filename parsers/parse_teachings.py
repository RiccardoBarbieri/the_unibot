import json
import os
from bs4 import BeautifulSoup
from bs4.element import Tag
import re

def get_title(tr: Tag):
    title = tr.find("td", {"class": "title"})
    if title:
        return title.text.strip()

def get_ssd(tr: Tag):
    ssd = tr.find("td", {"class": "ssd"})
    if ssd:
        return ssd.text.strip()

def get_cfu(tr: Tag):
    infos = tr.find_all("td", {"class": "info"})
    if infos:
        cfu = infos[-1].text.strip()
    if re.match(r'[0-9]{0,2}', cfu):
        return cfu
    else:
        return None


if __name__ == '__main__':
    course_file = os.listdir("./resources/teachings")

    for file_name in course_file:
        with open("./resources/teachings/" + file_name, "r") as f:
            soup = BeautifulSoup(f, "html.parser")
        
        # print(soup.find_all("link")[2]["href"])
        if ('https://corsi.unibo.it/laurea/IngegneriaMeccanicaForli/insegnamenti/piano/2021/0949/000/000/2021' != soup.find_all("link")[2]["href"]):
            continue
        
        teachings = soup.find_all("tr")
        teachings_final = []
        last = None
        for i in teachings:
            if last and 'modulo' in i.get('class', []) and 'modulo' not in last.get('class', []):
                teachings_final.remove(last)
            if i.find_all('th') == []:
                teachings_final.append(i)

            last = i
        
        for i in teachings_final:
            print(get_title(i))
        print(len(teachings_final))
        break
        