from pprint import pprint

class Table():

    name: str = ''

    def __init__(self, name: str, **columns):
        self.name = name

        print(columns)

        self.__dict__.update(columns)


table = Table('data', {{'chat_id': -535696384, 'user_id': 131125356, 'course': '9254',
                        'year': 2, 'detail': 2, 'curricula': '000-000', 'autosend_time': '15:36', 'autosend': 1}})


pprint(table.user)
