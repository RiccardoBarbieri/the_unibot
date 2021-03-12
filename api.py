import wikipediaapi
import requests
import json
from json import JSONDecodeError

class WikipediaAPI():
    
    @staticmethod
    def pages(query):
        url = 'https://en.wikipedia.org/w/api.php'
        params = {
            'action':'opensearch',
            'namesearch':'0',
            'search':query,
            'format':'json'
        }

        session = requests.Session()
        r = session.get(url = url, params = params)

        data = r.json()


        if len(data[3]) > 1:
            return dict(names=data[1], links=data[3], single=False) # if False -> multiple links
        else:
            return dict(names=data[1][0], links=data[3][0], single=True) # if True -> single link
    
    @staticmethod
    def summary(url):
        wiki = wikipediaapi.Wikipedia('en')

        reverse_url = url[::-1]
        index = reverse_url.find('/')
        page_name = reverse_url[:index][::-1]

        return wiki.page(page_name).summary

    

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