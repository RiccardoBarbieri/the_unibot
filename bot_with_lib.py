from telegram.ext import Updater
from telegram.ext import CommandHandler, MessageHandler, Filters
import logging

def sub(string, substring): #funzione che censura la substring
    start = string.find(substring)
    end = len(substring) + start
    ast = '*'*len(substring)
    return string[:start] + ast + string[end:]

with open('token.txt') as f:
    token = f.readline()
    

updater = Updater(token = token, use_context = True)
dispatcher = updater.dispatcher

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

def start(update, context):
    context.bot.send_message(chat_id = update.effective_chat.id, text = 'Test')

def misc(update, context):
    if 'piedi' in update.message.text:
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Qualcuno ha detto PIEDI????')
        context.bot.send_photo(chat_id = update.effective_chat.id, photo = 'https://www.benesserecorpomente.it/wp-content/uploads/2017/03/Piedi.jpg')
    if 'egistr' in update.message.text:
        text = update.message.text
        context.bot.send_message(chat_id = update.effective_chat.id, text = update.message.from_user.first_name + ': ' + sub(text, 'egistr'))
        context.bot.delete_message(chat_id = update.effective_chat.id, message_id = update.message.message_id)

def search_corso(update, context):
    pass

def set_corso(update, context):
    pass

def set_anno(update, context):
    pass

def set_autosend(update, context):
    pass

def autosend(update, context):
    pass

def orario(update, context):
    pass

def bug(update, context):
    context.bot.send_message(chat_id = update.effective_chat.id, text = 'Si può segnalare un bug/suggerire un miglioramento sulla repository del bot: ' + 'https://github.com/RiccardoBarbieri/t_bot')

start_handler = CommandHandler('start', start)
misc_handler = MessageHandler(Filters.text & (~Filters.command), misc)
search_corso_handler = CommandHandler('search_corso', search_corso)
set_corso_handler = CommandHandler('set_corso', set_corso)
set_anno_handler = CommandHandler('set_anno', set_anno)
set_autosend_handler = CommandHandler('set_autosend', set_autosend)
autosend_handler = CommandHandler('autosend', autosend)
orario_handler = CommandHandler('orario', orario)
bug_report_handler = CommandHandler('bug_report', bug)

dispatcher.add_handler(start_handler)
dispatcher.add_handler(misc_handler)
dispatcher.add_handler(search_corso_handler)
dispatcher.add_handler(set_corso_handler)
dispatcher.add_handler(set_anno_handler)
dispatcher.add_handler(set_autosend_handler)
dispatcher.add_handler(autosend_handler)
dispatcher.add_handler(orario_handler)
dispatcher.add_handler(bug_report_handler)

updater.start_polling()