import requests
import json
from json import JSONDecodeError

class UniboAPI():

    @staticmethod
    def get_orario(corso, anno, date_start, date_end, curricula = '000-000'):


        url = 'https://corsi.unibo.it/magistrale/{corso}/orario-lezioni/@@orario_reale_json?anno={anno}&start={date_start}&end={date_end}&curricula={curricula}'
        r = requests.get()

        if r.status_code != 200:
            print('Request error')
            return {}
        
        try:
            schedule = json.loads(r.text)
        except JSONDecodeError:
            print('JSON decoding error')

        delete = ['note', 'start', 'end', 'val_crediti', 'aule', 'cod_sdoppiamento', 'extCode', 'periodo']

        for i in delete:
            i['start'] = i['start'][:-9]
            i['date'] = i.pop('start')
            for j in schedule:
                j.pop(i, None)
        
        return schedule
    
    @staticmethod
    def get_orario(corso, anno, date_exact, curricula = '000-000'):

        url = 'https://corsi.unibo.it/magistrale/{corso}/orario-lezioni/@@orario_reale_json?anno={anno}&start={date_exact}&end={date_exact}&curricula={curricula}'
        r = requests.get(url)

        if r.status_code != 200:
            print('Request error')
            return {}
        
        try:
            schedule = json.loads(r.text)
        except JSONDecodeError:
            print('JSON decoding error')

        delete = ['note', 'end', 'val_crediti', 'aule', 'cod_sdoppiamento', 'extCode', 'periodo']
        
        for i in delete:
            schedule.pop(i, None)
        
        i['start'] = i['start'][:-9]
        i['date'] = i.pop('start')
        
        return schedule


















# https://corsi.unibo.it/magistrale/{corso}/orario-lezioni/@@orario_reale_json?anno={anno}&start={start}&end={end}&curricula={curricula}
# 2021-03-02