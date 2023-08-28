import wikipediaapi
import requests
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
        user_agent = 'the_unibot (https://github.com/RiccardoBarbieri/the_unibot)'
        language = 'en'
        wiki = wikipediaapi.Wikipedia(user_agent=user_agent, language=language)

        reverse_url = url[::-1]
        index = reverse_url.find('/')
        page_name = reverse_url[:index][::-1]
        
        # fix bug apostrophes
        if '%27' in page_name:
            page_name = page_name.replace('%27', '\'')

        return wiki.page(page_name).summary