import sys
import getpass
if getpass.getuser() == 'ricca':
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram') #TODO: change this path when migrating to another platform
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
from api import UniboAPI
from telegram.parsemode import ParseMode
from telegram.ext import Updater
from telegram.ext import CommandHandler, MessageHandler, Filters
import logging
from pathlib import Path
from database.database import Database
from pathlib import Path
import wikipedia
import telegram


db = Database(Path('./database/telegram.db'))

def sub(string, substring): #funzione che censura la substring
    start = string.find(substring)
    end = len(substring) + start
    ast = '*'*len(substring)
    return string[:start] + ast + string[end:]

with open(Path('./bot/token.txt')) as f:
    token = f.readline()

wikipedia.set_lang('it')

updater = Updater(token = token, use_context = True)
dispatcher = updater.dispatcher

last_mess = None

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

def start(update, context):
    db.insert(update.effective_chat.id, update.effective_user.id)
    context.bot.send_message(chat_id = update.effective_chat.id, text = str(db.query_all()))


def misc(update, context):
    if 'piedi' in update.message.text.lower():
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Qualcuno ha detto PIEDI????')
        context.bot.send_photo(chat_id = update.effective_chat.id, photo = 'https://www.benesserecorpomente.it/wp-content/uploads/2017/03/Piedi.jpg')
    if 'egistr' in update.message.text.lower():
        text = update.message.text
        context.bot.send_message(chat_id = update.effective_chat.id, text = '<a href="tg://user?id={user_id}">@{username}</a>'\
        .format(user_id = update.effective_user.id, username = update.effective_user.username) + ': ' + sub(text, 'egistr'), parse_mode = ParseMode.HTML)
        context.bot.delete_message(chat_id = update.effective_chat.id, message_id = update.message.message_id)
    if '/wiki' in last_mess.text:
        # info = wikipedia.summary(update.message.text)
        # context.bot.send_message(chat_id = update.effective_chat.id, text = info)
        wiki(update, context)

def search_corso(update, context):
    pass # to implement

def set_corso(update, context):
    pass # to implement

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

def bug(update, context):
    context.bot.send_message(chat_id = update.effective_chat.id, text = 'Si può segnalare un bug/suggerire un miglioramento sulla <a href="{link}">repository</a> del bot'\
    .format(link = 'https://github.com/RiccardoBarbieri/t_bot'), parse_mode = ParseMode.HTML)

def wiki(update, context): #alpha state
    global last_mess
    if '/wiki' in update.message.text:
        last_mess = update.message
    text = update.message.text
    info = ''
    try:
        info = wikipedia.summary(text[6:])
        context.bot.send_message(chat_id = update.effective_chat.id, text = info)
    except wikipedia.exceptions.DisambiguationError as e:
        rows = []
        for i in e.options:
            temp = []
            temp.append(telegram.KeyboardButton(i))
            rows.append(temp)
        keyboard = telegram.ReplyKeyboardMarkup(rows, one_time_keyboard = True)
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Seleziona la pagina', reply_markup = keyboard)
    except wikipedia.exceptions.PageError:
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Pagina non disponibile')
        

start_handler = CommandHandler('start', start)
misc_handler = MessageHandler(Filters.text & (~Filters.command), misc)
search_corso_handler = CommandHandler('search_corso', search_corso)
set_corso_handler = CommandHandler('set_corso', set_corso)
set_anno_handler = CommandHandler('set_anno', set_anno)
set_autosend_handler = CommandHandler('set_autosend', set_autosend)
autosend_handler = CommandHandler('autosend', autosend)
orario_handler = CommandHandler('orario', orario)
set_detail_handler = CommandHandler('set_detail', set_detail)
bug_report_handler = CommandHandler('bug_report', bug)
wiki_handler = CommandHandler('wiki', wiki)

dispatcher.add_handler(start_handler)
dispatcher.add_handler(misc_handler)
dispatcher.add_handler(search_corso_handler)
dispatcher.add_handler(set_corso_handler)
dispatcher.add_handler(set_anno_handler)
dispatcher.add_handler(set_autosend_handler)
dispatcher.add_handler(autosend_handler)
dispatcher.add_handler(orario_handler)
dispatcher.add_handler(set_detail_handler)
dispatcher.add_handler(bug_report_handler)
dispatcher.add_handler(wiki_handler)

updater.start_polling()