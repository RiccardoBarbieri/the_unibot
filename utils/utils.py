from datetime import datetime, timedelta, time
from pathlib import Path
import getpass
import re
import requests
import pytz

DAYS = {
    "oggi": -1,
    "today": -1,
    "dopodomani": -3,
    "aftertomorrow": -3,
    "domani": -2,
    "tomorrow": -2,
    "lun": 0,
    "mon": 0,
    "mar": 1,
    "tue": 1,
    "mer": 2,
    "wed": 2,
    "gio": 3,
    "thu": 3,
    "ven": 4,
    "fri": 4,
    "sab": 5,
    "sat": 5,
}


class Utils:
    @staticmethod
    def parse_date(date: str):
        """
        This function parses a date in the format dd*mm*yyyy or d/m/yy or ...
        and returns a date in the format dd/mm/yyyy

        Parameters
        ----------
            date: string
                the date to be parsed

        Returns
        -------
            string
                the parsed date in the format dd/mm/yyyy
        """
        special_chars = [c for c in date if not c.isnumeric()]
        for sc in special_chars:
            date = date.replace(sc, "/")
        if len(special_chars) == 0 or len(special_chars) > 2:
            return None
        date = date.split("/")
        day = date[0]
        month = date[1]
        year = date[-1]
        try:
            if len(date) == 3 and len(year) == 2:
                year = "20" + year
            if len(date) == 2 or len(year) != 4:
                if int(month) < datetime.now().month:
                    year = str(datetime.now().year + 1)
                else:
                    year = str(datetime.now().year)
            if len(month) == 1:
                month = "0" + month
            elif int(month) > 12:
                month = str(datetime.now().month)
            if len(day) == 1:
                day = "0" + day
            elif int(day) > 31:
                day = str(datetime.now().day)
        except:
            return None  # date is not valid
        return day + "/" + month + "/" + year

    @staticmethod
    def parse_time(time_str: str) -> datetime.time:
        """
        This function parses a time in the format hh*mm or h:m or ...
        and returns a time in the format hh:mm

        Parameters
        ----------
            time: string
                the time to be parsed

        Returns
        -------
            datetime.time
                the parsed time in the format hh:mm
        """
        special_chars = [c for c in time_str if not c.isnumeric()]
        for sc in special_chars:
            time_str = time_str.replace(sc, ":")
        if len(special_chars) == 0 or len(special_chars) > 1:
            return None
        time_str = time_str.split(":")
        hours = time_str[0]
        minutes = time_str[-1]
        try:
            if len(hours) == 1:
                hours = "0" + hours
            elif int(hours) > 23:
                hours = str(datetime.now().hour)
            if len(minutes) == 1:
                minutes = "0" + minutes
            elif int(minutes) > 59:
                minutes = str(datetime.now().minute)
        except:
            return None
        return time(int(hours), int(minutes), tzinfo=pytz.timezone("Europe/Rome"))

    @staticmethod
    def to_ISO8601(date: str) -> str:
        """
        This function parses a date to the format yyy-mm-dd

        Parameters
        ----------
            date: string
                the date to be parsed

        Returns
        -------
            string
                the parsed date in the format yyyy-mm-dd
        """
        year = date[-4:]
        day = date[:2]
        month = date[3:5]
        return year + "-" + month + "-" + day

    @staticmethod
    def check_days(string: str):
        """
        This function checks if a string contains a day of the week

        Parameters
        ----------
            string: string
                the string to be checked

        Returns
        -------
            bool
                True if the string contains a day of the week, False otherwise
        """
        days = [
            "oggi",
            "today",
            "domani",
            "tomorrow",
            "dopodomani",
            "aftertomorrow",
            "lun",
            "mar",
            "mer",
            "gio",
            "ven",
            "sab",
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
        ]
        return any(d in string for d in days)

    @staticmethod
    def parse_params(command: str, message: str, which_bot: str) -> dict:
        """
        This function parses the parameters of a command, separating them by spaces

        Parameters
        ----------
            command: string
                the command to be parsed
            message: string
                the message to be parsed
            which_bot: string
                the bot to be parsed

        Returns
        -------
            dict
                a dictionary containing the parsed parameters
        """
        if f"@{which_bot}" in message:
            params = message[len(command + "@" + which_bot) :].split()
        else:
            params = message[len(command) :].split()
        return Utils.parse(params)

    @staticmethod
    def parse(params: list) -> dict:
        """
        This function parses the parameters of a command, separating them in numeric and text

        Parameters
        ----------
            params: list
                the parameters to be parsed

        Returns
        -------
            dict
                a dictionary containing the parsed parameters
        """
        param_parsed = {"numeric": [], "text": []}
        for i in params:
            if i.isnumeric():
                param_parsed["numeric"].append(int(i))
            else:
                param_parsed["text"].append(i)
        return param_parsed

    @staticmethod
    def get_course_type(url: str) -> str:
        """
        This function returns the type of a course from its url

        Parameters
        ----------
            url: string
                the url of the course

        Returns
        -------
            string
                the type of the course
        """
        parts = url.split("/")
        return parts[-2]

    @staticmethod
    def get_course_lang(url: str) -> str:
        """
        This function returns the language of a course from its url

        Parameters
        ----------
            url: string
                the url of the course

        Returns
        -------
            string
                the language of the course (timetable or orario-lezioni)
        """

        if "cycle" in url:
            return "timetable"

        return "orario-lezioni"

    @staticmethod
    def get_course_lang2(url: str):
        """
        This function returns the language of a course from its url

        Parameters
        ----------
            url: string
                the url of the course

        Returns
        -------
            string
                the language of the course (course-structure-diagram or insegnamenti)
        """
        if "cycle" in url:
            return "course-structure-diagram"

        return "insegnamenti"

    @staticmethod
    def string_contains(string: str, params: list) -> bool:
        """
        This function checks if a string contains all the parameters

        Parameters
        ----------
            string: string
                the string to be checked
            params: list
                the parameters to be checked

        Returns
        -------
            bool
                True if the string contains all the parameters, False otherwise
        """
        check = True
        params_lower = [i.lower() for i in params]
        for i in params_lower:
            if not i in string.lower():
                check = False
        return check

    @staticmethod
    def date_from_days(day: str) -> str:
        """
        This function returns the date of a day of the week

        Parameters
        ----------
            day: string
                the day of the week

        Returns
        -------
            string
                the date of the day of the week, formatted with the function Utils.parse_date()
        """
        format_string = "%d-%m-%Y"
        today: datetime.date = datetime.now().date()
        d = [d for d in DAYS.keys() if d in day][0]
        new_date_str = Utils._next_weekday(today, DAYS[d]).strftime(format_string)
        return Utils.parse_date(new_date_str)

    @staticmethod
    def first_difference(string1: str, string2: str) -> int:
        """
        This function returns the index of the first difference between two strings

        Parameters
        ----------
            string1: string
                the first string
            string2: string
                the second string

        Returns
        -------
            int
                the index of the first difference between the two strings
        """
        if len(string1) < len(string2):
            string2 = string2[: len(string1)]
        else:
            string1 = string1[: len(string2)]
        return [i for i in range(len(string1)) if string1[i] != string2[i]][0]

    @staticmethod
    def ip_changed():
        new_ip = requests.get("https://api.ipify.org").text

        with open(Path("./ip/myip.txt"), "r") as f:
            old_ip = f.readline()

        if new_ip != old_ip and (
            getpass.getuser() == "pi" or getpass.getuser() == "riccardoob"
        ):
            with open(Path("./ip/myip.txt"), "w+") as f:
                f.write(new_ip)
        return new_ip

    @staticmethod
    def get_seconds(then_str: str) -> int:
        """
        This function returns the seconds between now and a given time

        Parameters
        ----------
            then_str: string
                the time to be compared with now

        Returns
        -------
            int
                the seconds between now and the given time
        """
        now: datetime = datetime.now()
        then: datetime = datetime.strptime(then_str, "%H:%M")
        return (then - now).seconds

    @staticmethod
    def idiot_time(idiot_time: str) -> str:
        """
        This function returns the time in the format hh:mm

        Parameters
        ----------
            idiot_time: string
                the time to be formatted

        Returns
        -------
            string
                the formatted time
        """
        if (
            re.match("([0-1]?[0-9]|2[0-3]):[0-5][0-9]", idiot_time)
            and len(idiot_time) == 4
        ):
            return "0" + idiot_time

        return idiot_time

    @staticmethod
    def _next_weekday(day, weekday):
        days_ahead = weekday - day.weekday()
        if weekday < 0:
            return day + timedelta(-(weekday + 1))

        if days_ahead <= 0:  # Target day already happened this week
            days_ahead += 7
        return day + timedelta(days_ahead)

    @staticmethod
    def long_mess_fix(message: str) -> str:
        """
        This method is used to fix the message too long error by cutting the message.

        Parameters
        ----------
        message : str
            Contains the message.

        Returns
        -------
        message : str
        """
        message = message[:4095]
        message = message[::-1]
        message = message[message.find(".") :]
        message = message[::-1]
        return message
