import wikipediaapi
import requests
from pprint import pprint

wiki = wikipediaapi.Wikipedia('en')

# page = wiki.page('Carlo Conti')

# print(page.sections)


# url = 'https://en.wikipedia.org/api.php?action=opensearch&search=Carlo+Conti&namespace=0&format=json'
url = 'https://en.wikipedia.org/w/api.php'
params = {
    'action':'opensearch',
    'namesearch':'0',
    'search':'pipo sudato',
    'format':'json'
}


session = requests.Session()

r = session.get(url = url, params = params)
data = r.json()

for i in data:
    print(i)
    print('_____________________')

reverse_link = data[3][0][::-1]
index = reverse_link.find('/')
page_name = reverse_link[:index][::-1]

print(wiki.page(page_name).title)
import sys
import getpass
if getpass.getuser() == 'ricca':
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram') #TODO: change this path when migrating to another platform
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
from api import WikipediaAPI

print(WikipediaAPI.summary('Adolf_Hitler_50th_birthday'))