from logging import exception
import re
from database.database import Database
from utils.utils import Utils
from pprint import pprint

db = Database('./database/telegram.db')

curriculas = db.query_all('curriculas')
curricula_regex = '^([A-Z0-9]){3}-([A-Z0-9]){3}$'