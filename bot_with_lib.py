from telegram.ext import Updater
from telegram.ext import CommandHandler, MessageHandler, Filters
import logging

def sub(string, substring): #funzione che censura la substring
    start = string.find(substring)
    end = len(substring) + start
    ast = '*'*len(substring)
    return string[:start] + ast + string[end:]

token = '1505488376:AAFHVl4kNUSrsTpV_Pve8MFT6RFmEJArAlk'

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

start_handler = CommandHandler('start', start)
misc_handler = MessageHandler(Filters.text & (~Filters.command), misc)

dispatcher.add_handler(start_handler)
dispatcher.add_handler(misc_handler)

updater.start_polling()
