import mysql.connector
from mysql.connector.connection import CursorBase
from mysql.connector.errors import IntegrityError
import requests
import getpass

ip = requests.get('https://api.ipify.org').text


connection = mysql.connector.connect(
    host = ip,
    user = 'root',
    password = 'riccardo00'
)

cursor: CursorBase = connection.cursor()

cursor.execute('USE telegram')

cursor.execute('''CREATE TABLE IF NOT EXISTS test(
                col1 INTEGER,
                PRIMARY KEY (col1)
                )''')

data = (2,)
try:
    cursor.execute('INSERT INTO test VALUES (%s);', data)
except IntegrityError as e:
    print('{msg}, not inserting {data}'.format(
                    msg=str(e), data=str(data)))
connection.commit()

cursor.execute('SELECT * FROM test')

print(cursor.fetchall())

# cursor.execute("SHOW COLUMNS FROM test;")
# cols = tuple([i[0] for i in cursor.fetchall()])

# print(cols)
connection.close()