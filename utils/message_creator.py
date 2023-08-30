import sys
sys.path.append('.')
from api import UniboAPI

class MessageCreator():

    # @staticmethod
    # def get_lv1_messages(corso, anno, date_start, date_end, curricula = '000-000'):
    #     schedule = UniboAPI.get_orario(corso, anno, date_start, date_end, curricula)

    # @staticmethod
    # def get_lv2_messages(corso, anno, date_start, date_end, curricula = '000-000'):
    #     schedule = UniboAPI.get_orario(corso, anno, date_start, date_end, curricula)
    
    # @staticmethod
    # def get_lv3_messages(corso, anno, date_start, date_end, curricula = '000-000'):
    #     schedule = UniboAPI.get_orario(corso, anno, date_start, date_end, curricula)

    @staticmethod
    def get_message(schedule, lvl):
        message = '{time}\n{course_name}'.format(course_name = schedule['title'], time = schedule['time'])
        
        if (lvl == 2):
            message += '\nLuogo: {location}'.format(location = schedule['location'])
        elif (lvl == 3):
            message += '\nCFU: {cfu}\nDocente: {teacher}\nLuogo: {location}\nTeledidattica obbligatoria: {dad}'\
            .format(location = schedule['location'], cfu = schedule['cfu'], teacher = schedule['docente'], dad = schedule['teledidattica'])
        if lvl > 1 and schedule['teams'] is not None:
            message += '\n<a href="{teams}">Link lezione</a>'.format(teams = schedule['teams'])
        return message

    @staticmethod
    def get_lv1_message(corso, anno, date_exact, curricula = '000-000'):
        schedule = UniboAPI.get_orario(corso, anno, date_exact, curricula)
        message = '{time}\n{course_name}'.format(course_name = schedule['title'], time = schedule['time'])
        return message

    @staticmethod
    def get_lv2_message(corso, anno, date_exact, curricula = '000-000'):
        schedule = UniboAPI.get_orario(corso, anno, date_exact, curricula)
        message = '{time}\n{course_name}\nLuogo: {location}\n<a href="{teams}">link</a>'.format(time = schedule['time'], course_name = schedule['title'], location = schedule['location'], teams = schedule['teams'])
        return message

    @staticmethod
    def get_lv3_message(corso, anno, date_exact, curricula = '000-000'):
        schedule = UniboAPI.get_orario(corso, anno, date_exact, curricula)
        message = '{time}\n{course_name}\nCFU: {cfu}\nDocente: {teacher}\nLuogo: {location}\nTeledidattica obbligatoria: {dad}\nLink lezione: <a href="{teams}">link</a>'\
        .schedule(time = schedule['time'], course_name = schedule['title'], location = schedule['location'], cfu = schedule['cfu'], teacher = schedule['docente'], dad = schedule['teledidattica'], teams = schedule['teams'])
        return message





# send_message(chat_id=chat_id, text='<b>Example message</b>', parse_mode=telegram.ParseMode.HTML)

# /*
# 9:00 - 12:00
# FONDAMENTI DI TELECOMUNICAZIONI T
# CFU: 9
# Docente: Carlo Caini
# Luogo: AULA 6.2 Piano Secondo Facoltà di Ingegneria dell'Università di Bologna
# Teledidattica obbligatoria: False
# Link lezione: Teams
# */