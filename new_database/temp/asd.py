from mysql import connector
from mysql.connector.connection import CursorBase
from mysql.connector.errors import IntegrityError
import requests
import getpass
import sqlalchemy as db
from mysql.connector.errors import ProgrammingError



with open('./new_database/creds.txt', 'r') as f:
    creds = f.readlines()


creds = {
    'host':creds[0],
    'user':'root',
    'password':creds[1]
}

class Test():

    cursor: CursorBase

    def __init__(self, cred):
        self.connection = connector.connect(**creds)
        self.cursor = self.connection.cursor()
    
    def print_tables(self):
        try:
            self.cursor.execute('SHOW TABLES LIKE "%";')
            temp = self.cursor.fetchall()
            self.connection.commit()
        except ProgrammingError as e:
            print(e.errno)
        return temp
    
    def use(self, database):
        self.cursor.execute('USE {database};'.format(database = database))
        self.connection.commit()
    
    def getdbs(self):
        self.cursor.execute('SHOW DATABASES;')
        return type(self.cursor.fetchall())

asd = Test(creds)

asd.use('telegram')

print(asd.print_tables())

print(asd.getdbs())
# data = (2,)
# try:
#     cursor.execute('INSERT INTO test VALUES (%s);', data)
# except IntegrityError as e:
#     print('{msg}, not inserting {data}'.format(
#                     msg=str(e), data=str(data)))
# connection.commit()

# cursor.execute('SELECT * FROM test')

# print(cursor.fetchall())

# # cursor.execute("SHOW COLUMNS FROM test;")
# # cols = tuple([i[0] for i in cursor.fetchall()])

# # print(cols)
# connection.close()
