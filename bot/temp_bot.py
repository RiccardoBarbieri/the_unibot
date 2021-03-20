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
import pickle




class Bot():

    # every time a message is sent this variable must be set to the message text (NOT OBJECT)
    last_mess: str = None

    # database instance
    db: Database

    # contains the name of the bot
    which_bot: str = None

    def __init__(self, token, which_bot):
        
        self.which_bot = which_bot
        
        updater = Updater(token=token, use_context=True)
        dispatcher = updater.dispatcher

        logging.basicConfig(
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

        self.db = Database(Path('./database/telegram.db'))
        
        start_handler = CommandHandler('start', self.start)
        misc_handler = MessageHandler(Filters.text & (~Filters.command), self.misc)
        set_corso_handler = CommandHandler('set_corso', self.set_corso)
        set_curricula_handler = CommandHandler('set_curricula', self.set_curricula)
        set_anno_handler = CommandHandler('set_anno', self.set_anno)
        set_detail_handler = CommandHandler('set_detail', self.set_detail)
        orario_handler = CommandHandler('orario', self.orario)
        set_autosend_handler = CommandHandler('set_autosend', self.set_autosend)
        autosend_handler = CommandHandler('autosend', self.autosend)
        wiki_handler = CommandHandler('wiki', self.wiki)
        bug_report_handler = CommandHandler('bug_report', self.bug)


        dispatcher.add_handler(start_handler)
        dispatcher.add_handler(misc_handler)
        dispatcher.add_handler(set_corso_handler)
        dispatcher.add_handler(set_curricula_handler)
        dispatcher.add_handler(set_anno_handler)
        dispatcher.add_handler(set_detail_handler)
        dispatcher.add_handler(orario_handler)
        dispatcher.add_handler(set_autosend_handler)
        dispatcher.add_handler(autosend_handler)
        dispatcher.add_handler(wiki_handler)
        dispatcher.add_handler(bug_report_handler)

        updater.start_polling()

    def start(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                       course=0, year=1, detail=2, curricula='000-000')
        self.db.backup('data')
        context.bot.send_message(chat_id=update.effective_chat.id, text='Benvenuto/a dal bot dell\'Università di Bologna.\nPer una guida rapida è possibile consultare la <a href="{link}">repository</a> del bot.'
                                 .format(link='https://github.com/RiccardoBarbieri/t_bot'), parse_mode=ParseMode.HTML, disable_web_page_preview=True)

    def misc(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        last_command = pickle.loads(self.db.query('data', key_chat_id = update.effective_chat.id, key_user_id = update.effective_user.id)[0]['last_command'])
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
        if last_command is not None and '/wiki' in last_command.text:
            self.wiki(update, context)
        if last_command is not None and '/set_corso' in last_command.text:
            chat_id = last_command.chat.id  # getting ids from last_command sent
            user_id = last_command.from_user.id
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
                    self.db.update('data', key_chat_id=chat_id,
                                   key_user_id=user_id, course=course_code)
                self.db.backup('data')
                print('Updated user {user_id} with course {course_code}'.format(
                    course_code=course_code, user_id=user_id))
    
    def set_corso(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        message = '''Usa /set_corso [parole] [numero] per filtrare tra i corsi e cambiare pagina.\nSe non trovi il tuo corso puoi segnalarcelo (/bug_report).'''
        context.bot.send_message(chat_id=update.effective_chat.id, text=message)

        courses = self.db.query_all('data')

        if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
            self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                            course=0, year=1, detail=2, curricula='000-000')
        else:
            self.db.update('data', key_chat_id=update.effective_chat.id,
                            key_user_id=update.effective_user.id, last_command = pickle.dumps(update.message))

        page_param = 0
        if len(update.message.text.strip()) == 10:
            mess_len = 0
            for i in self.db.query_all('courses'):
                mess_len += len(i['course_name'] +
                                ' [{type}]'.format(type=get_course_type(i['site'])))
            page_num = ceil(mess_len / 4096)

            pages = self.__pages_creation(courses, page_num)
        else:
            params = parse_params('/set_corso', update.message.text)

            # foolproofing numeric parameters
            if len(params['numeric']) == 0:
                page_param = 1
            elif len(params['numeric']) >= 1:
                page_param = params['numeric'][0]
                if len(params['numeric']) > 1:
                    context.bot.send_message(
                        chat_id=update.effective_chat.id, text='Troppi parametri numerici, uso solo il primo.')

            # foolproofing text parameters
            if len(params['text']) == 0:
                params['text'] = [' ']

            # filtering courses
            courses_filtered = []
            for i in courses:
                if string_contains(i['course_name'], params['text']):
                    courses_filtered.append(i)

            # pages number creation
            mess_len = 0
            for i in courses_filtered:
                mess_len += len(i['course_name'] +
                                ' [{type}]'.format(type=get_course_type(i['site'])))
            page_num = ceil(mess_len / 4096)

            # adapting page_param
            if page_param > page_num:
                page_param = page_num
            if page_param <= 0:
                page_param = 1
            page_param -= 1

            # pages creation
            pages = self.__pages_creation(courses_filtered, page_num)

        if pages:  # if pages is not empty
            keyboard = telegram.ReplyKeyboardMarkup(
                pages[page_param], one_time_keyboard=True, selective=True)
            context.bot.send_message(chat_id=update.effective_chat.id, text='Seleziona il corso, {page_param}/{pages}.'.format(
                pages=page_num, page_param=page_param + 1), reply_markup=keyboard, reply_to_message_id=update.message.message_id)
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id, text='Nessun corso trovato.')

    def __pages_creation(self, courses: list, page_num: int):
        pages = []
        last_course = 0
        for i in range(page_num):
            rows = []
            length = 0
            for j, k in zip(courses[last_course:], range(last_course, len(courses))):
                rows.append([telegram.KeyboardButton(
                    j['course_name'] + ' [{type}]'.format(type=j['course_code']))])
                length += len(j['course_name'] +
                            ' [{type}]'.format(type=j['course_code']))
                last_course = k
                if length > 4095:
                    break
            pages.append(rows)
        for i in range(1, page_num):
            # removing first element (duplicate) for each page
            pages[i] = pages[i][1:]
        return pages
    pages = []

    def set_curricula(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        pass # to implement

    def set_anno(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        
        if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
            self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                            course=0, year=1, detail=2, curricula='000-000')
        else:
            self.db.update('data', key_chat_id=update.effective_chat.id,
                            key_user_id=update.effective_user.id, last_command = pickle.dumps(update.message))

        params = parse_params('/set_anno', update.message.text)

        if len(params['numeric']) == 1 and len(params['text']) == 0:
            if params['numeric'][0] >= 1 or params['numeric'][0] <= 5:
                chat_id = update.effective_chat.id
                user_id = update.effective_user.id
                if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
                    self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                                    course=0, year=1, detail=2, curricula='000-000')
                else:
                    self.db.update('data', key_chat_id=update.effective_chat.id,
                                key_user_id=update.effective_user.id, year=params['numeric'][0])
                self.db.backup('data')
                context.bot.send_message(chat_id=update.effective_chat.id,
                                        text='Impostato anno a {year}.'.format(year=params['numeric'][0]))
                print(self.db.query_by_ids(chat_id, user_id))
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id, text='Troppi parametri.')
    
    def set_detail(self, update: telegram.Update, context: telegram.ext.CallbackContext):

        if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
            self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                            course=0, year=1, detail=2, curricula='000-000')
        else:
            self.db.update('data', key_chat_id=update.effective_chat.id,
                            key_user_id=update.effective_user.id, last_command = pickle.dumps(update.message))

        params = parse_params('/set_detail', update.message.text)

        if len(params['numeric']) == 1 and len(params['text']) == 0:
            if params['numeric'][0] >= 1 or params['numeric'][0] <= 5:
                chat_id = update.effective_chat.id
                user_id = update.effective_user.id
                if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
                    self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                                    course=0, year=1, detail=2, curricula='000-000')
                else:
                    self.db.update('data', key_chat_id=update.effective_chat.id,
                                key_user_id=update.effective_user.id, detail=params['numeric'][0])
                self.db.backup('data')
                context.bot.send_message(chat_id=update.effective_chat.id,
                                        text='Impostato dettaglio a {detail}.'.format(detail=params['numeric'][0]))
                print(self.db.query_by_ids(chat_id, user_id))
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id, text='Troppi parametri.')

    def orario(self, update: telegram.Update, context: telegram.ext.CallbackContext):

        if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
            self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                            course=0, year=1, detail=2, curricula='000-000')
        else:
            self.db.update('data', key_chat_id=update.effective_chat.id,
                                key_user_id=update.effective_user.id, last_command = pickle.dumps(update.message))

        params = parse_params('/orario', update.message.text)

        date_regex = '^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4}|[0-9]{2})$'

        if (len(params['numeric']) == 0 and len(params['text']) == 1) and (re.match(date_regex, params['text'][0])):
            date = parse_date(params['text'][0])

            messages = self.__messages_creation(date, update.effective_chat.id, update.effective_user.id)

            message_default = 'Non ci sono lezioni il {date}.'.format(date = date)
        
        elif (len(params['numeric']) == 0 and len(params['text']) == 1) and (check_days(params['text'][0])):
            date = date_from_day(params['text'][0])
            
            messages = self.__messages_creation(date, update.effective_chat.id, update.effective_user.id)

            message_default = 'Non ci sono lezioni il {date}.'.format(date = date)
            
            pass # implement oggi domani dopodomani
        else:
            message = []
            message_default = 'Parametri non corretti.'

        if len(messages) == 0:
            context.bot.send_message(
                chat_id=update.effective_chat.id, text=message_default)
        for i in messages:
            context.bot.send_message(chat_id=update.effective_chat.id, text=i,
                                    parse_mode=ParseMode.HTML, disable_web_page_preview=True)
    
    def __messages_creation(self, date: str, chat_id: int, user_id: int):

        result = self.db.query_by_ids(
            chat_id, user_id)

        courses = self.db.query_all('courses')
        for i in courses:
            if str(i['course_code']) == str(result[0]['course']):
                found = i

        schedules = UniboAPI.get_orario(found['course_codec'], get_course_type(
            found['site']), result[0]['year'], date, result[0]['curricula'])
        
        messages = []
        for i in schedules:
            messages.append(MessageCreator.get_message(i, result[0]['detail']))

        return messages
    
    def set_autosend(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        pass  # to implement

    def autosend(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        pass  # to implement
        
    def wiki(self, update: telegram.Update, context: telegram.ext.CallbackContext):

        if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
            self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                            course=0, year=1, detail=2, curricula='000-000')
        else:
            self.db.update('data', key_chat_id=update.effective_chat.id,
                            key_user_id=update.effective_user.id, last_command = pickle.dumps(update.message))

        self.db.query('data', key_chat_id = update.effective_chat.id, key_user_id = update.effective_user.id)[0]['last_command']
        
        if '/wiki@{bot}'.format(bot = self.which_bot) in update.message.text:
            text = update.message.text[len('/wiki@' + self.which_bot):]
        elif '/wiki' in update.message.text:
            text = update.message.text[6:]
        else:
            text = update.message.text

        results = WikipediaAPI.pages(text)
        if len(results['names']) != 0:
            if self.last_mess is not None and self.last_mess.lower() == text.lower():
                index = results['names'].index(text)
                url = results['links'][index]
                self.__temp_func(url, update, context)
            else:
                self.last_mess = text
                if results['single']:
                    url = results['links']
                    self.__temp_func(url, update, context)
                else:
                    rows = []
                    for i in results['names']:
                        temp = []
                        temp.append(telegram.KeyboardButton(i))
                        rows.append(temp)
                    keyboard = telegram.ReplyKeyboardMarkup(
                        rows, one_time_keyboard=True, selective = True)
                    context.bot.send_message(
                        chat_id=update.effective_chat.id, text='Seleziona la pagina', reply_markup=keyboard, reply_to_message_id=update.message.message_id)
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id, text='Pagina non trovata.')
            self.db.update('data', key_chat_id=update.effective_chat.id,
                            key_user_id=update.effective_user.id, last_command = 'NULL')
            last_mess = None

    def __temp_func(self, url_: str, update: telegram.Update, context: telegram.ext.CallbackContext):  # function defined for optimization

        try:
            message = WikipediaAPI.summary(url_)
            context.bot.send_message(chat_id=update.effective_chat.id,
                                text=message, reply_markup=telegram.ReplyKeyboardRemove())
        except telegram.error.BadRequest as e:
            if str(e) == 'Message is too long':
            context.bot.send_message(chat_id=update.effective_chat.id,
                                    text=__long_mess_fix(message), reply_markup=telegram.ReplyKeyboardRemove())
        self.db.query('data', key_chat_id = update.effective_chat.id, key_user_id = update.effective_user.id)[0]['last_command']
        self.last_mess = None

    def __long_mess_fix(message: str):
        message = message[:4095]
        message = message[::-1]
        message = message[message.find('.'):]
        message = message[::-1]
        return message

    def bug(self, update: telegram.Update, context: telegram.ext.CallbackContext):
        if len(self.db.query_by_ids(update.effective_chat.id, update.effective_user.id)) == 0:
            self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                            course=0, year=1, detail=2, curricula='000-000')
        else:
            self.db.update('data', key_chat_id=update.effective_chat.id,
                            key_user_id=update.effective_user.id, last_command = pickle.dumps(update.message))

        context.bot.send_message(chat_id=update.effective_chat.id, text='Si può segnalare un bug/suggerire un miglioramento sulla <a href="{link}">repository</a> del bot.'
                                .format(link='https://github.com/RiccardoBarbieri/t_bot/issues'), parse_mode=ParseMode.HTML)

if __name__ == '__main__':

    if sys.argv[1] == 'test':
        with open(Path('./bot/test.txt')) as f:
            token = f.readline()
            which_bot = 'orari_unibo_bot'
    elif sys.argv[1] == 'launch':
        with open(Path('./bot/token.txt')) as f:
            token = f.readline()
            which_bot = 'the_unibot'

    bot = Bot(token, which_bot)