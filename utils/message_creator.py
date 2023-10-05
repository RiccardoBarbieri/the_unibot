import sys  # nopep8
sys.path.append('.')  # nopep8
from api import UniboAPI
import json
from pathlib import Path


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
    def get_message(schedule, lvl, lang: str):
        message = '{time}\n{course_name}'.format(
            course_name=schedule['title'], time=schedule['time'])

        with open(Path('./resources/lang.json')) as file:
            msg = json.load(file)

        if (lvl == 2):
            message += '\n' + msg['place'][lang] + schedule['location']
        elif (lvl == 3):
            message += '\nCFU: {cfu}\n{teacher}{name}\n{place}{location}'\
                .format(location=schedule['location'], place=msg['place'][lang], cfu=schedule['cfu'], teacher=msg['professor'][lang], name=schedule['docente'])
            if schedule['teledidattica'] == 'True':
                message += '\n{online}'.format(
                    online=msg['online_lecture'][lang])
        if lvl > 1 and schedule['teams'] is not None:
            message += '\n<a href="{teams}">{link}</a>'.format(
                teams=schedule['teams'], link=msg['lecture_link'][lang])
        return message

    @staticmethod
    def get_lv1_message(corso, anno, date_exact, curricula='000-000'):
        schedule = UniboAPI.get_orario(corso, anno, date_exact, curricula)
        message = '{time}\n{course_name}'.format(
            course_name=schedule['title'], time=schedule['time'])
        return message

    @staticmethod
    def get_lv2_message(corso, anno, date_exact, curricula='000-000'):
        schedule = UniboAPI.get_orario(corso, anno, date_exact, curricula)
        message = '{time}\n{course_name}\nLuogo: {location}\n<a href="{teams}">link</a>'.format(
            time=schedule['time'], course_name=schedule['title'], location=schedule['location'], teams=schedule['teams'])
        return message

    @staticmethod
    def get_lv3_message(corso, anno, date_exact, curricula='000-000'):
        schedule = UniboAPI.get_orario(corso, anno, date_exact, curricula)
        message = '{time}\n{course_name}\nCFU: {cfu}\nDocente: {teacher}\nLuogo: {location}\nTeledidattica obbligatoria: {dad}\nLink lezione: <a href="{teams}">link</a>'\
            .schedule(time=schedule['time'], course_name=schedule['title'], location=schedule['location'], cfu=schedule['cfu'], teacher=schedule['docente'], dad=schedule['teledidattica'], teams=schedule['teams'])
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
