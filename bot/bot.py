import sys
import getpass
if getpass.getuser() == 'ricca':
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram') #TODO: change this path when migrating to another platform
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
elif getpass.getuser() == 'riccardoob':
    sys.path.append('/home/riccardoob/telegram_bot')
from api import UniboAPI
from api import WikipediaAPI
import telegram
from telegram.parsemode import ParseMode
from telegram.ext import Updater
from telegram.ext import CommandHandler, MessageHandler, Filters
import logging
import json
from pathlib import Path
from database.database import Database
from math import ceil


db = Database(Path('./database/telegram.db'))

def sub(string, substring): #funzione che censura la substring
    start = string.find(substring)
    end = len(substring) + start
    ast = '*'*len(substring)
    return string[:start] + ast + string[end:]

def string_contains(string, params):
    check = True
    for i in params:
        if not (i in string.lower()):
            check = False
    return check

def get_course_type(url: str):
    parts = url.split('/')
    return parts[-2]

with open(Path('./bot/token.txt')) as f:
    token = f.readline()

last_command = None
last_mess = None # stores message to check if it's equal to last one
updater = Updater(token = token, use_context = True)
dispatcher = updater.dispatcher

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

def start(update, context):
    db.insert(update.effective_chat.id, update.effective_user.id)


def misc(update, context):
    global last_mess
    if 'piedi' in update.message.text.lower():
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Qualcuno ha detto PIEDI????')
        context.bot.send_photo(chat_id = update.effective_chat.id, photo = 'https://www.benesserecorpomente.it/wp-content/uploads/2017/03/Piedi.jpg')
    if 'egistr' in update.message.text.lower():
        text = update.message.text
        context.bot.send_message(chat_id = update.effective_chat.id, text = '<a href="tg://user?id={user_id}">@{username}</a>'\
        .format(user_id = update.effective_user.id, username = update.effective_user.username) + ': ' + sub(text, 'egistr'), parse_mode = ParseMode.HTML)
        context.bot.delete_message(chat_id = update.effective_chat.id, message_id = update.message.message_id)
    if last_command is not None and '/wiki' in last_command.text:
        wiki(update, context)
    if last_command is not None and '/set_corso' in last_command.text:
        chat_id = last_command.chat.id
        user_id = last_command.from_user.id
        db.insert(chat_id, user_id)
        db.update(chat_id, user_id, course = last_command.text)
        print(db.query_all)
    

def set_corso(update, context):
    global last_command
    courses: dict = {}
    with open(Path('./resources/flat_courses.json')) as f:
        courses = json.load(f)
    if len(update.message.text.strip()) == 10:
        last_command = update.message

        mess_len = 0
        for i in courses:
            mess_len += len(i['course_name'] + ' [{type}]'.format(type = get_course_type(i['site'])))
        page_num = ceil(mess_len / 4096)
        pages = []
        last_course = 0
        for i in range(page_num):
            rows = []
            length = 0
            for j, k in zip(courses[last_course:], range(last_course, len(courses[last_course:]))):
                rows.append([telegram.KeyboardButton(j['course_name'] + ' [{type}]'.format(type = get_course_type(j['site'])))])
                length += len(j['course_name'] + ' [{type}]'.format(type = get_course_type(j['site'])))
                last_course = k
                if length > 4095:
                    break
            print(len(rows))
            pages.append(rows)
        sos = 0
        with open('temp.txt', 'w+') as f:

            for i in pages:
                for j in i:
                    sos += 1
                    f.write(j[0].text + '\n')
            print(sos)
        # keyboard = telegram.ReplyKeyboardMarkup(rows[:200], one_time_keyboard = True)
        # context.bot.send_message(chat_id = update.effective_chat.id, text = 'Seleziona il corso', reply_markup = keyboard)
    else:
        params = update.message.text[10:].split()
        rows = []
        for i in courses:
            if string_contains(i['course_name'], params):
                rows.append([telegram.KeyboardButton(i['course_name'] + ' [{type}]'.format(type = get_course_type(i['site'])))])    
        keyboard = telegram.ReplyKeyboardMarkup(rows[:200], one_time_keyboard = True)
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Seleziona il corso', reply_markup = keyboard)



def set_anno(update, context):
    pass # to implement

def set_autosend(update, context):
    pass # to implement

def autosend(update, context):
    pass # to implement

def orario(update, context):
    pass # to implement

def set_detail(update, context):
    pass # to implement

def wiki(update, context):
    global last_command, last_mess
    if '/wiki' in update.message.text:
        last_command = update.message
        text = update.message.text[6:]
    else:
        text = update.message.text
    results = WikipediaAPI.pages(text)
    if len(results['names']) != 0:
        if last_mess is not None and last_mess.lower() == text.lower():
            index = results['names'].index(text)
            url = results['links'][index]
            message = ''
            try:
                message = WikipediaAPI.summary(url)
            except telegram.error.BadRequest as e:
                if str(e) == 'Message text is empty':
                    message = 'Errore noto, verrà fixato in patch futura'
                elif str(e) == 'Message is too long':
                    message = message[:4095]
            context.bot.send_message(chat_id = update.effective_chat.id, text = message, reply_markup = telegram.ReplyKeyboardRemove())
            last_command = None
            last_mess = None
        else:
            last_mess = text
            if results['single']:
                message = ''
                try:
                    message = WikipediaAPI.summary(results['links'])
                except telegram.error.BadRequest as e:
                    if str(e) == 'Message text is empty':
                        message = 'Errore noto, verrà fixato in patch futura'
                    elif str(e) == 'Message is too long':
                        message = message[:4095]
                context.bot.send_message(chat_id = update.effective_chat.id, text = message, reply_markup = telegram.ReplyKeyboardRemove())
                last_command = None
                last_mess = None
            else:
                rows = []
                for i in results['names']:
                    temp = []
                    temp.append(telegram.KeyboardButton(i))
                    rows.append(temp)
                keyboard = telegram.ReplyKeyboardMarkup(rows, one_time_keyboard = True)
                context.bot.send_message(chat_id = update.effective_chat.id, text = 'Seleziona la pagina', reply_markup = keyboard)
    else:
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Pagina non trovata')
        last_command = None
        last_mess = None

def bug(update, context):
    context.bot.send_message(chat_id = update.effective_chat.id, text = 'Si può segnalare un bug/suggerire un miglioramento sulla <a href="{link}">repository</a> del bot'\
    .format(link = 'https://github.com/RiccardoBarbieri/t_bot'), parse_mode = ParseMode.HTML)
        

start_handler = CommandHandler('start', start)
misc_handler = MessageHandler(Filters.text & (~Filters.command), misc)
set_corso_handler = CommandHandler('set_corso', set_corso)
set_anno_handler = CommandHandler('set_anno', set_anno)
set_autosend_handler = CommandHandler('set_autosend', set_autosend)
autosend_handler = CommandHandler('autosend', autosend)
orario_handler = CommandHandler('orario', orario)
set_detail_handler = CommandHandler('set_detail', set_detail)
wiki_handler = CommandHandler('wiki', wiki)
bug_report_handler = CommandHandler('bug_report', bug)

dispatcher.add_handler(start_handler)
dispatcher.add_handler(misc_handler)
dispatcher.add_handler(set_corso_handler)
dispatcher.add_handler(set_anno_handler)
dispatcher.add_handler(set_autosend_handler)
dispatcher.add_handler(autosend_handler)
dispatcher.add_handler(orario_handler)
dispatcher.add_handler(set_detail_handler)
dispatcher.add_handler(wiki_handler)
dispatcher.add_handler(bug_report_handler)

updater.start_polling()