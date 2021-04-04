from mysql import connector
from mysql.connector.connection import CursorBase
from mysql.connector.errors import IntegrityError
import requests
import getpass
import sqlalchemy as db
from mysql.connector.errors import ProgrammingError



with open('./new_database/pass.txt', 'r') as f:
    psw = f.readline()


creds = {
    'host':'riccardohost.ddns.net',
    'user':'root',
    'password':psw
}
# with connector.connect(**creds) as connection:



#     cursor: CursorBase = connection.cursor()

#     cursor.execute('USE telegram;')

#     cursor.execute('show tables like "%";')

#     print(cursor.fetchall())


#     # cursor.execute('CREATE TABLE IF NOT EXISTS test (\nid INT PRIMARY KEY\n)')
#     connection.commit()

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
        return self.cursor.fetchall()

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
