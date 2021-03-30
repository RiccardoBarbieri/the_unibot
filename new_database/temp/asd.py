from mysql import connector
from mysql.connector.connection import CursorBase
from mysql.connector.errors import IntegrityError
import requests
import getpass
import sqlalchemy as db



ip = requests.get('https://api.ipify.org').text

with open('./new_database/pass.txt', 'r') as f:
    psw = f.readline()


creds = {
    'host':'riccardohost.ddns.net',
    'user':'root',
    'password':psw
}
with connector.connect(**creds) as connection:



    cursor: CursorBase = connection.cursor()

    cursor.execute('USE telegram;')

    cursor.execute('show tables like "%";')

    print(cursor.fetchall())


    # cursor.execute('CREATE TABLE IF NOT EXISTS test (\nid INT PRIMARY KEY\n)')
    connection.commit()

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
