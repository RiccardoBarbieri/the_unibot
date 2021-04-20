from __future__ import annotations
import sys
import getpass
if getpass.getuser() == 'ricca':
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram')
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
elif getpass.getuser() == 'riccardoob':
    sys.path.append('/home/riccardoob/telegram_bot')
elif getpass.getuser() == 'pi':
    sys.path.append('/home/pi/telegram-bot')

from typing import Dict, Any

from exceptions import ParameterError

class Course():

    """
    Describes a course, it contains all the properties that a course
    has, obtainable through dedicated getters. The attributes of an
    instance of this class should not be modified, create a new instance
    instead.

    Note
    ----
    To create an instance of this class one must provide the attributes
    of the course separately or the from_dict that maps them, NOT BOTH.

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

    Raises
    ------
    TypeError
        If one or more of the parameters provided are not of
        the correct type, whether they come from single parameter
        or from_dict.
    ParameterError
        If the single parameters are not None and so is from_dict
        or viceversa.
    """

    __name: str
    __code: str
    __campus: str
    __international: int # bool
    __access: str
    __site: str
    __codec: str

    def __init__(
        self,
        name: str = None,
        code: str = None,
        campus: str = None,
        international: int = None,
        access: str = None,
        site: str = None,
        codec: str = None,
        from_dict: Dict[str, str | int] = None
    ):
        if (not from_dict) and (name and code and campus and international and access and site and codec):
            if (
                (not isinstance(name, str)) or
                (not isinstance(code, str)) or
                (not isinstance(campus, str)) or
                (not isinstance(international, int)) or
                (not isinstance(access, str)) or
                (not isinstance(site, str)) or
                (not isinstance(codec, str))
            ):
                raise TypeError('One or more attributes are not of the correct type.')
            self.__name = name
            self.__code = code
            self.__campus = campus
            self.__international = international
            self.__access = access
            self.__site = site
            self.__codec = codec
        elif (from_dict) and ((not name) and (not code) and (not campus) and (not international) and (not access) and (not site) and (not codec)):
            if (
                (not isinstance(from_dict['name'], str)) or
                (not isinstance(from_dict['code'], str)) or
                (not isinstance(from_dict['campus'], str)) or
                (not isinstance(from_dict['international'], int)) or
                (not isinstance(from_dict['access'], str)) or
                (not isinstance(from_dict['site'], str)) or
                (not isinstance(from_dict['codec'], str))
            ):
                raise TypeError('One or more attributes are not of the correct type.')
            self.__name = from_dict['name']
            self.__code = from_dict['code']
            self.__campus = from_dict['campus']
            self.__international = from_dict['international']
            self.__access = from_dict['access']
            self.__site = from_dict['site']
            self.__codec = from_dict['codec']
        else:
            raise ParameterError('The single parameters must be provided only if from_dict isn\'t (or viceversa).')
        

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

test = Course('asd', '123', 'qui', 1, 'asd', 'url', 'asd')