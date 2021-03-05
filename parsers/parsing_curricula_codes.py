import sys

import json
from json import JSONDecodeError
import requests
from bs4 import BeautifulSoup
from pprint import pprint

def save_correct_links():

    with open('courses.json') as f:
        courses = json.load(f)

    sites_with_curricula = []

    for i in courses.keys():
        for j in courses[i]:
            if 'curriculas' in j.keys():
                sites_with_curricula.append(j['site'])


    sites_and_type = []

    for url in sites_with_curricula:
        if requests.get(url + '/orario-lezioni').status_code == 200:
            sites_and_type.append(url + '/orario-lezioni')
        else:
            sites_and_type.append(url + '/timetable')

    with open('sites_with_curriculas.json', 'w+') as f:
        json.dump(sites_and_type, f)

    # for url in sites_and_type.keys():
    #     print('{:<100}{:>10}'.format(url + sites_and_type[url], str(requests.get(url + sites_and_type[url]).status_code)))

def create_curriculas_with_codes():
    save_correct_links() # uncommento to re save links

    with open('sites_with_curriculas.json') as f:
        links = json.load(f)

    

    curriculas_by_site = {}
    for i, j in zip(links, range(1, len(links) + 1)):
        
        print(i)
        
        r = requests.get(i + '/@@available_curricula')

        if r.status_code != 200:
            print('Errore sul sito ' + i)
        else:

            try:
                temp_not_parsed = json.loads(r.text)
                temp_curriculas = []
                for l in temp_not_parsed:
                    temp = {}
                    temp['label'] = l['label']
                    temp['value'] = l['value']
                    temp_curriculas.append(temp)

                if i[-1] == 'i':
                    curriculas_by_site[i[:-15]] = temp_curriculas.copy()
                elif i[-1] == 'e':
                    curriculas_by_site[i[:-10]] = temp_curriculas.copy()

            except JSONDecodeError:
                print('Decoding error at ' + i)

        print(j)

    with open('curriculas_with_codes.json', 'w+') as f:
        json.dump(curriculas_by_site, f)

