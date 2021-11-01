from selenium.webdriver.remote.webelement import WebElement
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time
from math import ceil
from pprint import pprint
import json
from pathlib import Path

def dec(i: float):
    return i - int(i)

class CourseParser():

    url = 'https://www.unibo.it/it/didattica/corsi-di-studio'
    chrome_driver_path = '.\\chromedriver.exe'

    name_error = 0 # TODO: delete
    code_error = 0
    campus_error = 0
    international_error = 0
    access_error = 0
    lang_error = 0
    curriculas_error = 0
    site_error = 0
    names = []
    

    count_of_rows = []

    cards_by_tabs = {}
    parsed_cards_by_tabs = {}

    def __init__(self):
            
        self.driver = webdriver.Chrome(executable_path = self.chrome_driver_path)
        
        self.driver.get(self.url)
        self.init_height = self.driver.execute_script('return document.body.scrollHeight')

        self.__count_tabs()

        for i in range(1, self.num_tabs + 1):
            self.driver.execute_script('var init_height = arguments[0]; window.scrollTo(0,window.scrollY + document.body.scrollHeight - init_height);', self.init_height)
            self.driver.find_element_by_xpath('//*[@id="results"]/div[2]/h2['+ str(i) +']/button').click()
            time.sleep(2)
        
        self.driver.execute_script('window.scrollTo(0,0)')

        for i in range(1, self.num_tabs + 1):
            parent_div = self.driver.find_element_by_xpath('//*[@id="panel' + str(i) + '"]/div')
            self.count_of_rows.append(len(parent_div.find_elements_by_xpath('./div')) / 3.0)
        
        for i, k in zip(self.count_of_rows, range(1, self.num_tabs + 1)):
            tab_name = self.driver.find_element_by_xpath('//*[@id="results"]/div[2]/h2[' + str(k) + ']/button/span[1]').text
            self.cards_by_tabs[tab_name] = []
            for j in range(1, ceil(i) + 1):
                try:
                    index = j * 3
                    self.cards_by_tabs[tab_name].append(self.driver.find_element_by_xpath('//*[@id="panel' + str(k) + '"]/div/div[' + str(index - 2) + ']'))
                    self.cards_by_tabs[tab_name].append(self.driver.find_element_by_xpath('//*[@id="panel' + str(k) + '"]/div/div[' + str(index - 1) + ']'))
                    self.cards_by_tabs[tab_name].append(self.driver.find_element_by_xpath('//*[@id="panel' + str(k) + '"]/div/div[' + str(index) + ']'))
                except NoSuchElementException:
                    pass
                self.driver.execute_script('window.scrollBy(0,250)')
            self.driver.execute_script('window.scrollBy(0,48)')
        
        self.parse_all_cards()
        self.print_errors()

    
    def __count_tabs(self) -> None:
        parent_div = self.driver.find_element_by_xpath('//*[@id="results"]/div[2]')
        self.num_tabs = len(parent_div.find_elements_by_xpath('./div')) # number of tabs (course category)
    
    
    def parse_all_cards(self) -> None:
        temp = 0
        for i in self.cards_by_tabs.keys():
            self.parsed_cards_by_tabs[i] = []
            for j in self.cards_by_tabs[i]:
                temp += 1
                self.parsed_cards_by_tabs[i].append(self.parse_card(j).copy())
                print(temp)

    def get_parsed_cards(self) -> dict:
        return self.parsed_cards_by_tabs

    def parse_card(self, web_element: WebElement) -> dict:
        parsed = {}
        #nome corso string
        #codice corso int?string
        #campus string
        #internazionale bool
        #accesso string
        #lingua list of strings
        #curriculas list of strings
        #sito string
        try:
            parsed['course_name'] = web_element.find_element_by_xpath('a/div[2]/div/h3').text.strip()
        except NoSuchElementException:
            self.name_error += 1
        try:
            parsed['course_code'] = web_element.find_element_by_xpath('a/div[2]/div/span').text[-5:].strip()
        except NoSuchElementException:
            self.code_error += 1
        try:
            parsed['campus'] = web_element.find_element_by_xpath('a/div[2]/div/p').text[8:].strip()
        except NoSuchElementException:
            self.campus_error += 1
        try:
            html = web_element.get_attribute('innerHTML')
            parsed['international'] = (html.find('internazionale') != -1)
        except NoSuchElementException:
            self.international_error +=1
        try:
            access = web_element.find_element_by_xpath('div[2]/p[1]').get_attribute('innerHTML').strip()
            parsed['access'] = access[access.find(':') + 1:].strip()
        except NoSuchElementException:
            self.access_error += 1
        try:
            langs = web_element.find_element_by_xpath('div[2]/p[3]').get_attribute('innerHTML')
            langs = langs[langs.find(':') + 1:].strip()
            parsed['languages'] = langs.split(',')
        except NoSuchElementException:
            self.lang_error += 1
        try:
            ul = web_element.find_element_by_xpath('div[2]/ul')
            lis = ul.find_elements_by_xpath("./li")
            curriculas = []
            for i in lis:
                curriculas.append(i.get_attribute('innerHTML').strip())
            parsed['curriculas'] = curriculas
        except NoSuchElementException:
            self.curriculas_error += 1
        try:
            parsed['site'] = web_element.find_element_by_xpath('div[2]/p[5]/a').get_attribute('href')
        except NoSuchElementException:
            try:
                parsed['site'] = web_element.find_element_by_xpath('div[2]/p[4]/a').get_attribute('href')
            except NoSuchElementException:
                try:
                    parsed['site'] = web_element.find_element_by_xpath('div[2]/p[6]/a').get_attribute('href')
                except NoSuchElementException:
                    self.site_error += 1
                    self.names.append(parsed['course_name'])
        return parsed
    
    def print_errors(self):
        print('names = ' + str(self.name_error))
        print('codes = ' + str(self.code_error))
        print('campus = ' + str(self.campus_error))
        print('international = ' + str(self.international_error))
        print('access = ' + str(self.access_error))
        print('lang = ' + str(self.lang_error))
        print('curriculas = ' + str(self.curriculas_error))
        print('site = ' + str(self.site_error))
        print(self.names)
    
# if __name__ == '__main__':

#     a = CourseParser()

#     with open('courses.json', 'w+') as f:
#         json.dump(a.get_parsed_cards(), f)

#     print('fine')
