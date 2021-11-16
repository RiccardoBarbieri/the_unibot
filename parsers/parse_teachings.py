import json
import os
from bs4 import BeautifulSoup



if __name__ == '__main__':
    course_file = os.listdir("./resources/teachings")

    for file_name in course_file:
        with open("./resources/teachings/" + file_name, "r") as f:
            soup = BeautifulSoup(f, "html.parser")
        
        print(soup.find_all("link")[2]["href"])
        
        teachings = soup.find_all("tr")
        for i in teachings:
            