import wikipediaapi
import requests

'''
This class is used to get the wikipedia pages using the Wikipedia API.

Attributes
----------
None

Methods
-------
pages(query: str) -> dict
    Returns the wikipedia pages for the specified query.
summary(url: str) -> str
    Returns the summary of the specified wikipedia page.
'''
class WikipediaAPI():

    '''
    Returns the wikipedia pages for the specified query.

    Parameters
    ----------
    query : str
        The query for which the wikipedia pages are requested.

    Returns
    -------
    dict
        The wikipedia pages for the specified query.
    '''
    @staticmethod
    def pages(query) -> dict:
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
    
    '''
    Returns the summary of the specified wikipedia page.
    
    Parameters
    ----------
    url : str
        The url of the wikipedia page for which the summary is requested.

    Returns
    -------
    str
        The summary of the specified wikipedia page.
    '''
    @staticmethod
    def summary(url) -> str:
        user_agent = 'the_unibot (https://github.com/RiccardoBarbieri/the_unibot)'
        language = 'en'
        wiki = wikipediaapi.Wikipedia(user_agent=user_agent, language=language)

        reverse_url = url[::-1]
        index = reverse_url.find('/')
        page_name = reverse_url[:index][::-1]
        
        # apostrophes management
        if '%27' in page_name:
            page_name = page_name.replace('%27', '\'')

        return wiki.page(page_name).summary