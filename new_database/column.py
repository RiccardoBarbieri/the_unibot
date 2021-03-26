from new_database.type import Type

class Column():
    
    __name: str # contains the actual name of the column

    __type: Type # contains a Type object
    
    def __init__(self, name: str, type: Type):
        self.__name = name
        self.__type = type

    def __str__(self) -> str:
        return self.__name + ' ' + self.__type