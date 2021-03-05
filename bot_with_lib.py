from telegram.ext import Updater
from telegram.ext import CommandHandler, MessageHandler, Filters
import logging


token = '1505488376:AAFHVl4kNUSrsTpV_Pve8MFT6RFmEJArAlk'

updater = Updater(token = token, use_context = True)
dispatcher = updater.dispatcher

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

def start(update, context):
    context.bot.send_message(chat_id = update.effective_chat.id, text = 'Test')

def echo(update, context):
    if 'piedi' in update.message.text:
        context.bot.send_message(chat_id = update.effective_chat.id, text = 'Piedi')

start_handler = CommandHandler('start', start)
echo_handler = MessageHandler(Filters.text & (~Filters.command), echo)

dispatcher.add_handler(start_handler)
dispatcher.add_handler(echo_handler)

updater.start_polling()