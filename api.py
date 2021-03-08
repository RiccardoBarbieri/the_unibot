import requests
import json
from json import JSONDecodeError

class UniboAPI():

    @staticmethod
    def get_orario(corso, anno, date_start, date_end, curricula = '000-000'):


        url = f'https://corsi.unibo.it/magistrale/{corso}/orario-lezioni/@@orario_reale_json?anno={anno}&start={date_start}&end={date_end}&curricula={curricula}'
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
    def get_orario(corso, anno, date_exact, curricula = '000-000'):

        url = f'https://corsi.unibo.it/magistrale/{corso}/orario-lezioni/@@orario_reale_json?anno={anno}&start={date_exact}&end={date_exact}&curricula={curricula}'
        r = requests.get(url)

        if r.status_code != 200:
            print('Request error')
            return {}
        
        try:
            schedule = json.loads(r.text)
        except JSONDecodeError:
            print('JSON decoding error')
        
        try:
            location = '{aula} {piano}, {ubicazione}'.format(aula = schedule['aule'][0]['des_risorsa'], piano = schedule['aule'][0]['des_piano'], ubicazione = schedule['aule'][0]['des_ubicazione'])
        except KeyError:
            location = 'Non disponibile'

        delete = ['note', 'end', 'val_crediti', 'aule', 'cod_sdoppiamento', 'extCode', 'periodo']
        
        for i in delete:
            schedule.pop(i, None)
        
        schedule['start'] = i['start'][:-9]
        schedule['date'] = i.pop('start')

        schedule['location'] = location
        
        return schedule


















# https://corsi.unibo.it/magistrale/{corso}/orario-lezioni/@@orario_reale_json?anno={anno}&start={start}&end={end}&curricula={curricula}
# 2021-03-02