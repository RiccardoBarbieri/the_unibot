import sys  # nopep8
sys.path.append('.')  # nopep8

from api.unibo import UniboAPI
from api import WikipediaAPI
from api import WeatherAPI
from utils import Utils
from utils import MessageCreator
from database import Database
from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, KeyboardButton, Update, Bot
from telegram.error import BadRequest, Forbidden
from telegram.constants import ParseMode
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, Updater, CallbackContext, JobQueue, Job
from telegram.ext import filters
import logging
import json
from pathlib import Path
from math import ceil
import re
from datetime import datetime, timedelta
from typing import Dict

SECONDS_IN_A_DAY = 86400

SECONDS_TEST = 20

'''
This class is the main class of the_unibot.
You can find it on Telegram with the username @the_unibot.

It contains all the methods that are called when a command is sent to the bot.

The methods are called by the dispatcher, which is an instance of the telegram.ext.ApplicationBuilder class.

The methods are called with two parameters: update and context.
The update parameter contains all the information about the message sent to the bot.
The context parameter contains all the information about the bot itself.

The methods are async, so they can be called with the await keyword.

Parameters
----------
last_mess : str
    Contains the last message sent to the bot.
db : Database
    Contains the database instance.
which_bot : str
    Contains the name of the bot.
job_queue : telegram.ext.JobQueue
    Contains the job_queue instance.
jobs : Dict[str, Job]
    Contains the jobs scheduled by the bot.
bot : Bot
    Contains the bot instance.
updater : telegram.ext.Updater
    Contains the updater instance.

'''


class the_unibot():
    __version__ = '2023.09.04'
    __link__ = 'https://github.com/RiccardoBarbieri/the_unibot'
    __langs__ = {'English': 'en', 'Italiano': 'it'}

    messages: str

    # every time a message is sent this variable must be set to the message text (NOT OBJECT)
    last_mess: str = None

    # database instance
    db: Database

    # contains the name of the bot
    which_bot: str = None

    job_queue: JobQueue

    jobs: Dict[str, Job]

    # bot instance
    bot: Bot

    # updater instance
    updater: Updater

    '''
    This method is called when the bot is started.
    It creates the dispatcher, the updater and the bot instances.
    It also creates the database instance, or loads it if it already exists.
    It also creates the job_queue instance together with the jobs dictionary.
    
    Parameters
    ----------
    token : str
        Contains the token of the bot.
    which_bot : str
        Contains the name of the bot.

    Returns
    -------
    None
    '''

    def __init__(self, token, which_bot) -> None:

        self.which_bot = which_bot

        self.jobs: Dict[str, Job] = {}

        self.bot = Bot(token=token)
        self.updater = Updater(bot=self.bot, update_queue=None)

        with open(Path('./resources/lang.json')) as file:
            self.messages = json.load(file)

        dispatcher = ApplicationBuilder().token(token).build()

        logging.basicConfig(
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

        self.db = Database(Path('./database/telegram.db'))

        self.job_queue = dispatcher.job_queue

        for i in self.db.query_all('data'):
            scheduled_time_str = Utils.idiot_time(i['autosend_time'])
            effective_day = 'oggi' if int(
                scheduled_time_str[:2]) < 15 else 'domani'
            chat_id = i['chat_id']
            # user_id = i['user_id']
            if bool(i['autosend']):
                self.jobs[str(chat_id)] = self.job_queue.run_repeating(self.__callback_loop, timedelta(
                    seconds=SECONDS_IN_A_DAY), first=timedelta(seconds=Utils.get_seconds(scheduled_time_str)), chat_id=chat_id, data=effective_day)

        start_handler = CommandHandler('start', self.start)
        message_handler = MessageHandler(
            filters.TEXT & (~filters.COMMAND), self.message_handler)
        help_handler = CommandHandler('help', self.help)
        set_course_handler = CommandHandler('set_course', self.set_course)
        set_curriculum_handler = CommandHandler(
            'set_curriculum', self.set_curriculum)
        set_year_handler = CommandHandler('set_year', self.set_year)
        set_detail_handler = CommandHandler('set_detail', self.set_detail)
        timetable_handler = CommandHandler('timetable', self.timetable)
        set_autosend_handler = CommandHandler(
            'set_autosend', self.set_autosend)
        autosend_handler = CommandHandler('autosend', self.autosend)
        wiki_handler = CommandHandler('wiki', self.wiki)
        donate_a_coffee_handler = CommandHandler(
            'donate_a_coffee', self.donate_a_coffee)
        bug_report_handler = CommandHandler('bug_report', self.bug)
        change_language_handler = CommandHandler(
            'change_language', self.change_language)

        dispatcher.add_handler(start_handler)
        dispatcher.add_handler(message_handler)
        dispatcher.add_handler(help_handler)
        dispatcher.add_handler(set_course_handler)
        dispatcher.add_handler(set_curriculum_handler)
        dispatcher.add_handler(set_year_handler)
        dispatcher.add_handler(set_detail_handler)
        dispatcher.add_handler(timetable_handler)
        dispatcher.add_handler(set_autosend_handler)
        dispatcher.add_handler(autosend_handler)
        dispatcher.add_handler(wiki_handler)
        dispatcher.add_handler(donate_a_coffee_handler)
        dispatcher.add_handler(bug_report_handler)
        dispatcher.add_handler(change_language_handler)

        dispatcher.run_polling()

    '''
    This method is called when the bot is started by a new user.
    It inserts the user in the database and sends a welcome message.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def start(self, update: Update, context: CallbackContext) -> None:
        self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                       course='0', year=1, detail=2, curricula='default')
        self.db.backup('data')
        await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['start'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(version=self.__version__, link=self.__link__), parse_mode=ParseMode.HTML, disable_web_page_preview=True)

    '''
    This method is called when the bot receives a message.
    It updates the last_mess variable and handles the message with respect to other commands.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def message_handler(self, update: Update, context: CallbackContext) -> None:

        await self.__update_last_command(update)

        last_command = (None if self.db.query('last_command', key_chat_id=update.effective_chat.id)[0][
            'text'] == '' else self.db.query('last_command', key_chat_id=update.effective_chat.id)[0])

        if ('give you up' in update.message.text.lower()) or ('give u up' in update.message.text.lower()) or ('let you down' in update.message.text.lower()) or ('let u down' in update.message.text.lower()) or ('roll around' in update.message.text.lower()) or ('rick' in update.message.text.lower()):
            await context.bot.send_animation(chat_id=update.effective_chat.id,
                                             animation=open("./resources/nggyu.gif", "rb"))
        if 'egistr' in update.message.text.lower() and update.effective_chat.type != 'private':
            text = update.message.text.replace('egistr', '******')
            await context.bot.send_message(chat_id=update.effective_chat.id, text='<a href="tg://user?id={user_id}">@{username}</a>'
                                           .format(user_id=update.effective_user.id, username=update.effective_user.username) + ': ' + text, parse_mode=ParseMode.HTML)
            await context.bot.delete_message(
                chat_id=update.effective_chat.id, message_id=update.message.message_id)
        if last_command is not None and '/wiki' in last_command['text'] and self.last_mess is not None:
            await self.wiki(update, context)
        if last_command is not None and '/set_course' in last_command['text']:
            # getting ids from last_command sent
            chat_id = last_command['chat_id']
            user_id = last_command['user_id']
            # getting name and code from the message from keyboard
            course_name = update.message.text.split('[')[0].strip()
            course_code = update.message.text.split('[')[1][:-1].strip()

            curriculas = self.db.query_join('courses', 'curriculas', {
                                            'course_code1': course_code}, 'course_code1', 'code2', 'label2', course_code='course_code')

            found = {}
            with open(Path('./resources/courses.json')) as f:
                courses = json.load(f)
            for i in courses:
                if i['course_code'] == course_code:
                    found = i
            message = self.messages['set_course'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(
                course_name=course_name, link=found['site'])
            await context.bot.send_message(
                chat_id=chat_id, text=message, reply_markup=ReplyKeyboardRemove(), parse_mode=ParseMode.HTML, disable_web_page_preview=True)
            if len(self.db.query_by_ids(update.effective_chat.id)) == 0:
                self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                               course=course_code, year=1, detail=2, curricula='default')
            else:
                self.db.update('data', key_chat_id=chat_id, course=course_code)
            if len(curriculas) == 1:
                self.db.update('data', key_chat_id=chat_id,
                               curricula=curriculas[0]['code'])
            elif len(curriculas) == 0:
                self.db.update('data', key_chat_id=chat_id,
                               curricula='000-000')
                
            self.db.update('last_command', key_chat_id=chat_id, text='/start')

            self.db.backup('data')
            print('Updated user {user_id} with course {course_code}'.format(
                course_code=course_code, user_id=user_id))
        if last_command is not None and '/set_curriculum' in last_command['text']:
            chat_id = last_command['chat_id']
            user_id = last_command['user_id']

            name = update.message.text.split('[')[0].strip()
            code = update.message.text.split('[')[1][:-1].strip()

            message = 'Curricula selezionato: {name} [{code}]'.format(
                name=name, code=code)

            await context.bot.send_message(
                chat_id=chat_id, text=message, reply_markup=ReplyKeyboardRemove())

            self.db.update('data', key_chat_id=chat_id, curricula=code)

            self.db.update('last_command', key_chat_id=chat_id, text='/start')

            self.db.backup('data')
            print('Updated user {user_id} with curricula {code}'.format(
                code=code, user_id=user_id))
        if last_command is not None and '/change_language' in last_command['text']:
            chat_id = last_command['chat_id']
            user_id = last_command['user_id']

            language = self.__langs__[update.message.text]

            self.db.update('data', key_chat_id=chat_id,
                          
                           language=self.__langs__[update.message.text])

            self.db.backup('data')

            message = self.messages['lang_change'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(
                language=update.message.text)

            await context.bot.send_message(
                chat_id=chat_id, text=message, reply_markup=ReplyKeyboardRemove())

            self.db.update('last_command', key_chat_id=chat_id, text='/start')

            print('Updated user {user_id} with language {language}'.format(
                language=language, user_id=user_id))

    '''
    This method is called when the help command is sent to the bot.
    It sends a message with a link to the repository of the bot.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def help(self, update: Update, context: CallbackContext) -> None:
        await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['help'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']]
                                       .format(link=self.__link__), parse_mode=ParseMode.HTML, disable_web_page_preview=True)

    '''
    This method is called when the set_course command is sent to the bot.
    It sends a message with a list of courses and a keyboard to select one of them.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.
        
    Returns
    -------
    None
    '''
    async def set_course(self, update: Update, context: CallbackContext) -> None:
        member = await update.effective_chat.get_member(update.effective_user.id)
        if member.status == 'creator' or member.status == 'administrator' or (update.effective_chat.type == 'private' and member.status == 'member'):
            await context.bot.send_message(
                chat_id=update.effective_chat.id, text=self.messages['set_course_usage'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

            courses = self.db.query_all('courses')

            await self.__update_last_command(update)

            message_text = update.message.text.replace(
                '@' + self.which_bot, '').strip()

            page_param = 0
            if len(message_text) == 10:
                mess_len = 0
                for i in self.db.query_all('courses'):
                    mess_len += len(i['course_name'] +
                                    ' [{type}]'.format(type=Utils.get_course_type(i['site'])))
                page_num = ceil(mess_len / 4096)

                pages = self.__pages_creation(courses, page_num)
            else:
                params = Utils.parse_params(
                    '/set_course', update.message.text, self.which_bot)

                # foolproofing numeric parameters
                if len(params['numeric']) == 0:
                    page_param = 1
                elif len(params['numeric']) >= 1:
                    page_param = params['numeric'][0]
                    if len(params['numeric']) > 1:
                        await context.bot.send_message(
                            chat_id=update.effective_chat.id, text=self.messages['error_too_many_params'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

                # foolproofing text parameters
                if len(params['text']) == 0:
                    params['text'] = [' ']

                # filtering courses
                courses_filtered = []
                for i in courses:
                    if Utils.string_contains(i['course_name'], params['text']):
                        courses_filtered.append(i)

                # pages number creation
                mess_len = 0
                for i in courses_filtered:
                    mess_len += len(i['course_name'] +
                                    ' [{type}]'.format(type=Utils.get_course_type(i['site'])))
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
                keyboard = ReplyKeyboardMarkup(
                    pages[page_param], one_time_keyboard=True, selective=True)
                await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['set_course_select'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(
                    pages=page_num, page_param=page_param + 1), reply_markup=keyboard, reply_to_message_id=update.message.message_id)
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=self.messages['error_404'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
        else:
            context.bot.send_message(chat_id=update.effective_chat.id,
                                     text=self.messages['error_admin'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

    '''
    This method is called together with the set_course command.
    It creates the pages for the keyboard.

    Parameters
    ----------
    courses : list
        Contains the list of courses.
    page_num : int
        Contains the number of pages.

    Returns
    -------
    pages : list
    '''

    def __pages_creation(self, courses: list, page_num: int) -> list:
        pages = []
        last_course = 0
        for i in range(page_num):
            rows = []
            length = 0
            for j, k in zip(courses[last_course:], range(last_course, len(courses))):
                rows.append([KeyboardButton(
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

    '''
    This method is called when the set_curriculum command is sent to the bot.
    It sends a message with a list of curriculas and a keyboard to select one of them.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def set_curriculum(self, update: Update, context: CallbackContext) -> None:
        member = await update.effective_chat.get_member(update.effective_user.id)
        if member.status == 'creator' or member.status == 'administrator' or (update.effective_chat.type == 'private' and member.status == 'member'):
            curricula_regex = '^([A-Z0-9]){3}-([A-Z0-9]){3}$'

            await self.__update_last_command(update)

            course_code = self.db.query_by_ids(
                chat_id=update.effective_chat.id)[0]['course']

            params = Utils.parse_params(
                '/set_curriculum', update.message.text, self.which_bot)

            curriculas_codes = self.db.query_join('courses', 'curriculas', {
                'course_code1': course_code}, 'course_code1', 'code2', 'label2', course_code='course_code')

            if len(self.db.query_by_ids(update.effective_chat.id)) == 0:
                if len(curriculas_codes) == 1:
                    self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                                   course='0', year=1, detail=2, curricula=curriculas_codes['code'])
                else:
                    self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                                   course='0', year=1, detail=2, curricula='default')

            if course_code != '0':

                if (len(params['numeric']) == 0 and len(params['text']) == 1) and re.match(curricula_regex, params['text'][0]):
                    check_present = False
                    for i in curriculas_codes:
                        if params['text'][0] == i['code']:
                            check_present = True
                            name = i['label']

                    if check_present:

                        chat_id = update.effective_chat.id
                        user_id = update.effective_user.id

                        self.db.update('data', key_chat_id=chat_id,
                                       curricula=params['text'][0])
                        await context.bot.send_message(chat_id=update.effective_chat.id,
                                                       text=self.messages['set_curriculum'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(name=name, curr=params['text'][0]))
                        print(self.db.query_by_ids(chat_id))

                    else:
                        await context.bot.send_message(
                            chat_id=update.effective_chat.id, text=self.messages['error_404'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

                elif (len(params['numeric']) == 0 and len(params['text']) == 0):
                    rows = []
                    for i in curriculas_codes:
                        temp = []
                        temp.append(KeyboardButton('{label} [{code}]'.format(
                            label=i['label'], code=i['code'])))
                        rows.append(temp)

                    keyboard = ReplyKeyboardMarkup(
                        rows, one_time_keyboard=True, selective=True)

                    if len(rows) != 0:
                        await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['set_curriculum_select'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']],
                                                       reply_markup=keyboard, reply_to_message_id=update.message.message_id)
                    else:
                        await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['set_curriculum_no_available'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']],
                                                       reply_markup=keyboard, reply_to_message_id=update.message.message_id)

            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=self.messages['error_no_course_set'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
        else:
            await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['error_admin'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

    '''
    This method is called when the set_year command is sent to the bot.
    It sends a message with a keyboard to select the year.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.
    
    Returns
    -------
    None
    '''
    async def set_year(self, update: Update, context: CallbackContext) -> None:
        member = await update.effective_chat.get_member(update.effective_user.id)
        if member.status == 'creator' or member.status == 'administrator' or (update.effective_chat.type == 'private' and member.status == 'member'):
            await self.__update_last_command(update)

            params = Utils.parse_params(
                '/set_year', update.message.text, self.which_bot)

            if len(params['numeric']) == 1 and len(params['text']) == 0:
                if params['numeric'][0] >= 1 or params['numeric'][0] <= 5:
                    chat_id = update.effective_chat.id
                    user_id = update.effective_user.id
                    if len(self.db.query_by_ids(chat_id)) == 0:
                        self.db.insert('data', chat_id=chat_id, user_id=user_id,
                                       course='0', year=1, detail=2, curricula='default')
                    else:
                        self.db.update('data', key_chat_id=chat_id,
                                       year=params['numeric'][0])
                    self.db.backup('data')
                    await context.bot.send_message(chat_id=chat_id,
                                                   text=self.messages['set_year'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(year=params['numeric'][0]))
                    print(self.db.query_by_ids(chat_id))
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=self.messages['error_wrong_params'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
        else:
            await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['error_admin'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

    '''
    This method is called when the set_detail command is sent to the bot.
    It sets the detail of the schedule.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def set_detail(self, update: Update, context: CallbackContext) -> None:
        member = await update.effective_chat.get_member(update.effective_user.id)
        if member.status == 'creator' or member.status == 'administrator' or (update.effective_chat.type == 'private' and member.status == 'member'):
            await self.__update_last_command(update)

            params = Utils.parse_params(
                '/set_detail', update.message.text, self.which_bot)

            if len(params['numeric']) == 1 and len(params['text']) == 0:
                if params['numeric'][0] >= 1 or params['numeric'][0] <= 5:
                    chat_id = update.effective_chat.id
                    user_id = update.effective_user.id
                    if len(self.db.query_by_ids(chat_id)) == 0:
                        self.db.insert('data', chat_id=chat_id, user_id=user_id,
                                       course='0', year=1, detail=2, curricula='default')
                    else:
                        self.db.update('data', key_chat_id=chat_id,
                                       detail=params['numeric'][0])
                    self.db.backup('data')
                    await context.bot.send_message(chat_id=chat_id,
                                                   text=self.messages['set_detail'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(detail=params['numeric'][0]))
                    print(self.db.query_by_ids(chat_id))
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=self.messages['error_wrong_params'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
        else:
            await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['error_admin'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

    '''
    This method is called when the timetable command is sent to the bot.
    It sends a message with the schedule of the user.
    
    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def timetable(self, update: Update, context: CallbackContext) -> None:

        await self.__update_last_command(update)
        user = self.db.query_by_ids(
            chat_id=update.effective_chat.id)[0]
        course_code = user['course']
        city = self.db.query('courses', key_course_code=course_code)[
            0]['campus'].strip()

        print(user)

        params = Utils.parse_params(
            '/timetable', update.message.text, self.which_bot)

        if (len(params['numeric']) == 0 and len(params['text']) == 0):
            if datetime.now().hour < 15:
                params['text'].append('oggi')
            else:
                params['text'].append('domani')

        if 'oggi' in params['text']:
            await context.bot.send_message(
                chat_id=update.effective_chat.id, text=WeatherAPI.get_weather(city, 0, self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']))
        elif 'domani' in params['text']:
            await context.bot.send_message(
                chat_id=update.effective_chat.id, text=WeatherAPI.get_weather(city, 1, self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']))

        date_regex = '^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$'

        if not ((user['course'] == '0') or (user['curricula'] == 'default')):

            if (len(params['numeric']) == 0 and len(params['text']) == 1) and (re.match(date_regex, params['text'][0])):
                date = Utils.parse_date(params['text'][0])

                messages = self.__messages_creation(
                    date, update.effective_chat.id)

                message_default = self.messages['error_no_lessons_date'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(
                    date=date)

            elif (len(params['numeric']) == 0 and len(params['text']) == 1) and (Utils.check_days(params['text'][0])):
                date = Utils.date_from_days(params['text'][0])

                messages = self.__messages_creation(
                    date, update.effective_chat.id)

                message_default = self.messages['error_no_lessons'][self.db.query(
                    'data', key_chat_id=update.effective_chat.id)[0]['language']]

            else:
                messages = []
                message_default = self.messages['error_wrong_params'][self.db.query(
                    'data', key_chat_id=update.effective_chat.id)[0]['language']]

            if len(messages) == 0:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=message_default)
            for i in messages:
                await context.bot.send_message(chat_id=update.effective_chat.id, text=i,
                                               parse_mode=ParseMode.HTML, disable_web_page_preview=True)
        else:
            await context.bot.send_message(
                chat_id=update.effective_chat.id, text=self.messages['error_no_course_set'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

    '''
    This method is used to create the messages for the schedule.

    Parameters
    ----------
    date : str
        Contains the date.
    chat_id : int
        Contains the chat id.

    Returns
    -------
    messages : list
    '''

    def __messages_creation(self, date: str, chat_id: int) -> list:
        date = Utils.to_ISO8601(date)
        found = self.db.query_join('data', 'courses', {'chat_id1': str(
            chat_id)}, 'site2', 'course_codec2', course='course_code')[0]

        result = self.db.query_by_ids(
            chat_id)[0]

        schedules = UniboAPI.get_orario(found['course_codec'], Utils.get_course_type(
            found['site']), result['year'], Utils.get_course_lang(found['site']), date, curricula=result['curricula'])

        messages = []
        for i in schedules:
            messages.append(MessageCreator.get_message(
                i, result['detail'], self.db.query('data', key_chat_id=chat_id)[0]['language']))

        return messages

    '''
    This method is called when the set_autosend command is sent to the bot.
    It sets the autosend time for the user.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def set_autosend(self, update: Update, context: CallbackContext) -> None:
        time_regex = '([0-1]?[0-9]|2[0-3]):[0-5][0-9]'

        member = await update.effective_chat.get_member(update.effective_user.id)
        if member.status == 'creator' or member.status == 'administrator' or (update.effective_chat.type == 'private' and member.status == 'member'):

            await self.__update_last_command(update)

            params = Utils.parse_params(
                '/set_autosend', update.message.text, self.which_bot)

            if (len(params['numeric']) == 0) and (len(params['text']) == 1) and bool(re.match(time_regex, params['text'][0])):
                chat_id = update.effective_chat.id
                user_id = update.effective_user.id

                scheduled_time_str = Utils.idiot_time(params['text'][0])

                effective_day = 'oggi' if int(
                    scheduled_time_str[:2]) < 15 else 'domani'

                if len(self.db.query_by_ids(update.effective_chat.id)) == 0:
                    self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                                   course='0', year=1, detail=2, curricula='default', autosend_time=scheduled_time_str)
                else:
                    self.db.update(
                        'data', key_chat_id=update.effective_chat.id, autosend_time=scheduled_time_str)

                self.db.backup('data')
                await context.bot.send_message(chat_id=update.effective_chat.id,
                                               text=self.messages['set_autosend'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']].format(time=scheduled_time_str))

                if (str(chat_id)) not in self.jobs.keys():
                    self.jobs[str(chat_id)] = self.job_queue.run_repeating(self.__callback_loop, timedelta(
                        seconds=SECONDS_IN_A_DAY), first=timedelta(seconds=Utils.get_seconds(scheduled_time_str)), chat_id=chat_id, user_id=user_id, data=effective_day)
                    self.jobs[str(chat_id)].enabled = True
                else:
                    self.jobs[str(chat_id)].schedule_removal()
                    self.jobs[str(chat_id)] = self.job_queue.run_repeating(self.__callback_loop, timedelta(
                        seconds=SECONDS_IN_A_DAY), first=timedelta(seconds=Utils.get_seconds(scheduled_time_str)), chat_id=chat_id, user_id=user_id, data=effective_day)
                    self.jobs[str(chat_id)].enabled = True

                print(self.db.query_by_ids(chat_id))
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=self.messages['error_wrong_params'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
        else:
            await context.bot.send_message(chat_id=update.effective_chat.id,
                                           text=self.messages['error_admin'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

    '''
    This method is called when the autosend command is sent to the bot.
    It enables or disables the autosend for the user.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def autosend(self, update: Update, context: CallbackContext) -> None:
        member = await update.effective_chat.get_member(update.effective_user.id)
        if member.status == 'creator' or member.status == 'administrator' or (update.effective_chat.type == 'private' and member.status == 'member'):
            user = self.db.query_by_ids(
                chat_id=update.effective_chat.id)[0]
            current = bool(user['autosend'])
            user_id = user['user_id']
            chat_id = user['chat_id']

            self.db.update(
                'data', key_chat_id=update.effective_chat.id, autosend=int(not current))

            effective_day = 'oggi' if int(
                user['autosend_time'][:2]) < 15 else 'domani'

            scheduled_time_str = user['autosend_time']

            if not current:  # enabling autosend
                if (str(chat_id)) not in self.jobs.keys():
                    self.jobs[str(chat_id)] = self.job_queue.run_repeating(self.__callback_loop, timedelta(
                        seconds=SECONDS_IN_A_DAY), first=timedelta(seconds=Utils.get_seconds(scheduled_time_str)), chat_id=chat_id, user_id=user_id, data=effective_day)
                    self.jobs[str(chat_id)].enabled = True
                else:
                    self.jobs[str(chat_id)].enabled = True

                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=self.messages['autosend_enabled'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
            else:
                if (str(chat_id)) not in self.jobs.keys():
                    self.jobs[str(chat_id)] = self.job_queue.run_repeating(self.__callback_loop, timedelta(
                        seconds=SECONDS_IN_A_DAY), first=timedelta(seconds=Utils.get_seconds(scheduled_time_str)), chat_id=chat_id, user_id=user_id, data=effective_day)
                    self.jobs[str(chat_id)].enabled = False
                else:
                    self.jobs[str(chat_id)].enabled = False
                await context.bot.send_message(
                    chat_id=update.effective_chat.id, text=self.messages['autosend_disabled'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
        else:
            await context.bot.send_message(chat_id=update.effective_chat.id,
                                           text=self.messages['error_admin'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])

    '''
    This method is called when the timetable command is sent to the bot.
    It parses some text like 'oggi' or 'domani' and sends the schedule of the user.

    Parameters
    ----------
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def __orario_autosend(self, context: CallbackContext) -> None:
        day = context.job.data
        chat_id = context.job.chat_id

        date = Utils.date_from_days(day)

        course_code = self.db.query_by_ids(
            chat_id=chat_id)[0]['course']
        city = self.db.query('courses', key_course_code=course_code)[
            0]['campus'].strip()

        messages = self.__messages_creation(
            date, chat_id)

        message_default = self.messages['error_no_lessons_date'][self.db.query('data', key_chat_id=chat_id)[0]['language']].format(
            date=date)

        try:
            if 'oggi' in day:
                await context.bot.send_message(
                    chat_id=chat_id, text=WeatherAPI.get_weather(city, 0, self.db.query('data', key_chat_id=chat_id)[0]['language']))
            elif 'domani' in day:
                await context.bot.send_message(
                    chat_id=chat_id, text=WeatherAPI.get_weather(city, 1, self.db.query('data', key_chat_id=chat_id)[0]['language']))

            if len(messages) == 0:
                await context.bot.send_message(
                    chat_id=chat_id, text=message_default)
            for i in messages:
                await context.bot.send_message(chat_id=chat_id, text=i,
                                               parse_mode=ParseMode.HTML, disable_web_page_preview=True)
        except Forbidden as e:
            # user blocked the bot, so set the autosend to False
            self.db.update(
                'data', key_chat_id=chat_id, autosend=0)
            self.jobs[str(chat_id)].schedule_removal()
            print('User {id} blocked the bot, autosend disabled.'.format(
                id=context.job.user_id))

    '''
    This method is used for the callback of a scheduled job.

    Parameters
    ----------
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def __callback_loop(self, context: CallbackContext) -> None:
        await self.__orario_autosend(context)

    '''
    This method is called when the wiki command is sent to the bot.
    It sends a message with the wikipedia page of the argument sent to the bot.
    If the page is not unique, it sends a message with a keyboard to select the page.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def wiki(self, update: Update, context: CallbackContext) -> None:

        await self.__update_last_command(update)

        if '/wiki@{bot}'.format(bot=self.which_bot) in update.message.text:
            text = update.message.text[(7 + len(self.which_bot)):]
        elif '/wiki' in update.message.text:
            text = update.message.text[6:]
        else:
            text = update.message.text

        if text == '' or text.isspace():
            await context.bot.send_message(chat_id=update.effective_chat.id,
                                           text=self.messages['error_404'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
            return

        results = WikipediaAPI.pages(text)
        if len(results['names']) != 0:
            if self.last_mess is not None and self.last_mess.lower() == text.lower():
                index = results['names'].index(text)
                url = results['links'][index]
                await self.__temp_func(url, update, context)
            else:
                self.last_mess = text
                if results['single']:
                    url = results['links']
                    await self.__temp_func(url, update, context)
                else:
                    rows = []
                    for i in results['names']:
                        temp = []
                        temp.append(KeyboardButton(i))
                        rows.append(temp)
                    keyboard = ReplyKeyboardMarkup(
                        rows, one_time_keyboard=True, selective=True)
                    await context.bot.send_message(
                        chat_id=update.effective_chat.id, text=self.messages['wiki_sel'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']], reply_markup=keyboard, reply_to_message_id=update.message.message_id)
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id, text=self.messages['error_404'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
            self.last_mess = None

    '''
    This method is called when the wiki command is sent to the bot.
    It manages the exceptions of te wikipedia API.
    At the end, it sends a message with the summary of the page.

    Parameters
    ----------
    url_ : str
        Contains the url of the wikipedia page.
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    # function defined for optimization
    async def __temp_func(self, url_: str, update: Update, context: CallbackContext) -> None:

        try:
            message = WikipediaAPI.summary(url_)
            await context.bot.send_message(chat_id=update.effective_chat.id,
                                           text=message, reply_markup=ReplyKeyboardRemove())
        except BadRequest as e:
            if str(e) == 'Message is too long':
                await context.bot.send_message(chat_id=update.effective_chat.id,
                                               text=self.__long_mess_fix(message), reply_markup=ReplyKeyboardRemove())

        self.last_mess = None

        self.db.update('last_command', key_chat_id=update.effective_chat.id, text='/start')

    '''
    This method is used to fix the message too long error by cutting the message.

    Parameters
    ----------
    message : str
        Contains the message.
        
    Returns
    -------
    message : str
    '''

    def __long_mess_fix(self, message: str) -> str:
        message = message[:4095]
        message = message[::-1]
        message = message[message.find('.'):]
        message = message[::-1]
        return message

    '''
    This method is called when the bug_report command is sent to the bot.
    It sends a message with the link to the repository of the bot.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def bug(self, update: Update, context: CallbackContext) -> None:

        await self.__update_last_command(update)

        await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['bug_report'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']]
                                       .format(link=self.__link__ + '/issues'), parse_mode=ParseMode.HTML)

    '''
    This method is used to update the last command sent to the bot.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.

    Returns
    -------
    None
    '''
    async def __update_last_command(self, update: Update) -> None:
        if len(self.db.query('data', key_chat_id=update.effective_chat.id)) == 0:
            self.db.insert('data', chat_id=update.effective_chat.id, user_id=update.effective_user.id,
                           course='0', year=1, detail=2, curricula='default')
        if '/' in update.message.text:
            self.db.insert('last_command', chat_id=update.effective_chat.id,
                           user_id=update.effective_user.id, text=update.message.text)
            self.db.update(
                'last_command', key_chat_id=update.effective_chat.id, text=update.message.text)

    '''
    This method is called when the donate_a_coffee command is sent to the bot.
    It sends a message with the link to donate to the bot.

    Parameters
    ----------
    update : telegram.Update
        Contains the update object.
    context : telegram.ext.CallbackContext
        Contains the context object.

    Returns
    -------
    None
    '''
    async def donate_a_coffee(self, update: Update, context: CallbackContext) -> None:
        await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['coffee'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']])
        await context.bot.send_message(chat_id=update.effective_chat.id, text='<a href="https://paypal.me/Grufoony?locale.x=it_IT">Paypal</a>', parse_mode=ParseMode.HTML)

    async def change_language(self, update: Update, context: CallbackContext) -> None:

        await self.__update_last_command(update)

        rows = []
        for lang, id in self.__langs__.items():
            temp = []
            temp.append(KeyboardButton(lang))
            rows.append(temp)
        keyboard = ReplyKeyboardMarkup(
            rows, one_time_keyboard=True, selective=True)
        await context.bot.send_message(chat_id=update.effective_chat.id, text=self.messages['lang_change_menu'][self.db.query('data', key_chat_id=update.effective_chat.id)[0]['language']],
                                          reply_markup=keyboard, reply_to_message_id=update.message.message_id)



if __name__ == '__main__':

    if sys.argv[1] == 'test':
        with open(Path('./keys/test.txt')) as f:
            token = f.readline()
            which_bot = 'orari_unibo_bot'
    elif sys.argv[1] == 'launch':
        with open(Path('./keys/token.txt')) as f:
            token = f.readline()
            which_bot = 'the_unibot'

    bot = the_unibot(token, which_bot)
