from datetime import date
from datetime import datetime
from datetime import timedelta
from datetime import time
from pathlib import Path
import requests
import getpass


class Utils():

    @staticmethod
    def parse_date(date: str):
        year = date[-4:]
        day = date[:2]
        month = date[3:5]
        return year + '-' + month + '-' + day

    @staticmethod
    def check_days(string: str):
        days = ['oggi', 'domani', 'dopodomani']
        return string in days

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
    def string_contains(string, params):
        check = True
        for i in params:
            if not (i in string.lower()):
                check = False
        return check

    @staticmethod
    def date_from_days(day: str) -> str:
        format_string = '%d-%m-%Y'
        today: date = datetime.now().date()
        if day == 'oggi':
            new_date_str = today.strftime(format_string)
        elif day == 'domani':
            tomorrow = today + timedelta(days=1)
            new_date_str = tomorrow.strftime(format_string)
        elif day == 'dopodomani':
            tdat = today + timedelta(days=2)
            new_date_str = tdat.strftime(format_string)
        return Utils.parse_date(new_date_str)

    @staticmethod
    def first_difference(string1: str, string2: str):
        if (len(string1) < len(string2)):
            string2 = string2[:len(string1)]
        else:
            string1 = string1[:len(string2)]
        return [i for i in range(len(string1)) if string1[i] != string2[i]][0]

    @staticmethod
    def get_weather(city: str, day: int):
        with open(Path('./keys/weather.txt')) as f:
            api_key = f.readline()
        coords_url = "https://api.openweathermap.org/data/2.5/weather?&appid={key}&q={city}&units=metric".format(key = api_key, city = city)
        response = requests.get(coords_url)
        coords = response.json()
        if coords['cod'] != 401:
            lat = coords['coord']['lat']
            lon = coords['coord']['lon']
            weather_url = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={key}&units=metric&exclude=minutely,hourly'.format(lat = lat, lon = lon, key = api_key)
            response = requests.get(weather_url)
            weather = response.json()
            return Utils.parse_weather(day, weather)
        else:
            return 'Meteo non disponibile'

    @staticmethod
    def parse_weather(day: int, weather: dict):
        temp_min = weather['daily'][0]['temp']['min']
        temp_max = weather['daily'][0]['temp']['max']
        description = weather['daily'][0]['weather'][0]['main']
        today = datetime.now().date()
        date = ''
        if day == 0:
            date = today.strftime('%d-%m-%Y').replace('-', '/')
        elif day == 1:
            tomorrow = today + timedelta(days=1)
            date = tomorrow.strftime('%d-%m-%Y').replace('-', '/')
        else:
            return None  # will never happen
        message = date + '\nWeather: ' + description.lower() + '\nMin ' + str(temp_min) + \
            '°C - Max ' + str(temp_max) + '°C'
        return message

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
