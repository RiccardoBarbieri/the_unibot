import requests
from pathlib import Path
import json


class WeatherAPI:
    """
    This class is used to get the weather forecasts using the OpenWeatherMap API.

    Attributes
    ----------
    None

    Methods
    -------
    get_weather(city: str, day: int) -> str
        Returns the weather forecast for the specified city and day.
    parse_weather(day: int, weather: dict) -> str
        Returns the weather forecast for the specified day."""

    @staticmethod
    def get_weather(city: str, day: int, lang: str) -> str:
        """
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
        """
        with open(Path("./keys/weather.txt")) as f:
            api_key = f.readline()
        coords_url = "https://api.openweathermap.org/data/2.5/weather?&appid={key}&q={city}&units=metric".format(
            key=api_key, city=city
        )
        response = requests.get(coords_url)
        coords = response.json()
        if coords["cod"] != 401:
            lat = coords["coord"]["lat"]
            lon = coords["coord"]["lon"]
            weather_url = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={key}&units=metric&lang={lang}&exclude=minutely,hourly".format(
                lat=lat, lon=lon, key=api_key, lang=lang
            )
            response = requests.get(weather_url)
            weather = response.json()
            return WeatherAPI.parse_weather(weather, lang)
        else:
            with open(Path("./resources/lang.json")) as file:
                msg = json.load(file)
            return msg["error_404"][lang]

    @staticmethod
    def parse_weather(weather: dict, lang: str) -> str:
        """
        Returns the parsed forecast given weather and day.

        Parameters
        ----------
        city : str
            The city for which the weather forecast is requested.
        day : int
            The day for which the weather forecast is requested.
        weather : dict
            The weather forecast for the specified city and day.
        lang : str
            The language of the message.

        Returns
        -------
        str
            The weather forecast for the specified city and day.
        """
        temp_min = int(weather["daily"][0]["temp"]["min"])
        temp_max = int(weather["daily"][0]["temp"]["max"])
        description = weather["daily"][0]["weather"][0]["description"]
        with open(Path("./resources/lang.json")) as file:
            msg = json.load(file)
        message = (
            msg["weather"][lang]
            + description.capitalize()
            + "\nMin "
            + str(temp_min)
            + "°C - Max "
            + str(temp_max)
            + "°C"
        )
        return message
