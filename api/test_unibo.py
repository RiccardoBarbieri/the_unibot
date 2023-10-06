import sys  # nopep8
sys.path.append('.')  # nopep8
from api.unibo import UniboAPI

'''
This tests if the function UniboAPI.get_orario() works correctly
GIVEN a course name, a course type, a course year, a course language, a date and a classroom
WHEN the function is called
THEN it should return a list of lessons
'''
def test_get_orario_result():
    result = UniboAPI.get_orario(
        'matematica', 'magistrale', '1', 'orario-lezioni', '2023-10-06', '399-000')
    assert isinstance(result, list)
    assert len(result) > 0

'''
This tests if the function UniboAPI.get_orario() works correctly
GIVEN a course name, a course type, a course year, a course language, a date and a classroom
WHEN the function is called
THEN it should return an empty list
'''
def test_get_orario_no_results():
    result = UniboAPI.get_orario(
        'Ingegneria del Software', 'laurea-magistrale', '2021', 'it', '2021-10-01', '000-002')
    assert isinstance(result, dict)
    assert len(result) == 0
