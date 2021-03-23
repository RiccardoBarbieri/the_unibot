import mysql.connector


db = mysql.connector.connect(
    host = '82.58.25.219',
    user = 'root',
    password = 'riccardo00'
)

cursor = db.cursor()

cursor.execute('USE telegram')

cursor.execute('''CREATE TABLE IF NOT EXISTS test(
                col1 INTEGER,
                PRIMARY KEY (col1)
                )''')

# data = (1,)
# cursor.execute('INSERT INTO test VALUES (%s)', data)

cursor.execute('SELECT * FROM test')
print(cursor.fetchall())

db.commit()