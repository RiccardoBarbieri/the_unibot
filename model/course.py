from __future__ import annotations
from exceptions import ParameterError

from typing import Dict

import sys  # nopep8

sys.path.append(".")  # nopep8


class Course:

    """
    Describes a course, it contains all the properties that a course
    has, obtainable through dedicated getters. The attributes of an
    instance of this class should not be modified, create a new instance
    instead.

    Note
    ----
    To create an instance of this class one must provide the attributes
    of the course separately or the from_dict that maps them, NOT BOTH.

    Note
    ----
    Set from_table parameter to False only if the from_dict parameter does
    not have keys formatted like \'table.attribute\'. You have to do this if the
    from_dict keys are of the format \'attribute\'.

    Parameters
    ----------
    name: str, optional
        The name of the course.
    code: str, optional
        The code of the course (as string, certain codes have a 0 as first
        character).
    campus: str, optional
        The campus of the course.
    international: int, optional
        An boolean integer (to adapt to most SQL implementations)
        representing whether the course is international or not.
    access: str, optional
        The description of the access methods for the course.
    site: str, optional
        The url of the course.
    codec: str, optional
        The codec of the course, the last element of site's url.
    from_dict: Dict[str, str | int], optional
        A mapping of the same attributes above.
    from_table: bool
        True if the dict comes from a sql query and has keys like
        table.attribute.

    Attributes
    ----------
    __name: str
        The name of the course.
    __code: str
        The code of the course (as string, certain codes have a 0 as first
        character).
    __campus: str
        The campus of the course.
    __international: int
        Boolean integer representing whether the course is
        international or not.
    __access: str
        The description of the access methods for the course.
    __site: str
        The url of the course.
    __codec: str
        The codec of the course, the last element of site's url.
    __from_table: bool, dafault True
        True if the dict comes from a sql query and has keys like
        table.attribute.

    Raises
    ------
    TypeError
        If one or more of the parameters provided are not of
        the correct type, whether they come from single parameter
        or from_dict.
    ParameterError
        If the single parameters are not None and so is from_dict
        or viceversa, also raised when from_dict does not respect
        specification for its keys.
    """

    __name: str
    __code: str
    __campus: str
    __international: int  # bool
    __access: str
    __site: str
    __codec: str
    __from_table: bool

    def __init__(
        self,
        name: str = None,
        code: str = None,
        campus: str = None,
        international: int = None,
        access: str = None,
        site: str = None,
        codec: str = None,
        from_dict: Dict[str, str | int] = None,
        from_table: bool = True,
    ):
        self.__from_table = from_table
        if (not from_dict) and (
            name and code and campus and international and access and site and codec
        ):
            if (
                (not isinstance(name, str))
                or (not isinstance(code, str))
                or (not isinstance(campus, str))
                or (not isinstance(international, int))
                or (not isinstance(access, str))
                or (not isinstance(site, str))
                or (not isinstance(codec, str))
            ):
                raise TypeError("One or more attributes are not of the correct type.")
            self.__name = name
            self.__code = code
            self.__campus = campus
            self.__international = international
            self.__access = access
            self.__site = site
            self.__codec = codec
        elif (from_dict) and (
            (not name)
            and (not code)
            and (not campus)
            and (not international)
            and (not access)
            and (not site)
            and (not codec)
        ):
            keys_table_column = True
            for i in from_dict.keys():
                if not (i.split(".") == 2):
                    keys_table_column = False
            if not keys_table_column and self.__from_table:
                raise ParameterError(
                    "The keys of from_dict must be of type 'table.attribute' if from_table is True"
                )
            elif keys_table_column and not self.__from_table:
                raise ParameterError(
                    "The keys of from dict must be of type 'attribute' if from_table is False"
                )
            elif keys_table_column and self.__from_table:
                for i in from_dict.keys():
                    attr = i.split(".")[1]
                    from_dict[attr] = from_dict.pop(i)
            try:
                if (
                    (not isinstance(from_dict["name"], str))
                    or (not isinstance(from_dict["code"], str))
                    or (not isinstance(from_dict["campus"], str))
                    or (not isinstance(from_dict["international"], int))
                    or (not isinstance(from_dict["access"], str))
                    or (not isinstance(from_dict["site"], str))
                    or (not isinstance(from_dict["codec"], str))
                ):
                    raise TypeError(
                        "One or more attributes are not of the correct type."
                    )
                self.__name = from_dict["name"]
                self.__code = from_dict["code"]
                self.__campus = from_dict["campus"]
                self.__international = from_dict["international"]
                self.__access = from_dict["access"]
                self.__site = from_dict["site"]
                self.__codec = from_dict["codec"]
            except KeyError as e:
                raise ParameterError(
                    "{key} is not a valid Course attribute.".format(key=e)
                )
        else:
            raise ParameterError(
                "The single parameters must be provided only if from_dict isn't (or viceversa)."
            )

    def get_name(self) -> str:
        """
        Getter for the name attribute.

        Returns
        -------
        str
            The name of the course.

        """
        return self.__name

    def get_code(self) -> str:
        """
        Getter for the code attribute.

        Returns
        -------
        str
            The code of the course.

        """
        return self.__code

    def get_campus(self) -> str:
        """
        Getter for the campus attribute.

        Returns
        -------
        str
            The campus of the course.

        """
        return self.__campus

    def get_international(self) -> bool:
        """
        Getter for the international attribute.

        Returns
        -------
        bool
            True if the course is international.
        """
        return bool(self.__international)

    def get_access(self) -> str:
        """
        Getter for the access attribute.

        Returns
        -------
        str
            The access of the course.

        """
        return self.__access

    def get_site(self) -> str:
        """
        Getter for the site attribute.

        Returns
        -------
        str
            The site of the course.

        """
        return self.__site

    def get_codec(self) -> str:
        """
        Getter for the codec attribute.

        Returns
        -------
        str
            The codec of the course.

        """
        return self.__codec

    def __str__(self) -> str:
        string = "Nome: " + self.__name + ", "
        string += "code: " + self.__code + ", "
        string += "campus: " + self.__campus + ", "
        string += "international: " + str(bool(self.__international)) + ", "
        string += "access: " + self.__access + ", "
        string += "site: " + self.__site + ", "
        string += "codec: " + self.__codec + "."
        return string


a = {
    "name": "Fisica",
    "code": "9244",
    "campus": "Bologna",
    "international": 1,
    "access": "Aperto",
    "site": "www",
    "codec": "fisica",
}

test = Course(from_dict=a, from_table=False)
print(repr(test))
