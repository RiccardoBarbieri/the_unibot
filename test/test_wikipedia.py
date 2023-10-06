import sys  # nopep8
sys.path.append('.')  # nopep8
from api.wikipedia import WikipediaAPI

'''
This tests if the function WikipediaAPI.pages() works correctly
GIVEN a query
WHEN the function is called
THEN it should return a dictionary containing the parsed parameters
'''


def test_pages_single_result():
    result = WikipediaAPI.pages('Python (programming language)')
    assert result['single'] == True
    assert result['names'] == 'Python (programming language)'
    assert result['links'] == 'https://en.wikipedia.org/wiki/Python_(programming_language)'


'''
This tests if the function WikipediaAPI.pages() works correctly
GIVEN a query
WHEN the function is called
THEN it should return a dictionary containing the parsed parameters
'''


def test_pages_multiple_results():
    result = WikipediaAPI.pages('Apple')
    assert result['single'] == False
    assert 'Apple' in result['names']
    assert 'https://en.wikipedia.org/wiki/Apple' in result['links']


'''
This tests if the function WikipediaAPI.pages() works correctly
GIVEN a query
WHEN the function is called
THEN it should return a dictionary containing the parsed parameters
'''


def test_pages_no_results():
    result = WikipediaAPI.pages('Rhgbveroihg3eroigbneroingberoin')
    assert result['single'] == False
    assert len(result['names']) == 0
    assert len(result['links']) == 0


'''
This tests if the function WikipediaAPI.summary() works correctly
GIVEN a query
WHEN the function is called
THEN it should return the page summary
'''


def test_summary():
    result = WikipediaAPI.pages('Python (programming language)')
    url = result['links']
    summary = WikipediaAPI.summary(url)
    print(summary)
    assert 'Python is a high-level, general-purpose programming language.' in summary


'''
This tests if the function WikipediaAPI.summary() works correctly
GIVEN a query
WHEN the function is called
THEN it should return the page summary
'''


def test_summary_invalid_page():
    summary = WikipediaAPI.summary('qwertyuiopasdfghjklzxcvbnm')
    assert summary == ''
