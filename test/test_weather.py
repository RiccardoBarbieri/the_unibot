import sys  # nopep8
sys.path.append('.')  # nopep8
from api.weather import WeatherAPI
import os
import pytest

'''
This tests if the function WeatherAPI.get_weather() works correctly
GIVEN a city name
WHEN the function is called
THEN it should return a string containing the weather information
'''


@pytest.mark.skipif(not os.path.isfile('keys/weather.txt'), reason='No API key found')
def test_get_weather():
    result = WeatherAPI.get_weather('Rome', 0, 'en')
    assert isinstance(result, str)
    assert len(result) > 0


'''
This tests if the function WeatherAPI.parse_weather() works correctly
GIVEN a weather dictionary
WHEN the function is called
THEN it should return a string containing the weather information
'''


def test_parse_weather():
    weather = {
        'daily': [
            {
                'temp': {
                    'min': 10,
                    'max': 20
                },
                'weather': [
                    {
                        'description': 'sunny'
                    }
                ]
            }
        ]
    }
    result = WeatherAPI.parse_weather(weather, 'en')
    assert isinstance(result, str)
    assert len(result) > 0
