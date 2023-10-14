import json
from pathlib import Path


class MessageCreator:
    """
    This class is used to create the message to send to the user

    Methods
    -------
        create_message(schedule, lvl, lang: str) -> str
            creates the message to send to the user"""

    @staticmethod
    def create_message(schedule, lvl, lang: str):
        """
        This function creates the message to send to the user

        Parameters
        ----------
            schedule: dict
                the schedule of the course
            lvl: int
                the level of the message
            lang: str
                the language of the message

        Returns
        -------
            string
                the message to send to the user
        """
        message = "{time}\n{course_name}".format(
            course_name=schedule["title"], time=schedule["time"]
        )

        with open(Path("./resources/lang.json")) as file:
            msg = json.load(file)

        if lvl == 2:
            message += "\n" + msg["place"][lang] + schedule["location"]
        elif lvl == 3:
            message += "\nCFU: {cfu}\n{teacher}{name}\n{place}{location}".format(
                location=schedule["location"],
                place=msg["place"][lang],
                cfu=schedule["cfu"],
                teacher=msg["professor"][lang],
                name=schedule["docente"],
            )
            if schedule["teledidattica"] == "True":
                message += "\n{online}".format(online=msg["online_lecture"][lang])
        if lvl > 1 and schedule["teams"] is not None:
            message += '\n<a href="{teams}">{link}</a>'.format(
                teams=schedule["teams"], link=msg["lecture_link"][lang]
            )
        return message
