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

        if len(data[3]) == 0:
            return dict(names=data[1], links=data[3], single=False)
        elif len(data[3]) > 1:
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