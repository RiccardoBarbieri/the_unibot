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

from api.unibo import UniboAPI
from api.wikipedia import WikipediaAPI

import telegram
import telegram.ext
from telegram.parsemode import ParseMode
from telegram.ext import Updater
from telegram.ext import CommandHandler, MessageHandler, Filters

import logging
import json
from pathlib import Path
from database.database import Database
from math import ceil
import re
from datetime import date
from message_creator import MessageCreator
from pprint import pprint


# ! this will go in main
if sys.argv[1] == 'test':
    with open(Path('./bot/test.txt')) as f:
        token = f.readline()
        which_bot = 'orari_unibo_bot'
elif sys.argv[1] == 'launch':
    with open(Path('./bot/token.txt')) as f:
        token = f.readline()
        which_bot = 'the_unibot'


class Bot():

    # every time a command is sent this variable must be set to the message object
    last_command: telegram.Message = None

    # every time a message is sent this variable must be set to the message text (NOT OBJECT)
    last_mess: str = None

    def __init__(self, token):

        updater = Updater(token=token, use_context=True)
        dispatcher = updater.dispatcher

        logging.basicConfig(
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

        self.db = Database(Path('./database/telegram.db'))

    def start(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                       course=0, year=1, detail=2, curricula='000-000')
        self.db.backup('data')
        context.bot.send_message(chat_id=update.effective_chat.id, text='Benvenuto/a dal bot dell\'Università di Bologna.\nPer una guida rapida è possibile consultare la <a href="{link}">repository</a> del bot.'
                                 .format(link='https://github.com/RiccardoBarbieri/t_bot'), parse_mode=ParseMode.HTML, disable_web_page_preview=True)

    def misc(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        if 'piedi' in update.message.text.lower():
            context.bot.send_message(
                chat_id=update.effective_chat.id, text='Qualcuno ha detto PIEDI????')
            context.bot.send_photo(chat_id=update.effective_chat.id,
                                   photo='https://www.benesserecorpomente.it/wp-content/uploads/2017/03/Piedi.jpg')
        if 'egistr' in update.message.text.lower():
            text = update.message.text
            context.bot.send_message(chat_id=update.effective_chat.id, text='<a href="tg://user?id={user_id}">@{username}</a>'
                                     .format(user_id=update.effective_user.id, username=update.effective_user.username) + ': ' + sub(text, 'egistr'), parse_mode=ParseMode.HTML)
            context.bot.delete_message(
                chat_id=update.effective_chat.id, message_id=update.message.message_id)
        if self.last_command is not None and '/wiki' in self.last_command.text:
            self.wiki(update, context)
        if self.last_command is not None and '/set_corso' in self.last_command.text:
            chat_id = self.last_command.chat.id  # getting ids from last_command sent
            user_id = self.last_command.from_user.id
            # getting name and code from the message from keyboard
            course_name = update.message.text.split('[')[0].strip()
            course_code = update.message.text.split('[')[1][:-1].strip()
            if (chat_id, user_id) == (update.effective_chat.id, update.effective_user.id):
                found = {}
                with open(Path('./resources/flat_courses.json')) as f:
                    courses = json.load(f)
                for i in courses:
                    if i['course_code'] == course_code:
                        found = i
                message = 'Corso selezionato: <a href="{link}">{course_name}</a>.'.format(
                    course_name=course_name, link=found['site'])
                context.bot.send_message(
                    chat_id=chat_id, text=message, reply_markup=telegram.ReplyKeyboardRemove(), parse_mode=ParseMode.HTML, disable_web_page_preview=True)
                if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
                    self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                                   course=course_code, year=1, detail=2, curricula='000-000')
                else:
                    self.db.update('data', primary_key_chat_id=chat_id,
                                   primary_key_user_id=user_id, course=course_code)
                self.db.backup('data')
                print('Updated user {user_id} with course {course_code}'.format(
                    course_code=course_code, user_id=user_id))
        self.last_command = None  # resetting command to avoid unwanted responses to "normal" messages
