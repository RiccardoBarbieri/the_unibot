import pprint
import json
from pathlib import Path
from database.database import Database
from utils.utils import Utils
from typing import Any

class Test():

    def __init__(self, attrs: dict):
        self.__attrs = attrs

    def __getattr__(self, name: str) -> Any:
        return self.__attrs[name]
    

a = Test({'chat_id':1234, 'user_id':4321, 'atosend_time':'23:23'})

print(a.chat_id)