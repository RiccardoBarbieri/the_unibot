from datetime import date
from datetime import datetime
from datetime import timedelta
from pathlib import Path
import requests
import getpass
import re

DAYS = {'oggi': -1, 'today': -1, 'dopodomani': -3, 'aftertomorrow': -3, 'domani': -2,
        'tomorrow': -2, 'lun': 0, 'mon': 0, 'mar': 1, 'tue': 1, 'mer': 2, 'wed': 2, 'gio': 3, 'thu': 3, 'ven': 4, 'fri': 4, 'sab': 5, 'sat': 5}


class Utils():

    @staticmethod
    def parse_date(date: str):
        special_chars = [c for c in date if not c.isnumeric()]
        for sc in special_chars:
            date = date.replace(sc, '/')
        if len(special_chars) == 0 or len(special_chars) > 2:
            return None
        date = date.split('/')
        day = date[0]
        month = date[1]
        year = date[-1]
        if len(date) == 3 and len(year) == 2:
            year = '20' + year
        if len(date) == 2 or len(year) != 4:
            if int(month) < datetime.now().month:
                year = str(datetime.now().year + 1)
            else:
                year = str(datetime.now().year)
        if len(month) == 1:
            month = '0' + month
        elif int(month) > 12:
            month = str(datetime.now().month)
        if len(day) == 1:
            day = '0' + day
        elif int(day) > 31:
            day = str(datetime.now().day)
        return day + '/' + month + '/' + year

    @staticmethod
    def to_ISO8601(date: str) -> str:
        year = date[-4:]
        day = date[:2]
        month = date[3:5]
        return year + '-' + month + '-' + day

    @staticmethod
    def check_days(string: str):
        days = ['oggi', 'today', 'domani', 'tomorrow', 'dopodomani', 'aftertomorrow', 'lun',
                'mar', 'mer', 'gio', 'ven', 'sab', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        return any(d in string for d in days)

    @staticmethod
    def parse_params(command: str, message: str, which_bot: str):
        if '@{bot}'.format(bot=which_bot) in message:
            params = message[len(command + '@' + which_bot):].split()
        else:
            params = message[len(command):].split()
        return Utils.parse(params)

    @staticmethod
    def parse(params: list):
        param_parsed = {'numeric': [], 'text': []}
        for i in params:
            if i.isnumeric():
                param_parsed['numeric'].append(int(i))
            else:
                param_parsed['text'].append(i)
        return param_parsed

    @staticmethod
    def get_course_type(url: str):
        parts = url.split('/')
        return parts[-2]

    @staticmethod
    def get_course_lang(url: str):
        if 'cycle' in url:
            return 'timetable'
        else:
            return 'orario-lezioni'

    @staticmethod
    def get_course_lang2(url: str):
        if 'cycle' in url:
            return 'course-structure-diagram'
        else:
            return 'insegnamenti'

    @staticmethod
    def string_contains(string, params):
        check = True
        params_lower = [i.lower() for i in params]
        for i in params_lower:
            if not (i in string.lower()):
                check = False
        return check

    @staticmethod
    def date_from_days(day: str) -> str:
        format_string = '%d-%m-%Y'
        today: date = datetime.now().date()
        d = [d for d in DAYS.keys() if d in day][0]
        new_date_str = Utils._next_weekday(
            today, DAYS[d]).strftime(format_string)
        return Utils.parse_date(new_date_str)

    @staticmethod
    def first_difference(string1: str, string2: str):
        if (len(string1) < len(string2)):
            string2 = string2[:len(string1)]
        else:
            string1 = string1[:len(string2)]
        return [i for i in range(len(string1)) if string1[i] != string2[i]][0]

    @staticmethod
    def ip_changed():
        new_ip = requests.get('https://api.ipify.org').text

        with open(Path('./ip/myip.txt'), 'r') as f:
            old_ip = f.readline()

        if new_ip != old_ip and (getpass.getuser() == 'pi' or getpass.getuser() == 'riccardoob'):
            with open(Path('./ip/myip.txt'), 'w+') as f:
                f.write(new_ip)
        return new_ip

    @staticmethod
    def get_seconds(then_str: str):
        now: datetime = datetime.now()
        then: datetime = datetime.strptime(then_str, '%H:%M')
        return (then - now).seconds

    @staticmethod
    def idiot_time(idiot_time: str) -> str:
        if re.match('([0-1]?[0-9]|2[0-3]):[0-5][0-9]', idiot_time) and len(idiot_time) == 4:
            return '0' + idiot_time
        else:
            return idiot_time

    @staticmethod
    def _next_weekday(day, weekday):
        days_ahead = weekday - day.weekday()
        if weekday < 0:
            return day + timedelta(-(weekday + 1))
        else:
            if days_ahead <= 0:  # Target day already happened this week
                days_ahead += 7
            return day + timedelta(days_ahead)
