import sys  # nopep8
sys.path.append('.')  # nopep8
import json
from pathlib import Path


class MessageCreator():
    @staticmethod
    def create_message(schedule, lvl, lang: str):
        message = '{time}\n{course_name}'.format(
            course_name=schedule['title'], time=schedule['time'])

        with open(Path('./resources/lang.json')) as file:
            msg = json.load(file)

        if (lvl == 2):
            message += '\n' + msg['place'][lang] + schedule['location']
        elif (lvl == 3):
            message += '\nCFU: {cfu}\n{teacher}{name}\n{place}{location}\n{online}{dad}'\
                .format(location=schedule['location'], place=msg['place'][lang], cfu=schedule['cfu'], teacher=msg['professor'][lang], name=schedule['docente'], online=msg['online_lecture'][lang], dad=schedule['teledidattica'])
        if lvl > 1 and schedule['teams'] is not None:
            message += '\n<a href="{teams}">{link}</a>'.format(
                teams=schedule['teams'], link=msg['lecture_link'][lang])
        return message