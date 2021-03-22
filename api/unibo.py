import requests
import json
from json import JSONDecodeError
from pprint import pprint

class UniboAPI():

    @staticmethod
    def get_orario(corso, type, anno, date_start, date_end, curricula = '000-000'):


        url = f'https://corsi.unibo.it/{type}/{corso}/orario-lezioni/@@orario_reale_json?anno={anno}&start={date_start}&end={date_end}&curricula={curricula}'
        
        r = requests.get(url)

        if r.status_code != 200:
            print('Request error')
            return {}
        
        try:
            schedule = json.loads(r.text)
        except JSONDecodeError:
            print('JSON decoding error')

        for i in schedule.keys():
            schedule[i]

        delete = ['note', 'start', 'end', 'val_crediti', 'aule', 'cod_sdoppiamento', 'extCode', 'periodo']

        for i in delete:
            i['start'] = i['start'][:-9]
            i['date'] = i.pop('start')
            for j in schedule:
                j.pop(i, None)
        
        return schedule
    
    @staticmethod
    def get_orario(corso, type, anno, lang, date_exact, curricula = None):

        if curricula is not None:
            url = f'https://corsi.unibo.it/{type}/{corso}/{lang}/@@orario_reale_json?anno={anno}&start={date_exact}&end={date_exact}&curricula={curricula}'
        else:
            url = f'https://corsi.unibo.it/{type}/{corso}/{lang}/@@orario_reale_json?anno={anno}&start={date_exact}&end={date_exact}'
        r = requests.get(url)
        print(url)

        if r.status_code != 200:
            print('Request error' + ' {url}'.format(url = url))
            return {}
        
        try:
            schedule = json.loads(r.text)
        except JSONDecodeError:
            print('JSON decoding error')



        final_schedule = []
        for i in schedule:

            try:
                location = '{aula} {piano}, {ubicazione}'.format(aula = i['aule'][0]['des_risorsa'], piano = i['aule'][0]['des_piano'], ubicazione = i['aule'][0]['des_ubicazione'])
            except KeyError:
                location = 'Non disponibile'
            except IndexError:
                location = 'Lezione solo online'

            delete = ['note', 'end', 'val_crediti', 'aule', 'cod_sdoppiamento', 'extCode', 'periodo']
            
            for j in delete:
                i.pop(j, None)
            
            i['start'] = i['start'][:-9]
            i['date'] = i.pop('start')

            i['location'] = location

            final_schedule.append(i)
        
        return final_schedule