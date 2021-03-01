from selenium.webdriver.remote.webelement import WebElement
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
import time
from math import ceil
from pprint import pprint

def dec(i: float):
    return i - int(i)

url = 'https://www.unibo.it/it/didattica/corsi-di-studio'
chrome_driver_path = '.\\chromedriver.exe'

# chrome_options.add_argument('--headless')
driver = webdriver.Chrome(executable_path = chrome_driver_path)

driver.get(url)

parent_div = driver.find_element_by_xpath('//*[@id="results"]/div[2]')
count_of_tabs = len(parent_div.find_elements_by_xpath("./div"))


init_height = driver.execute_script("return document.body.scrollHeight")

for i in range(1, count_of_tabs + 1):
    driver.execute_script('var init_height = arguments[0]; window.scrollTo(0,window.scrollY + document.body.scrollHeight - init_height);', init_height)
    driver.find_element_by_xpath('//*[@id="results"]/div[2]/h2['+ str(i) +']/button').click()
    time.sleep(2)
    
driver.execute_script('window.scrollTo(0,0)')

count_of_rows = []
for i in range(1, count_of_tabs + 1):
    parent_div = driver.find_element_by_xpath('//*[@id="panel' + str(i) + '"]/div')
    count_of_rows.append(len(parent_div.find_elements_by_xpath('./div')) / 3.0)


cards_by_tabs = {}

for i, k in zip(count_of_rows, range(1, count_of_tabs + 1)):
    tab_name = driver.find_element_by_xpath('//*[@id="results"]/div[2]/h2[' + str(k) + ']/button/span[1]').text
    cards_by_tabs[tab_name] = []
    for j in range(1, ceil(i) + 1):
        try:
            index = j * 3
            cards_by_tabs[tab_name].append(driver.find_element_by_xpath('//*[@id="panel' + str(k) + '"]/div/div[' + str(index - 2) + ']'))
            cards_by_tabs[tab_name].append(driver.find_element_by_xpath('//*[@id="panel' + str(k) + '"]/div/div[' + str(index - 1) + ']'))
            cards_by_tabs[tab_name].append(driver.find_element_by_xpath('//*[@id="panel' + str(k) + '"]/div/div[' + str(index) + ']'))
        except NoSuchElementException:
            pass
        driver.execute_script('window.scrollBy(0,250)')
    driver.execute_script('window.scrollBy(0,45)')

def parse_card(web_element: WebElement) -> dict:
    parsed = {}
    #nome corso string
    #codice corso int?string
    #campus string
    #internazionale bool
    #accesso string
    #lingua list of strings
    #curriculas list of strings
    #sito string
    parsed['course_name'] = web_element.find_element_by_xpath('a/div[2]/div/h3').text.strip()
    parsed['course_code'] = web_element.find_element_by_xpath('a/div[2]/div/span').text[-5:].strip()
    parsed['campus'] = web_element.find_element_by_xpath('a/div[2]/div/p').text[6:].strip()
    html = web_element.get_attribute('innerHTML')
    parsed['international'] = (html.find('internazionale') != -1)
    access = web_element.find_element_by_xpath('div[2]/p[1]').get_attribute('innerHTML').strip()
    parsed['access'] = access[access.find(':') + 1:].strip()
    langs = web_element.find_element_by_xpath('div[2]/p[3]').get_attribute('innerHTML')
    langs = langs[langs.find(':') + 1:].strip()
    parsed['languages'] = langs.split(',')
    ul = web_element.find_element_by_xpath('div[2]/ul')
    lis = ul.find_elements_by_xpath("./li")
    curriculas = []
    for i in lis:
        curriculas.append(i.get_attribute('innerHTML').strip())
    parsed['curriculas'] = curriculas
    parsed['site'] = web_element.find_element_by_xpath('div[2]/p[5]/a').get_attribute('href')
    return parsed
