import pprint
import json
from pathlib import Path
from database.database import Database
from utils.utils import Utils
from typing import Any

class Test():

    def __init__(self, attrs: dict):
        self.__dict__.update(attrs) # comment to use __getattr__
        # self.__attrs = attrs # uncomment to use __getattr__

    # def __getattr__(self, name: str) -> Any: # uncomment to use __getattr__
    #     return self.__attrs[name] 
    

a = Test({'chat_id':1234, 'user_id':4321, 'atosend_time':'23:23'})

print(a.chat_id)

-1001430472485, # gruppo amici greg
-1001404621927, # testiamolo

131125356 # io
913871757 # greg