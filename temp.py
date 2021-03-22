from telegram.message import Message
from telegram import update
from telegram.chat import Chat
from datetime import datetime
import pickle

message = Message(1234, datetime.now(), Chat(1234, 'private'))

pick = pickle.dumps(update.message)

print(pick)