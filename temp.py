import pprint
import json
from pathlib import Path
from database.database import Database
from utils.utils import Utils
from typing import Any
from mysql import connector
from mysql.connector.connection import CursorBase
import requests



list1 = [1234, 4321]

list2 = ['123']

list1 += list2

print(list1)


