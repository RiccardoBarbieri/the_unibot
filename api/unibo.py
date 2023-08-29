import requests
import json
from json import JSONDecodeError

'''
This class is used to get the class schedule using the Unibo API.

Attributes
----------
None

Methods
-------
get_orario(corso: str, type: str, anno: str, lang: str, date_exact: str, curricula: str) -> dict
    Returns the class schedule for the specified course, type, year, language, date and curricula.
'''
class UniboAPI():
    '''
    Returns the class schedule for the specified course, type, year, language, date and curricula.

    Parameters
    ----------
    corso : str
        The course for which the class schedule is requested.
    type : str
        The type of the course for which the class schedule is requested.
    anno : str
        The year of the course for which the class schedule is requested.
    lang : str
        The language of the course for which the class schedule is requested.
    date_exact : str
        The date for which the class schedule is requested.
    curricula : str
        The curricula of the course for which the class schedule is requested.
    
    Returns
    -------
    dict
        The class schedule for the specified course, type, year, language, date and curricula.
    '''
    @staticmethod
    def get_orario(corso, type, anno, date_start, date_end, curricula = '000-000') -> dict:


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
    
    '''
    Returns the class schedule for the specified course, type, year, language, date and curricula.

    Parameters
    ----------
    corso : str
        The course for which the class schedule is requested.
    type : str
        The type of the course for which the class schedule is requested.
    anno : str
        The year of the course for which the class schedule is requested.
    lang : str
        The language of the course for which the class schedule is requested.
    date_exact : str
        The date for which the class schedule is requested.
    curricula : str
        The curricula of the course for which the class schedule is requested.
    
    Returns
    -------
    dict
        The class schedule for the specified course, type, year, language, date and curricula.
    '''
    @staticmethod
    def get_orario(corso, type, anno, lang, date_exact, curricula = None):

        if curricula is not None:
            url = f'https://corsi.unibo.it/{type}/{corso}/{lang}/@@orario_reale_json?anno={anno}&start={date_exact}&end={date_exact}&curricula={curricula}'
        else:
            url = f'https://corsi.unibo.it/{type}/{corso}/{lang}/@@orario_reale_json?anno={anno}&start={date_exact}&end={date_exact}'
        r = requests.get(url)

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