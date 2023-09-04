import sqlalchemy as db
import pandas as pd


engine = db.create_engine('mysql+pymysql://root@127.0.0.1:3306/telegrambot')

meta = db.MetaData()

data = db.Table('data', meta,
                db.Column('chat_id', db.Integer, primary_key=True),
                db.Column('user_id', db.Integer, primary_key=True),
                db.Column('course', db.String(25)),
                db.Column('detail', db.Integer),
                db.Column('year', db.Integer))

meta.bind = engine
meta.create_all(engine)


insert = data.insert()
values = [{'chat_id': 124, 'user_id': 1232,
           'course': 'test', 'detail': 1, 'year': 2}]

connection = engine.connect()
ResultProxy = connection.execute(insert, values)
