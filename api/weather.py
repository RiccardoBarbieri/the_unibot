import requests
from datetime import datetime
from pathlib import Path

class WeatherAPI():
    
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
            weather_url = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={key}&units=metric&lang=it&exclude=minutely,hourly'.format(lat = lat, lon = lon, key = api_key)
            response = requests.get(weather_url)
            weather = response.json()
            return Weather.parse_weather(day, weather)
        else:
            return 'Meteo non disponibile'

    @staticmethod
    def parse_weather(day: int, weather: dict):
        temp_min = weather['daily'][0]['temp']['min']
        temp_max = weather['daily'][0]['temp']['max']
        description = weather['daily'][0]['weather'][0]['description']
        today = datetime.now().date()
        date = ''
        if day == 0:
            date = today.strftime('%d-%m-%Y').replace('-', '/')
        elif day == 1:
            tomorrow = today + timedelta(days=1)
            date = tomorrow.strftime('%d-%m-%Y').replace('-', '/')
        else:
            return ''  # will never happen
        message = date + '\nMeteo: ' + description.lower() + '\nMin ' + str(temp_min) + \
            '°C - Max ' + str(temp_max) + '°C'
        return message