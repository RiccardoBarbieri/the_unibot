from json.decoder import JSONDecodeError

from the_unibot.parsers import CourseParser
from the_unibot.parsers.flatten import flatten_courses
from the_unibot.utils import Utils

import json
from pathlib import Path
import requests


if __name__ == '__main__':
    # parser = CourseParser() # ! da eseguire su windows

    # with open('./courses.json', 'w+') as f:
    #     json.dump(parser.get_parsed_cards(), f)

    flat_courses = flatten_courses(Path('./courses.json'))

    flat_courses_unique: list = []  # deleting duplicates
    for i in flat_courses:
        if not i in flat_courses_unique:
            flat_courses_unique.append(i)

    bugged_links = ['https://corsi.unibo.it/2cycle/DigitalTransformationManagement',
                    'https://corsi.unibo.it/1cycle/EconomicsPoliticsSocialSciences',
                    'https://corsi.unibo.it/2cycle/LawEconomicsGovernance',
                    'https://corsi.unibo.it/2cycle/ArchitectureCreativePractices',
                    'https://corsi.unibo.it/laurea/meccatronica',
                    'https://corsi.unibo.it/laurea/TecnicheEdiliziaTerritorio',
                    'https://corsi.unibo.it/laurea/TecnologieSistemiInformatici',
                    'https://corsi.unibo.it/laurea/Infermieristica-Rimini',
                    'https://corsi.unibo.it/2cycle/FoodAnimalMetabolismManagement',
                    'https://corsi.unibo.it/2cycle/ParticlePhysics',
                    'https://corsi.unibo.it/2cycle/AdvancedSpectroscopyChemistry',
                    'https://corsi.unibo.it/2cycle/ChemicaInnovationRegulation',
                    'https://corsi.unibo.it/laurea/ScienzeCulturaGastronomia',
                    'https://corsi.unibo.it/magistrale/NutrizioneBenessereSalute',
                    'https://corsi.unibo.it/2cycle/WellnessSportHealth'
                    ]

    # to site key
    site_key = {}
    for i in flat_courses_unique:
        site_key[i['site']] = i

    for i in bugged_links:
        site_key.pop(i)
    
    flat_courses_unique = []
    
    # back to list
    for i in site_key.keys():
        flat_courses_unique.append(site_key[i])


    for i in flat_courses_unique:  # deleting bugged courses
        if i['site'] in bugged_links:
            flat_courses_unique.remove(i)

    with open(Path('./flat_courses.json'), 'w+') as f:
        json.dump(flat_courses_unique, f)
        
    # getting curricula
    for i, k in zip(flat_courses_unique, range(len(flat_courses_unique))):
        try:
            curriculas = json.loads(requests.get(i['site'] + '/' + Utils.get_course_lang(i['site']) + '/@@available_curricula').text)
        except JSONDecodeError:
            print(i['site'])
        for j in curriculas:
            j.pop('selected')
        i['curriculas'] = curriculas
        print(k)


    with open(Path('./flat_courses_curriculas.json'), 'w+') as f:
        json.dump(flat_courses_unique, f)

    for i in flat_courses_unique:
        codec = i['site'].split('/')[-1]
        i['course_codec'] = codec

    with open(Path('./flat_courses_full.json'), 'w+') as f:
        json.dump(flat_courses_unique, f)
