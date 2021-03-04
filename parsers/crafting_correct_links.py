from pprint import pprint
import json
import requests

def correct_links():
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

