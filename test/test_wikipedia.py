from api.wikipedia import WikipediaAPI


def test_pages_single_result():
    """
    This tests if the function WikipediaAPI.pages() works correctly
    GIVEN a query
    WHEN the function is called
    THEN it should return a dictionary containing the parsed parameters"""

    result = WikipediaAPI.pages("Python (programming language)")
    assert result["single"] is True
    assert result["names"] == "Python (programming language)"
    assert (
        result["links"] == "https://en.wikipedia.org/wiki/Python_(programming_language)"
    )


def test_pages_multiple_results():
    """
    This tests if the function WikipediaAPI.pages() works correctly
    GIVEN a query
    WHEN the function is called
    THEN it should return a dictionary containing the parsed parameters"""
    result = WikipediaAPI.pages("Apple")
    assert result["single"] is False
    assert "Apple" in result["names"]
    assert "https://en.wikipedia.org/wiki/Apple" in result["links"]


def test_pages_no_results():
    """
    This tests if the function WikipediaAPI.pages() works correctly
    GIVEN a query
    WHEN the function is called
    THEN it should return a dictionary containing the parsed parameters"""
    result = WikipediaAPI.pages("Rhgbveroihg3eroigbneroingberoin")
    assert result["single"] is False
    assert len(result["names"]) == 0
    assert len(result["links"]) == 0


def test_summary():
    """
    This tests if the function WikipediaAPI.summary() works correctly
    GIVEN a query
    WHEN the function is called
    THEN it should return the page summary"""
    result = WikipediaAPI.pages("Python (programming language)")
    url = result["links"]
    summary = WikipediaAPI.summary(url)
    print(summary)
    assert "Python is a high-level, general-purpose programming language." in summary
