import requests
from datetime import datetime
from datetime import timedelta
from pathlib import Path

'''
This class is used to get the weather forecasts using the OpenWeatherMap API.

Attributes
----------
None

Methods
-------
get_weather(city: str, day: int) -> str
    Returns the weather forecast for the specified city and day.
parse_weather(day: int, weather: dict) -> str
    Returns the weather forecast for the specified day.
'''
class WeatherAPI():
    
    '''
    Returns the weather forecast for the specified city and day.
    
    Parameters
    ----------
    city : str
        The city for which the weather forecast is requested.
    day : int
        The day for which the weather forecast is requested.
        
    Returns
    -------
    str
        The weather forecast for the specified city and day.
    '''
    @staticmethod
    def get_weather(city: str, day: int) -> str:
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
            return WeatherAPI.parse_weather(day, weather)
        else:
            return 'Meteo non disponibile'

    '''
    Returns the parsed forecast given weather and day.

    Parameters
    ----------
    day : int
        The day for which the weather forecast is requested.
    weather : dict
        The weather forecast for the specified city and day.
        
    Returns
    -------
    str
        The weather forecast for the specified city and day.
    '''
    @staticmethod
    def parse_weather(day: int, weather: dict) -> str:
        temp_min = int(weather['daily'][0]['temp']['min'])
        temp_max = int(weather['daily'][0]['temp']['max'])
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