from utils.message_creator import MessageCreator

FAKE_SCHEDULE1 = {
    "title": "Math 101",
    "time": "9:00 AM",
    "location": "Room 101",
    "cfu": 6,
    "docente": "Jane Smith",
    "teams": "https://teams.com/meeting",
    "teledidattica": "false",
}

FAKE_SCHEDULE2 = {
    "title": "Math 101",
    "time": "9:00 AM",
    "location": "Room 101",
    "cfu": 6,
    "docente": "Jane Smith",
    "teams": "https://teams.com/meeting",
    "teledidattica": "True",
}


def test_lvl1_message():
    """
    This tests the creation of a message with level 1
    GIVEN a schedule
    WHEN the function create_message is called with level 1
    THEN the message is created correctly"""
    lang = "en"
    lvl = 1

    expected_message = "9:00 AM\nMath 101"
    message = MessageCreator.create_message(FAKE_SCHEDULE1, lvl, lang)
    assert message == expected_message


def test_lvl2_message():
    """
    This tests the creation of a message with level 2
    GIVEN a schedule
    WHEN the function create_message is called with level 2
    THEN the message is created correctly"""
    lang = "it"
    lvl = 2

    expected_message = '9:00 AM\nMath 101\nLuogo: Room 101\n<a href="https://teams.com/meeting">Link lezione</a>'
    message = MessageCreator.create_message(FAKE_SCHEDULE1, lvl, lang)
    assert message == expected_message


def test_lvl3_message():
    """
    This tests the creation of a message with level 3
    GIVEN a schedule
    WHEN the function create_message is called with level 3
    THEN the message is created correctly"""
    lang = "en"
    lvl = 3

    expected_message = '9:00 AM\nMath 101\nCFU: 6\nProfessor: Jane Smith\nPlace: Room 101\n<a href="https://teams.com/meeting">Lecture link</a>'
    message = MessageCreator.create_message(FAKE_SCHEDULE1, lvl, lang)
    assert message == expected_message


def test_lvl3_message_with_online_lecture():
    """
    This tests the creation of a message with level 3 and online lecture
    GIVEN a schedule with online lecture
    WHEN the function create_message is called with level 3
    THEN the message is created correctly"""

    lang = "it"
    lvl = 3

    expected_message = '9:00 AM\nMath 101\nCFU: 6\nDocente: Jane Smith\nLuogo: Room 101\n<b>Questa lezione è solo online.</b>\n<a href="https://teams.com/meeting">Link lezione</a>'
    message = MessageCreator.create_message(FAKE_SCHEDULE2, lvl, lang)
    assert message == expected_message
