import sys
import getpass
if getpass.getuser() == 'ricca':
    # TODO: change this path when migrating to another platform
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram')
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
elif getpass.getuser() == 'riccardoob':
    sys.path.append('/home/riccardoob/telegram_bot')
from api.unibo import UniboAPI
from api.wikipedia import WikipediaAPI
import telegram
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


db = Database(Path('./database/telegram.db'))


def sub(string, substring):  # funzione che censura la substring
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


def parse(params: list):
    param_parsed = {'numeric': [], 'text': []}
    for i in params:
        if i.isnumeric():
            param_parsed['numeric'].append(int(i))
        else:
            param_parsed['text'].append(i)
    return param_parsed


def parse_params(command: str, message: str):
    params = message[len(command):].split()
    return parse(params)


def check_days(string: str):
    days = ['oggi', 'domani', 'dopodomani']
    return string in days


def parse_date(date: str):
    year = date[-4:]
    day = date[:2]
    month = date[3:5]
    return year + '-' + month + '-' + day


with open(Path('./bot/token.txt')) as f:
    token = f.readline()

last_command = None
last_mess = None  # stores message to check if it's equal to last one
updater = Updater(token=token, use_context=True)
dispatcher = updater.dispatcher

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
# TODO: change with sql query when courses ar in tables
# TODO: gestici curricula non ancora imposta in orario!!!!


def start(update, context):
    db.insert(update.effective_chat.id, update.effective_user.id)


def misc(update, context):
    global last_command
    if 'piedi' in update.message.text.lower():
        last_command = None
        context.bot.send_message(
            chat_id=update.effective_chat.id, text='Qualcuno ha detto PIEDI????')
        context.bot.send_photo(chat_id=update.effective_chat.id,
                               photo='https://www.benesserecorpomente.it/wp-content/uploads/2017/03/Piedi.jpg')
    if 'egistr' in update.message.text.lower():
        last_command = None
        text = update.message.text
        context.bot.send_message(chat_id=update.effective_chat.id, text='<a href="tg://user?id={user_id}">@{username}</a>'
                                 .format(user_id=update.effective_user.id, username=update.effective_user.username) + ': ' + sub(text, 'egistr'), parse_mode=ParseMode.HTML)
        context.bot.delete_message(
            chat_id=update.effective_chat.id, message_id=update.message.message_id)
    if last_command is not None and '/wiki' in last_command.text:
        wiki(update, context)
    if last_command is not None and '/set_corso' in last_command.text:
        chat_id = last_command.chat.id
        user_id = last_command.from_user.id
        course_name = update.message.text.split('[')[0].strip()
        course_code = update.message.text.split('[')[1][:-1].strip()
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
        db.insert(chat_id, user_id)
        db.update(chat_id, user_id, course=course_code)
        db.backup()
        print('Updated user {user_id} with course {course_code}'.format(
            course_code=course_code, user_id=user_id))


def set_corso(update, context):
    message = '''Usa /set_corso [parole] [numero] per filtrare tra i corsi e cambiare pagina.\nSe non trovi il tuo corso puoi segnalarcelo (/bug_report).'''
    context.bot.send_message(chat_id=update.effective_chat.id, text=message)
    global last_command
    courses: dict = {}
    with open(Path('./resources/flat_courses.json')) as f:
        courses = json.load(f)
    last_command = update.message

    def pages_creation(courses, page_num):
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

    page_param = 0
    if len(update.message.text.strip()) == 10:

        mess_len = 0
        for i in courses:
            mess_len += len(i['course_name'] +
                            ' [{type}]'.format(type=get_course_type(i['site'])))
        page_num = ceil(mess_len / 4096)

        pages = pages_creation(courses, page_num)

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
        pages = pages_creation(courses_filtered, page_num)

    if pages:  # if pages is not empty
        keyboard = telegram.ReplyKeyboardMarkup(
            pages[page_param], one_time_keyboard=True)
        context.bot.send_message(chat_id=update.effective_chat.id, text='Seleziona il corso, {page_param}/{pages}.'.format(
            pages=page_num, page_param=page_param + 1), reply_markup=keyboard)
    else:
        context.bot.send_message(
            chat_id=update.effective_chat.id, text='Nessun corso trovato.')


def set_curricula(update, context):
    pass  # to implement


def set_anno(update, context):
    global last_command
    last_command = update.message

    params = parse_params('/set_anno', update.message.text)

    if len(params['numeric']) == 1 and len(params['text']) == 0:
        if params['numeric'][0] >= 1 or params['numeric'][0] <= 5:
            chat_id = last_command.chat.id
            user_id = last_command.from_user.id
            db.insert(chat_id, user_id)
            db.update(chat_id, user_id, year=params['numeric'][0])
            context.bot.send_message(chat_id=update.effective_chat.id,
                                     text='Impostato anno a {year}.'.format(year=params['numeric'][0]))
            print(db.query_by_ids(chat_id, user_id))
    else:
        context.bot.send_message(
            chat_id=update.effective_chat.id, text='Troppi parametri.')


def set_detail(update, context):
    global last_command
    last_command = update.message

    params = parse_params('/set_detail', update.message.text)

    if len(params['numeric']) == 1 and len(params['text']) == 0:
        if params['numeric'][0] >= 1 or params['numeric'][0] <= 5:
            chat_id = last_command.chat.id
            user_id = last_command.from_user.id
            db.insert(chat_id, user_id)
            db.update(chat_id, user_id, detail=params['numeric'][0])
            context.bot.send_message(chat_id=update.effective_chat.id,
                                     text='Impostato dettaglio a {detail}.'.format(detail=params['numeric'][0]))
            print(db.query_by_ids(chat_id, user_id))
    else:
        context.bot.send_message(
            chat_id=update.effective_chat.id, text='Troppi parametri.')


def orario(update, context):
    global last_command
    last_command = update.message
    params = parse_params('/orario', update.message.text)
    date_regex = '^([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0]?[1-9]|[1][0-2])[-]([0-9]{4}|[0-9]{2})$'
    # format_string = '%m-%d-%Y'
    if len(params['numeric']) == 0 and len(params['text']) == 1 and (re.match(date_regex, params['text'][0]) or check_days(params['text'][0])):
        date = parse_date(params['text'][0])
        result = db.query_by_ids(
            update.effective_chat.id, update.effective_user.id)
        print(result)
        with open(Path('./resources/flat_courses.json')) as f:
            courses = json.load(f)
        for i in courses:
            if i['course_code'] == str(result[0]['course']):
                found = i
        schedules = UniboAPI.get_orario(found['course_codec'], get_course_type(
            found['site']), result[0]['year'], date, result[0]['curricula'])
        messages = []
        for i in schedules:
            messages.append(MessageCreator.get_message(i, result[0]['detail']))
        if len(messages) == 0:
            context.bot.send_message(
                chat_id=update.effective_chat.id, text='Nessuna lezione.')
        for i in messages:
            context.bot.send_message(chat_id=update.effective_chat.id, text=i,
                                     parse_mode=ParseMode.HTML, disable_web_page_preview=True)
    else:
        context.bot.send_message(
            chat_id=update.effective_chat.id, text='Parametri non corretti.')


def set_autosend(update, context):
    pass  # to implement


def autosend(update, context):
    pass  # to implement


def wiki(update, context):
    global last_command, last_mess

    def temp_func(url_):  # function defined for optimization
        global last_mess, last_command

        try:
            message = WikipediaAPI.summary(url_)
        except telegram.error.BadRequest as e:
            if str(e) == 'Message text is empty':
                message = 'Errore noto, verrà fixato in patch futura'
            elif str(e) == 'Message is too long':
                message = message[:4095]
        context.bot.send_message(chat_id=update.effective_chat.id,
                                 text=message, reply_markup=telegram.ReplyKeyboardRemove())
        last_command = None
        last_mess = None
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
            temp_func(url)
        else:
            last_mess = text
            if results['single']:
                url = results['links']
                temp_func(url)
            else:
                rows = []
                for i in results['names']:
                    temp = []
                    temp.append(telegram.KeyboardButton(i))
                    rows.append(temp)
                keyboard = telegram.ReplyKeyboardMarkup(
                    rows, one_time_keyboard=True)
                context.bot.send_message(
                    chat_id=update.effective_chat.id, text='Seleziona la pagina', reply_markup=keyboard)
    else:
        context.bot.send_message(
            chat_id=update.effective_chat.id, text='Pagina non trovata.')
        last_command = None
        last_mess = None


def bug(update, context):
    global last_command
    last_command = update.message
    context.bot.send_message(chat_id=update.effective_chat.id, text='Si può segnalare un bug/suggerire un miglioramento sulla <a href="{link}">repository</a> del bot.'
                             .format(link='https://github.com/RiccardoBarbieri/t_bot/issues'), parse_mode=ParseMode.HTML)


start_handler = CommandHandler('start', start)
misc_handler = MessageHandler(Filters.text & (~Filters.command), misc)
set_corso_handler = CommandHandler('set_corso', set_corso)
set_curricula_handler = CommandHandler('set_curricula', set_curricula)
set_anno_handler = CommandHandler('set_anno', set_anno)
set_detail_handler = CommandHandler('set_detail', set_detail)
orario_handler = CommandHandler('orario', orario)
set_autosend_handler = CommandHandler('set_autosend', set_autosend)
autosend_handler = CommandHandler('autosend', autosend)
wiki_handler = CommandHandler('wiki', wiki)
bug_report_handler = CommandHandler('bug_report', bug)


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
