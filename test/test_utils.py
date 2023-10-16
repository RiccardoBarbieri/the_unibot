from utils import Utils
from datetime import datetime, timedelta


def test_parse_date():
    """
    This tests if the function Utils.parse_date() works correctly
    GIVEN a date in the format dd*mm*yyyy or d/m/yy or ...
    WHEN the function is called
    THEN it should return a date in the format dd/mm/yyyy"""
    date = "31,12.2023"
    date1 = "12/7|2010"
    date2 = "2-12-22"
    wrong_date = "-2-23"

    assert Utils.parse_date(date) == "31/12/2023"
    assert Utils.parse_date(date1) == "12/07/2010"
    assert Utils.parse_date(date2) == "02/12/2022"
    assert Utils.parse_date(wrong_date) is None


def test_parse_time():
    """
    This tests if the function Utils.parse_time() works correctly
    GIVEN a time in a generic format
    WHEN the function is called
    THEN it should return a time in the format HH:MM"""
    time = "20:00"
    time1 = "2:31"
    wrong_time = "-5"

    assert Utils.parse_time(time) == datetime.time(datetime.strptime(time, "%H:%M"))
    assert Utils.parse_time(time1) == datetime.time(datetime.strptime(time1, "%H:%M"))
    assert Utils.parse_time(wrong_time) is None


def test_to_ISO8601():
    """
    This tests if the function Utils.to_ISO8601() works correctly
    GIVEN a date in the format dd/mm/yyyy
    WHEN the function is called
    THEN it should return a date in the format yyyy-mm-dd

    NOTE: this test is not exhaustive, it only tests a single case
    because the function is always called with a date in the format dd/mm/yyyy"""
    date = "31/12/2020"

    assert Utils.to_ISO8601(date) == "2020-12-31"


def test_check_days():
    """
    This tests if the function Utils.check_days() works correctly
    GIVEN a day
    WHEN the function is called
    THEN it should return True if the day is valid, False otherwise"""
    assert Utils.check_days("oggi") is True
    assert Utils.check_days("today") is True
    assert Utils.check_days("domani") is True
    assert Utils.check_days("tomorrow") is True
    assert Utils.check_days("dopodomani") is True
    assert Utils.check_days("aftertomorrow") is True
    assert Utils.check_days("lun") is True
    assert Utils.check_days("mar") is True
    assert Utils.check_days("mer") is True
    assert Utils.check_days("gio") is True
    assert Utils.check_days("ven") is True
    assert Utils.check_days("sab") is True
    assert Utils.check_days("mon") is True
    assert Utils.check_days("tue") is True
    assert Utils.check_days("wed") is True
    assert Utils.check_days("thu") is True
    assert Utils.check_days("fri") is True
    assert Utils.check_days("sat") is True


def test_parse_params():
    """
    This tests if the function Utils.parse_params() works correctly
    GIVEN a command, a message and a bot name
    WHEN the function is called
    THEN it should return a dictionary containing the parsed parameters"""
    which_bot = "testBOT"

    command = "/start"
    message = "/start"
    params = Utils.parse_params(command, message, which_bot)
    assert params == {"text": [], "numeric": []}

    message = "/start 123"
    params = Utils.parse_params(command, message, which_bot)
    assert params["numeric"] == [123]

    message = f"/start@{which_bot} asd"
    params = Utils.parse_params(command, message, which_bot)
    assert params["text"] == ["asd"]

    command = "/end"
    message = f"/end@{which_bot} 123 test"
    params = Utils.parse_params(command, message, which_bot)
    assert params["numeric"] == [123]
    assert params["text"] == ["test"]


def test_parse():
    """
    This tests if the function Utils.parse() works correctly
    GIVEN a list of parameters
    WHEN the function is called
    THEN it should return a dictionary containing the parsed parameters"""
    params = ["123", "456", "789"]
    parsed = Utils.parse(params)
    assert parsed["numeric"] == [123, 456, 789]

    params = ["test", "parse", "function"]
    parsed = Utils.parse(params)
    assert parsed["text"] == ["test", "parse", "function"]

    params = ["123", "test", "456", "parse", "789", "function"]
    parsed = Utils.parse(params)
    assert parsed["numeric"] == [123, 456, 789]
    assert parsed["text"] == ["test", "parse", "function"]


def test_get_course_type():
    """
    This tests if the function Utils.get_course_type() works correctly
    GIVEN a course url
    WHEN the function is called
    THEN it should return the type of the course"""
    url = "https://www.unibo.it/it/didattica/insegnamenti/insegnamento/2020/435661"
    assert Utils.get_course_type(url) == "2020"


def test_get_course_lang():
    url = (
        "https://www.unibo.it/cycle/second-cycle-degree/curricula/2020/2021/2020Z/2020Z"
    )
    assert Utils.get_course_lang(url) == "timetable"

    url = "https://www.unibo.it/it/didattica/insegnamenti/insegnamento/2020/435661"
    assert Utils.get_course_lang(url) == "orario-lezioni"


def test_get_course_lang2():
    """
    This tests if the function Utils.get_course_lang2() works correctly
    GIVEN a course url
    WHEN the function is called
    THEN it should return the language of the course"""
    url = (
        "https://www.unibo.it/cycle/second-cycle-degree/curricula/2020/2021/2020Z/2020Z"
    )
    assert Utils.get_course_lang2(url) == "course-structure-diagram"

    url = "https://www.unibo.it/it/didattica/insegnamenti/insegnamento/2020/435661"
    assert Utils.get_course_lang2(url) == "insegnamenti"


def test_string_contains():
    """
    This tests if the function Utils.string_contains() works correctly
    GIVEN a string and a list of parameters
    WHEN the function is called
    THEN it should return True if the string contains all the parameters, False otherwise
    """
    string = "test string"
    params = ["test", "string"]
    assert Utils.string_contains(string, params) is True

    string = "test string"
    params = ["test", "string", "test2"]
    assert Utils.string_contains(string, params) is False


def test_date_from_days():
    """
    This tests if the function Utils.date_from_days() works correctly
    GIVEN a day
    WHEN the function is called
    THEN it should return the date of the day"""
    day = "oggi"
    date = Utils.date_from_days(day)
    assert date == datetime.now().strftime("%d/%m/%Y")

    day = "tomorrow"
    date = Utils.date_from_days(day)
    assert date == (datetime.now() + timedelta(days=1)).strftime("%d/%m/%Y")

    day = "dopodomani"
    date = Utils.date_from_days(day)
    assert date == (datetime.now() + timedelta(days=2)).strftime("%d/%m/%Y")


def test_first_difference():
    """
    This tests if the function Utils.first_difference() works correctly
    GIVEN two strings
    WHEN the function is called
    THEN it should return the index of the first difference between the two strings"""
    text1 = "abcdefghij"
    text2 = "abcdeflmno"
    assert Utils.first_difference(text1, text2) == 6


def test_get_seconds():
    """
    This tests if the function Utils.get_seconds() works correctly
    GIVEN a time
    WHEN the function is called
    THEN it should return the seconds until the time"""
    assert (
        Utils.get_seconds("20:00")
        == (datetime.strptime("20:00", "%H:%M") - datetime.now()).seconds
    )


def test_idiot_time():
    """
    This tests if the function Utils.idiot_time() works correctly
    GIVEN a time
    WHEN the function is called
    THEN it should return the time in the format HH:MM"""
    time = "20:00"
    assert Utils.idiot_time(time) == "20:00"
    time = "2:31"
    assert Utils.idiot_time(time) == "02:31"


def test_long_mess_fix():
    """
    This tests if the function Utils.long_mess_fix() works correctly
    GIVEN a message
    WHEN the function is called
    THEN it should return the message with the long words split in '.'
    """
    message = "a" * 3999
    message += "."
    message += "a" * 1000
    assert len(Utils.long_mess_fix(message)) == 4000
