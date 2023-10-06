import sys # nopep8
sys.path.append('.') # nopep8
from utils.message_creator import MessageCreator

# write tests using pytest

def test_create_message():
    schedule = {
        'title': 'Math 101',
        'time': '9:00 AM',
        'location': 'Room 101',
        'cfu': 6,
        'docente': 'Jane Smith',
        'teams': 'https://teams.com/meeting',
        'teledidattica': 'false'
    }
    lang = 'en'
    lvl = 3

    expected_message = '9:00 AM\nMath 101\nCFU: 6\nProfessor: Jane Smith\nPlace: Room 101\nLecture link'
    expected_message += '\n<a href="https://teams.com/meeting">Lecture link</a>'
    message = MessageCreator.create_message(schedule, lvl, lang)
    assert message == expected_message

# import unittest
# from unittest.mock import mock_open, patch
# from u
# class TestMessageCreator(unittest.TestCase):
#     def test_create_message(self):
#         schedule = {
#             'title': 'Math 101',
#             'time': '9:00 AM',
#             'location': 'Room 101',
#             'cfu': 6,
#             'professor': 'John Doe',
#             'docente': 'Jane Smith',
#             'teams': 'https://teams.com/meeting',
#             'teledidattica': 'https://teledidattica.com/meeting'
#         }
#         lang = 'en'
#         lvl = 3

#         expected_message = '9:00 AM\nMath 101\nCFU: 6\nProfessor: John Doe\nJane Smith\nPlace: Room 101\nOnline lecture: https://teledidattica.com/meeting'
#         expected_message += '\n<a href="https://teams.com/meeting">Lecture link</a>'

#         with patch('builtins.open', mock_open(read_data='{"place": {"en": "Place:"}, "professor": {"en": "Professor:"}, "online_lecture": {"en": "Online lecture:"}, "lecture_link": {"en": "Lecture link"}}')):
#             message = MessageCreator.create_message(schedule, lvl, lang)
#             self.assertEqual(message, expected_message)

# if __name__ == '__main__':
#     unittest.main()