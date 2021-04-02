import pprint
import json
from pathlib import Path
from database.database import Database
from utils.utils import Utils
from typing import Any
from mysql import connector
from mysql.connector.connection import CursorBase
import requests


dic = {}


