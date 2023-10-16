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
        message = f'{schedule["time"]}\n{schedule["title"]}'

        with open(Path("./resources/lang.json")) as file:
            msg = json.load(file)

        if lvl == 2:
            message += f'\n{msg["place"][lang]}{schedule["location"]}'
        elif lvl == 3:
            message += f'\nCFU: {schedule["cfu"]}'
            message += f'\n{msg["professor"][lang]}{schedule["docente"]}'
            message += f'\n{msg["place"][lang]}{schedule["location"]}'
            if schedule["teledidattica"] == "True":
                message += f'\n{msg["online_lecture"][lang]}'
        if lvl > 1 and schedule["teams"] is not None:
            message += (
                f'\n<a href="{schedule["teams"]}">{msg["lecture_link"][lang]}</a>'
            )
        return message
