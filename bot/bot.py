import sys
import logging
import json
import re
from pathlib import Path
from math import ceil
from datetime import datetime
from typing import Dict

from telegram import (
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    KeyboardButton,
    Update,
    Bot,
)
from telegram.error import BadRequest, Forbidden, ChatMigrated
from telegram.constants import ParseMode
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    Updater,
    CallbackContext,
    JobQueue,
    Job,
    filters,
)

from api.unibo import UniboAPI
from api import WikipediaAPI, WeatherAPI
from utils import Utils, MessageCreator
from database import Database


class the_unibot:
    """
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
    """

    __version__ = "2023.10.23"
    __author__ = "Riccardo Barbieri, Gregorio Berselli"
    __link__ = "https://github.com/RiccardoBarbieri/the_unibot"
    __langs__ = {"English": "en", "Italiano": "it"}

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

    def __init__(self, token, which_bot) -> None:
        """
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
        """
        self.which_bot = which_bot

        self.jobs: Dict[str, Job] = {}

        self.bot = Bot(token=token)
        self.updater = Updater(bot=self.bot, update_queue=None)

        with open(Path("./resources/lang.json")) as file:
            self.messages = json.load(file)

        dispatcher = ApplicationBuilder().token(token).build()

        class OnlyDEBUGFilter(logging.Filter):
            def filter(self, record):
                return record.levelno == logging.DEBUG

        logging.getLogger("bot.py").addFilter(OnlyDEBUGFilter())

        logging.basicConfig(
            format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            level=logging.WARNING,
        )

        logging.getLogger("bot.py").setLevel(logging.DEBUG)

        self.db = Database(Path("./database/telegram.db"))

        self.job_queue = dispatcher.job_queue

        for i in self.db.query_all("data"):
            scheduled_time_str = Utils.idiot_time(i["autosend_time"])
            effective_day = "today" if int(scheduled_time_str[:2]) < 18 else "tomorrow"
            chat_id = i["chat_id"]
            user_id = i["user_id"]
            if bool(i["autosend"]):
                self.jobs[str(chat_id)] = self.job_queue.run_daily(
                    self.__callback_loop,
                    time=Utils.parse_time(scheduled_time_str),
                    days=(0, 1, 2, 3, 4, 5, 6),
                    chat_id=chat_id,
                    user_id=user_id,
                    data=effective_day,
                )

        start_handler = CommandHandler("start", self.start)
        message_handler = MessageHandler(
            filters.TEXT & (~filters.COMMAND), self.message_handler
        )
        help_handler = CommandHandler("help", self.help)
        set_course_handler = CommandHandler("set_course", self.set_course)
        set_curriculum_handler = CommandHandler("set_curriculum", self.set_curriculum)
        set_year_handler = CommandHandler("set_year", self.set_year)
        set_detail_handler = CommandHandler("set_detail", self.set_detail)
        timetable_handler = CommandHandler("timetable", self.timetable)
        set_autosend_handler = CommandHandler("set_autosend", self.set_autosend)
        autosend_handler = CommandHandler("autosend", self.autosend)
        wiki_handler = CommandHandler("wiki", self.wiki)
        donate_a_coffee_handler = CommandHandler(
            "donate_a_coffee", self.donate_a_coffee
        )
        bug_report_handler = CommandHandler("bug_report", self.bug)
        change_language_handler = CommandHandler(
            "change_language", self.change_language
        )
        reset_handler = CommandHandler("reset", self.reset)
        hide_handler = CommandHandler("hide", self.hide)
        show_handler = CommandHandler("show", self.show)

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
        dispatcher.add_handler(reset_handler)
        dispatcher.add_handler(hide_handler)
        dispatcher.add_handler(show_handler)

        dispatcher.run_polling()

    async def start(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        if len(self.db.query_by_ids(update.effective_chat.id)) == 0:
            self.db.insert(
                "data",
                chat_id=update.effective_chat.id,
                user_id=update.effective_user.id,
                course="0",
                year=1,
                detail=2,
                curricula="default",
            )
            self.db.backup("data")
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text=self.messages["start"][
                self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                    "language"
                ]
            ].format(version=self.__version__, link=self.__link__),
            parse_mode=ParseMode.HTML,
            disable_web_page_preview=True,
        )

    async def message_handler(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        await self.__update_last_command(update)

        last_command = (
            None
            if self.db.query("last_command", key_chat_id=update.effective_chat.id)[0][
                "text"
            ]
            == ""
            else self.db.query("last_command", key_chat_id=update.effective_chat.id)[0]
        )

        if (
            ("give you up" in update.message.text.lower())
            or ("give u up" in update.message.text.lower())
            or ("let you down" in update.message.text.lower())
            or ("let u down" in update.message.text.lower())
            or ("roll around" in update.message.text.lower())
            or ("rick" in update.message.text.lower())
        ):
            await context.bot.send_animation(
                chat_id=update.effective_chat.id,
                animation=open("./resources/nggyu.gif", "rb"),
            )
        if (
            "egistr" in update.message.text.lower()
            and update.effective_chat.type != "private"
        ):
            text = update.message.text.replace("egistr", "******")
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text='<a href="tg://user?id={user_id}">@{username}</a>'.format(
                    user_id=update.effective_user.id,
                    username=update.effective_user.username,
                )
                + ": "
                + text,
                parse_mode=ParseMode.HTML,
            )
            await context.bot.delete_message(
                chat_id=update.effective_chat.id, message_id=update.message.message_id
            )
        if (
            last_command is not None
            and "/wiki" in last_command["text"]
            and self.last_mess is not None
        ):
            await self.wiki(update, context)
        if last_command is not None and "/set_course" in last_command["text"]:
            # getting ids from last_command sent
            chat_id = last_command["chat_id"]
            user_id = last_command["user_id"]
            # getting name and code from the message from keyboard
            course_name = update.message.text.split("[")[0].strip()
            course_code = update.message.text.split("[")[1][:-1].strip()

            curriculas = self.db.query_join(
                "courses",
                "curriculas",
                {"course_code1": course_code},
                "course_code1",
                "code2",
                "label2",
                course_code="course_code",
            )

            found = {}
            with open(Path("./resources/courses.json"), "r") as file:
                courses = json.load(file)
            for i in courses:
                if i["course_code"] == course_code:
                    found = i
            message = self.messages["set_course"][
                self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                    "language"
                ]
            ].format(course_name=course_name, link=found["site"])
            await context.bot.send_message(
                chat_id=chat_id,
                text=message,
                reply_markup=ReplyKeyboardRemove(),
                parse_mode=ParseMode.HTML,
                disable_web_page_preview=True,
            )
            if len(self.db.query_by_ids(update.effective_chat.id)) == 0:
                self.db.insert(
                    "data",
                    chat_id=update.effective_chat.id,
                    user_id=update.effective_user.id,
                    course=course_code,
                    year=1,
                    detail=2,
                    curricula="default",
                )
            else:
                self.db.update("data", key_chat_id=chat_id, course=course_code)
            if len(curriculas) == 1:
                self.db.update(
                    "data", key_chat_id=chat_id, curricula=curriculas[0]["code"]
                )
            elif len(curriculas) == 0:
                self.db.update("data", key_chat_id=chat_id, curricula="000-000")

            self.db.update("last_command", key_chat_id=chat_id, text="/start")

            self.db.backup("data")
            logging.getLogger("bot.py").debug(f"Updated user {user_id} with course {course_code}")
        if last_command is not None and "/set_curriculum" in last_command["text"]:
            chat_id = last_command["chat_id"]
            user_id = last_command["user_id"]

            name = update.message.text.split("[")[0].strip()
            code = update.message.text.split("[")[1][:-1].strip()

            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["set_curriculum"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ].format(name=name, curr=code),
                reply_markup=ReplyKeyboardRemove(),
            )

            self.db.update("data", key_chat_id=chat_id, curricula=code)

            self.db.update("last_command", key_chat_id=chat_id, text="/start")

            self.db.backup("data")
            logging.getLogger("bot.py").debug(f"Updated user {user_id} with curricula {code}")
        if last_command is not None and "/change_language" in last_command["text"]:
            chat_id = last_command["chat_id"]
            user_id = last_command["user_id"]

            language = self.__langs__[update.message.text]

            self.db.update(
                "data",
                key_chat_id=chat_id,
                language=self.__langs__[update.message.text],
            )

            self.db.backup("data")

            message = self.messages["lang_change"][
                self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                    "language"
                ]
            ].format(language=update.message.text)

            await context.bot.send_message(
                chat_id=chat_id, text=message, reply_markup=ReplyKeyboardRemove()
            )

            self.db.update("last_command", key_chat_id=chat_id, text="/start")
            logging.getLogger("bot.py").debug(f"Updated user {user_id} with language {language}")

    async def help(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text=self.messages["help"][
                self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                    "language"
                ]
            ].format(link=self.__link__),
            parse_mode=ParseMode.HTML,
            disable_web_page_preview=True,
        )

    async def set_course(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["set_course_usage"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

            courses = self.db.query_all("courses")

            await self.__update_last_command(update)

            message_text = update.message.text.replace("@" + self.which_bot, "").strip()

            page_param = 0
            if len(message_text) == 10:
                mess_len = 0
                for i in self.db.query_all("courses"):
                    mess_len += len(
                        i["course_name"] + f" [{Utils.get_course_type(i['site'])}]"
                    )
                page_num = ceil(mess_len / 4096)

                pages = self.__pages_creation(courses, page_num)
            else:
                params = Utils.parse_params(
                    "/set_course", update.message.text, self.which_bot
                )

                # foolproofing numeric parameters
                if len(params["numeric"]) == 0:
                    page_param = 1
                elif len(params["numeric"]) >= 1:
                    page_param = params["numeric"][0]
                    if len(params["numeric"]) > 1:
                        await context.bot.send_message(
                            chat_id=update.effective_chat.id,
                            text=self.messages["error_too_many_params"][
                                self.db.query(
                                    "data", key_chat_id=update.effective_chat.id
                                )[0]["language"]
                            ],
                        )

                # foolproofing text parameters
                if len(params["text"]) == 0:
                    params["text"] = [" "]

                # filtering courses
                courses_filtered = []
                for i in courses:
                    if Utils.string_contains(i["course_name"], params["text"]):
                        courses_filtered.append(i)

                # pages number creation
                mess_len = 0
                for i in courses_filtered:
                    mess_len += len(
                        i["course_name"] + f" [{Utils.get_course_type(i['site'])}]"
                    )
                page_num = ceil(mess_len / 4096)

                # adapting page_param
                page_param = min(page_param, page_num)
                if page_param <= 0:
                    page_param = 1
                page_param -= 1

                # pages creation
                pages = self.__pages_creation(courses_filtered, page_num)

            if pages:  # if pages is not empty
                keyboard = ReplyKeyboardMarkup(
                    pages[page_param], one_time_keyboard=True, selective=True
                )
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["set_course_select"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ].format(pages=page_num, page_param=page_param + 1),
                    reply_markup=keyboard,
                    reply_to_message_id=update.message.message_id,
                )
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["error_404"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ],
                )
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    def __pages_creation(self, courses: list, page_num: int) -> list:
        """
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
        """
        pages = []
        last_course = 0
        for i in range(page_num):
            rows = []
            length = 0
            for j, k in zip(courses[last_course:], range(last_course, len(courses))):
                rows.append(
                    [KeyboardButton(j["course_name"] + f" [{j['course_code']}]")]
                )
                length += len(j["course_name"] + f" [{j['course_code']}]")
                last_course = k
                if length > 4095:
                    break
            pages.append(rows)
        for i in range(1, page_num):
            # removing first element (duplicate) for each page
            pages[i] = pages[i][1:]
        return pages

    async def set_curriculum(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            curricula_regex = "^([A-Z0-9]){3}-([A-Z0-9]){3}$"

            await self.__update_last_command(update)

            course_code = self.db.query_by_ids(chat_id=update.effective_chat.id)[0][
                "course"
            ]

            params = Utils.parse_params(
                "/set_curriculum", update.message.text, self.which_bot
            )

            curriculas_codes = self.db.query_join(
                "courses",
                "curriculas",
                {"course_code1": course_code},
                "course_code1",
                "code2",
                "label2",
                course_code="course_code",
            )

            if len(self.db.query_by_ids(update.effective_chat.id)) == 0:
                if len(curriculas_codes) == 1:
                    self.db.insert(
                        "data",
                        chat_id=update.effective_chat.id,
                        user_id=update.effective_user.id,
                        course="0",
                        year=1,
                        detail=2,
                        curricula=curriculas_codes["code"],
                    )
                else:
                    self.db.insert(
                        "data",
                        chat_id=update.effective_chat.id,
                        user_id=update.effective_user.id,
                        course="0",
                        year=1,
                        detail=2,
                        curricula="default",
                    )

            if course_code != "0":
                if (
                    len(params["numeric"]) == 0 and len(params["text"]) == 1
                ) and re.match(curricula_regex, params["text"][0]):
                    check_present = False
                    for i in curriculas_codes:
                        if params["text"][0] == i["code"]:
                            check_present = True
                            name = i["label"]

                    if check_present:
                        chat_id = update.effective_chat.id
                        user_id = update.effective_user.id

                        self.db.update(
                            "data", key_chat_id=chat_id, curricula=params["text"][0]
                        )
                        await context.bot.send_message(
                            chat_id=update.effective_chat.id,
                            text=self.messages["set_curriculum"][
                                self.db.query(
                                    "data", key_chat_id=update.effective_chat.id
                                )[0]["language"]
                            ].format(name=name, curr=params["text"][0]),
                        )

                    else:
                        await context.bot.send_message(
                            chat_id=update.effective_chat.id,
                            text=self.messages["error_404"][
                                self.db.query(
                                    "data", key_chat_id=update.effective_chat.id
                                )[0]["language"]
                            ],
                        )

                elif len(params["numeric"]) == 0 and len(params["text"]) == 0:
                    rows = []
                    for i in curriculas_codes:
                        temp = []
                        temp.append(KeyboardButton(f"{i['label']} [{i['code']}]"))
                        rows.append(temp)

                    keyboard = ReplyKeyboardMarkup(
                        rows, one_time_keyboard=True, selective=True
                    )

                    if len(rows) != 0:
                        await context.bot.send_message(
                            chat_id=update.effective_chat.id,
                            text=self.messages["set_curriculum_select"][
                                self.db.query(
                                    "data", key_chat_id=update.effective_chat.id
                                )[0]["language"]
                            ],
                            reply_markup=keyboard,
                            reply_to_message_id=update.message.message_id,
                        )
                    else:
                        await context.bot.send_message(
                            chat_id=update.effective_chat.id,
                            text=self.messages["set_curriculum_no_available"][
                                self.db.query(
                                    "data", key_chat_id=update.effective_chat.id
                                )[0]["language"]
                            ],
                            reply_markup=keyboard,
                            reply_to_message_id=update.message.message_id,
                        )

            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["error_no_course_set"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ],
                )
        else:
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def set_year(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await self.__update_last_command(update)

            params = Utils.parse_params(
                "/set_year", update.message.text, self.which_bot
            )

            if len(params["numeric"]) == 1 and len(params["text"]) == 0:
                if params["numeric"][0] >= 1 or params["numeric"][0] <= 5:
                    chat_id = update.effective_chat.id
                    user_id = update.effective_user.id
                    if len(self.db.query_by_ids(chat_id)) == 0:
                        self.db.insert(
                            "data",
                            chat_id=chat_id,
                            user_id=user_id,
                            course="0",
                            year=1,
                            detail=2,
                            curricula="default",
                        )
                    else:
                        self.db.update(
                            "data", key_chat_id=chat_id, year=params["numeric"][0]
                        )
                    self.db.backup("data")
                    await context.bot.send_message(
                        chat_id=chat_id,
                        text=self.messages["set_year"][
                            self.db.query("data", key_chat_id=update.effective_chat.id)[
                                0
                            ]["language"]
                        ].format(year=params["numeric"][0]),
                    )
                    logging.getLogger("bot.py").debug(
                        f'Updated user {user_id} with year {params["numeric"][0]}'
                    )
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["error_wrong_params"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ],
                )
        else:
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def set_detail(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await self.__update_last_command(update)

            params = Utils.parse_params(
                "/set_detail", update.message.text, self.which_bot
            )

            if len(params["numeric"]) == 1 and len(params["text"]) == 0:
                if params["numeric"][0] >= 1 or params["numeric"][0] <= 5:
                    chat_id = update.effective_chat.id
                    user_id = update.effective_user.id
                    if len(self.db.query_by_ids(chat_id)) == 0:
                        self.db.insert(
                            "data",
                            chat_id=chat_id,
                            user_id=user_id,
                            course="0",
                            year=1,
                            detail=2,
                            curricula="default",
                        )
                    else:
                        self.db.update(
                            "data", key_chat_id=chat_id, detail=params["numeric"][0]
                        )
                    self.db.backup("data")
                    await context.bot.send_message(
                        chat_id=chat_id,
                        text=self.messages["set_detail"][
                            self.db.query("data", key_chat_id=update.effective_chat.id)[
                                0
                            ]["language"]
                        ].format(detail=params["numeric"][0]),
                    )
                    logging.getLogger("bot.py").debug(
                        f'Updated user {user_id} with detail level {params["numeric"][0]}'
                    )
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["error_wrong_params"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ],
                )
        else:
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def timetable(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        await self.__update_last_command(update)
        user = self.db.query_by_ids(chat_id=update.effective_chat.id)[0]

        params = Utils.parse_params("/timetable", update.message.text, self.which_bot)

        if len(params["numeric"]) == 0 and len(params["text"]) == 0:
            if datetime.now().hour < 18:
                params["text"].append("today")
            else:
                params["text"].append("tomorrow")

        if not ((user["course"] == "0") or (user["curricula"] == "default")):
            await self.__orario_autosend(
                context=context, chat_id=update.effective_chat.id, day=params["text"][0]
            )

        else:
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_no_course_set"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    def __messages_creation(self, city: str, date: str, chat_id: int) -> list:
        """
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
        """
        messages = []
        messages.append(city + " - " + date)

        date = Utils.to_ISO8601(date)
        found = self.db.query_join(
            "data",
            "courses",
            {"chat_id1": str(chat_id)},
            "site2",
            "course_codec2",
            course="course_code",
        )[0]

        result = self.db.query_by_ids(chat_id)[0]

        schedules = UniboAPI.get_orario(
            found["course_codec"],
            Utils.get_course_type(found["site"]),
            result["year"],
            Utils.get_course_lang(found["site"]),
            date,
            curricula=result["curricula"],
        )

        for i in schedules:
            if self.db.query_by_ids(chat_id)[0]["hide_show"] == 1:
                if any(
                    j in i["cod_modulo"].lower()
                    for j in self.db.query_by_ids(chat_id)[0]["filter"].split()
                ) or any(
                    j in i["title"].lower()
                    for j in self.db.query_by_ids(chat_id)[0]["filter"].split()
                ):
                    messages.append(
                        MessageCreator.create_message(
                            i,
                            result["detail"],
                            self.db.query("data", key_chat_id=chat_id)[0]["language"],
                        )
                    )
            elif not any(
                j in i["cod_modulo"].lower()
                for j in self.db.query_by_ids(chat_id)[0]["filter"].split()
            ) and not any(
                j in i["title"].lower()
                for j in self.db.query_by_ids(chat_id)[0]["filter"].split()
            ):
                messages.append(
                    MessageCreator.create_message(
                        i,
                        result["detail"],
                        self.db.query("data", key_chat_id=chat_id)[0]["language"],
                    )
                )

        return messages

    async def set_autosend(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await self.__update_last_command(update)

            params = Utils.parse_params(
                "/set_autosend", update.message.text, self.which_bot
            )

            scheduled_time = (
                Utils.parse_time(params["text"][0])
                if len(params["text"]) == 1
                else None
            )

            if (
                (len(params["numeric"]) == 0)
                and (len(params["text"]) == 1)
                and scheduled_time is not None
            ):
                chat_id = update.effective_chat.id
                user_id = update.effective_user.id

                effective_day = "today" if scheduled_time.hour < 18 else "tomorrow"

                if len(self.db.query_by_ids(update.effective_chat.id)) == 0:
                    self.db.insert(
                        "data",
                        chat_id=update.effective_chat.id,
                        user_id=update.effective_user.id,
                        course="0",
                        year=1,
                        detail=2,
                        curricula="default",
                        autosend_time=scheduled_time.strftime("%H:%M"),
                    )
                else:
                    self.db.update(
                        "data",
                        key_chat_id=update.effective_chat.id,
                        autosend_time=scheduled_time.strftime("%H:%M"),
                    )

                self.db.backup("data")
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["set_autosend"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ].format(time=scheduled_time.strftime("%H:%M")),
                )

                if str(chat_id) in self.jobs.keys():
                    self.jobs[str(chat_id)].schedule_removal()

                self.jobs[str(chat_id)] = self.job_queue.run_daily(
                    self.__callback_loop,
                    time=scheduled_time,
                    days=(0, 1, 2, 3, 4, 5, 6),
                    chat_id=chat_id,
                    user_id=user_id,
                    data=effective_day,
                )
                self.jobs[str(chat_id)].enabled = True
                logging.getLogger("bot.py").debug(
                    f'Updated user {user_id} with autosend time {scheduled_time.strftime("%H:%M")}'
                )
            else:
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["error_wrong_params"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ],
                )
        else:
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def autosend(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            user = self.db.query_by_ids(chat_id=update.effective_chat.id)[0]
            current = bool(user["autosend"])
            user_id = user["user_id"]
            chat_id = user["chat_id"]

            self.db.update(
                "data", key_chat_id=update.effective_chat.id, autosend=int(not current)
            )

            effective_day = (
                "today" if int(user["autosend_time"][:2]) < 18 else "tomorrow"
            )

            scheduled_time_str = user["autosend_time"]

            if (str(chat_id)) not in self.jobs.keys():
                self.jobs[str(chat_id)] = self.job_queue.run_daily(
                    self.__callback_loop,
                    time=Utils.parse_time(scheduled_time_str),
                    days=(0, 1, 2, 3, 4, 5, 6),
                    chat_id=chat_id,
                    user_id=user_id,
                    data=effective_day,
                )

            if not current:  # enabling autosend
                self.jobs[str(chat_id)].enabled = True

                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["autosend_enabled"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ],
                )
            else:  # disabling autosend
                self.jobs[str(chat_id)].enabled = False
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=self.messages["autosend_disabled"][
                        self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                            "language"
                        ]
                    ],
                )
        else:
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def __orario_autosend(
        self, context: CallbackContext, chat_id=None, day: str = None
    ) -> None:
        """
        This method is called when the timetable command is sent to the bot.
        It parses some text like 'today' or 'tomorrow' and sends the schedule of the user.

        Parameters
        ----------
        context : telegram.ext.CallbackContext
            Contains the context object.

        Returns
        -------
        None
        """
        if day is None:
            day = context.job.data
        if chat_id is None:
            chat_id = context.job.chat_id

        date = Utils.parse_date(day)
        if date is None:
            date = Utils.date_from_days(day)

        course_code = self.db.query_by_ids(chat_id=chat_id)[0]["course"]
        city = self.db.query("courses", key_course_code=course_code)[0][
            "campus"
        ].strip()

        messages = self.__messages_creation(city, date, chat_id)

        message_default = self.messages["error_no_lessons_date"][
            self.db.query("data", key_chat_id=chat_id)[0]["language"]
        ].format(date=date)

        weather_message = None
        try:
            if any(d in day for d in ["oggi", "today"]):
                weather_message = WeatherAPI.get_weather(
                    city, 0, self.db.query("data", key_chat_id=chat_id)[0]["language"]
                )
            elif any(d in day for d in ["domani", "tomorrow"]):
                weather_message = WeatherAPI.get_weather(
                    city, 1, self.db.query("data", key_chat_id=chat_id)[0]["language"]
                )

            if len(messages) < 2:
                messages.append(message_default)
            if weather_message is not None:
                messages.insert(1, weather_message)
            for message in messages:
                await context.bot.send_message(
                    chat_id=chat_id,
                    text=message,
                    parse_mode=ParseMode.HTML,
                    disable_web_page_preview=True,
                )
            logging.getLogger("bot.py").debug(
                f"Sent autosend to {chat_id} with options {self.db.query_by_ids(chat_id)}"
            )
        except Forbidden:
            # user blocked the bot, so set the autosend to False
            self.db.update("data", key_chat_id=chat_id, autosend=0)
            self.jobs[str(chat_id)].schedule_removal()
            logging.warning(f"User {chat_id} blocked the bot, autosend disabled.")

    async def __callback_loop(self, context: CallbackContext) -> None:
        """
        This method is used for the callback of a scheduled job.

        Parameters
        ----------
        context : telegram.ext.CallbackContext
            Contains the context object.

        Returns
        -------
        None
        """
        try:
            await self.__orario_autosend(context)
        except ChatMigrated as e:
            self.db.update(
                "data", key_chat_id=context.job.chat_id, chat_id=e.new_chat_id
            )
            self.jobs[str(context.job.chat_id)].chat_id = e.new_chat_id
            logging.warning(
                f"Chat migrated from {context.job.chat_id} to {e.new_chat_id}"
            )

    async def wiki(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        await self.__update_last_command(update)

        if f"/wiki@{self.which_bot}" in update.message.text:
            text = update.message.text[(7 + len(self.which_bot)) :]
        elif "/wiki" in update.message.text:
            text = update.message.text[6:]
        else:
            text = update.message.text

        if text == "" or text.isspace():
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_404"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )
            return

        results = WikipediaAPI.pages(text)
        if len(results["names"]) != 0:
            if self.last_mess is not None and self.last_mess.lower() == text.lower():
                index = results["names"].index(text)
                url = results["links"][index]
                await self.__temp_func(url, update, context)
            else:
                self.last_mess = text
                if results["single"]:
                    url = results["links"]
                    await self.__temp_func(url, update, context)
                else:
                    rows = []
                    for i in results["names"]:
                        temp = []
                        temp.append(KeyboardButton(i))
                        rows.append(temp)
                    keyboard = ReplyKeyboardMarkup(
                        rows, one_time_keyboard=True, selective=True
                    )
                    await context.bot.send_message(
                        chat_id=update.effective_chat.id,
                        text=self.messages["wiki_sel"][
                            self.db.query("data", key_chat_id=update.effective_chat.id)[
                                0
                            ]["language"]
                        ],
                        reply_markup=keyboard,
                        reply_to_message_id=update.message.message_id,
                    )
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_404"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )
            self.last_mess = None

    # function defined for optimization
    async def __temp_func(
        self, url_: str, update: Update, context: CallbackContext
    ) -> None:
        """
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
        """
        try:
            message = WikipediaAPI.summary(url_)
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=message,
                reply_markup=ReplyKeyboardRemove(),
            )
        except BadRequest as e:
            if str(e) == "Message is too long":
                await context.bot.send_message(
                    chat_id=update.effective_chat.id,
                    text=Utils.long_mess_fix(message),
                    reply_markup=ReplyKeyboardRemove(),
                )

        self.last_mess = None

        self.db.update(
            "last_command", key_chat_id=update.effective_chat.id, text="/start"
        )

    async def bug(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        await self.__update_last_command(update)

        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text=self.messages["bug_report"][
                self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                    "language"
                ]
            ].format(link=self.__link__ + "/issues"),
            parse_mode=ParseMode.HTML,
        )

    async def __update_last_command(self, update: Update) -> None:
        """
        This method is used to update the last command sent to the bot.

        Parameters
        ----------
        update : telegram.Update
            Contains the update object.

        Returns
        -------
        None
        """
        if len(self.db.query("data", key_chat_id=update.effective_chat.id)) == 0:
            self.db.insert(
                "data",
                chat_id=update.effective_chat.id,
                user_id=update.effective_user.id,
                course="0",
                year=1,
                detail=2,
                curricula="default",
            )
        if "/" in update.message.text:
            self.db.insert(
                "last_command",
                chat_id=update.effective_chat.id,
                user_id=update.effective_user.id,
                text=update.message.text,
            )
            self.db.update(
                "last_command",
                key_chat_id=update.effective_chat.id,
                text=update.message.text,
            )

    async def donate_a_coffee(self, update: Update, context: CallbackContext) -> None:
        """
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
        """
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text=self.messages["coffee"][
                self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                    "language"
                ]
            ],
        )
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text='<a href="https://paypal.me/Grufoony?locale.x=it_IT">Paypal</a>',
            parse_mode=ParseMode.HTML,
        )

    async def change_language(self, update: Update, context: CallbackContext) -> None:
        """
        This method is called when the change_language command is sent to the bot.
        It sends a message with a keyboard to select the language of the bot.

        Parameters
        ----------
        update : telegram.Update
            Contains the update object.
        context : telegram.ext.CallbackContext
            Contains the context object.

        Returns
        -------
        None
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await self.__update_last_command(update)

            rows = []
            for lang, _ in self.__langs__.items():
                temp = []
                temp.append(KeyboardButton(lang))
                rows.append(temp)
            keyboard = ReplyKeyboardMarkup(rows, one_time_keyboard=True, selective=True)
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["lang_change_menu"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
                reply_markup=keyboard,
                reply_to_message_id=update.message.message_id,
            )
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def reset(self, update: Update, context: CallbackContext) -> None:
        """
        This method is called when the reset command is sent to the bot.
        It resets the user data to the default values.

        Parameters
        ----------
        update : telegram.Update
            Contains the update object.
        context : telegram.ext.CallbackContext
            Contains the context object.

        Returns
        -------
        None
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await self.__update_last_command(update)

            self.db.update(
                "data",
                key_chat_id=update.effective_chat.id,
                course="0",
                year=1,
                detail=2,
                curricula="default",
                autosend=0,
                autosend_time="00:00",
                language="en",
                hide_show=0,
                filter="default",
            )

            self.db.backup("data")

            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["reset"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def hide(self, update: Update, context: CallbackContext):
        """
        This method is called when the hide command is sent to the bot.
        It stores in the database the parameter passed as argument to the command, in order to tell the bot to not send the schedule of that course.

        Parameters
        ----------
        update : telegram.Update
            Contains the update object.
        context : telegram.ext.CallbackContext
            Contains the context object.

        Returns
        -------
        None
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await self.__update_last_command(update)

            params = Utils.parse_params("/hide", update.message.text, self.which_bot)

            if len(params["text"]) > 0 and len(params["numeric"]) > 0:
                words = (
                    " ".join(params["text"]).lower()
                    + " "
                    + " ".join([str(p) for p in params["numeric"]]).lower()
                )
            elif len(params["text"]) > 0:
                words = " ".join(params["text"]).lower()
            elif len(params["numeric"]) > 0:
                words = " ".join([str(p) for p in params["numeric"]]).lower()
            else:
                words = "default"

            self.db.update("data", key_chat_id=update.effective_chat.id, hide_show=0)
            self.db.update("data", key_chat_id=update.effective_chat.id, filter=words)
            self.db.backup("data")

            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["hide"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ].format(course=words),
            )
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )

    async def show(self, update: Update, context: CallbackContext):
        """
        This method is called when the show command is sent to the bot.
        It stores in the database the parameter passed as argument to the command, in order to tell the bot to send only the schedule of that course.

        Parameters
        ----------
        update : telegram.Update
            Contains the update object.
        context : telegram.ext.CallbackContext
            Contains the context object.

        Returns
        -------
            None
        """
        member = await update.effective_chat.get_member(update.effective_user.id)
        if (
            member.status == "creator"
            or member.status == "administrator"
            or (update.effective_chat.type == "private" and member.status == "member")
        ):
            await self.__update_last_command(update)

            params = Utils.parse_params("/show", update.message.text, self.which_bot)

            if len(params["text"]) > 0 and len(params["numeric"]) > 0:
                words = (
                    " ".join(params["text"]).lower()
                    + " "
                    + " ".join([str(p) for p in params["numeric"]]).lower()
                )
            elif len(params["text"]) > 0:
                words = " ".join(params["text"]).lower()
            elif len(params["numeric"]) > 0:
                words = " ".join([str(p) for p in params["numeric"]]).lower()
            else:
                words = "default"

            if words == "default":
                self.db.update(
                    "data", key_chat_id=update.effective_chat.id, hide_show=0
                )
            else:
                self.db.update(
                    "data", key_chat_id=update.effective_chat.id, hide_show=1
                )
            self.db.update("data", key_chat_id=update.effective_chat.id, filter=words)
            self.db.backup("data")

            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["show"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ].format(course=words),
            )
        else:
            context.bot.send_message(
                chat_id=update.effective_chat.id,
                text=self.messages["error_admin"][
                    self.db.query("data", key_chat_id=update.effective_chat.id)[0][
                        "language"
                    ]
                ],
            )


if __name__ == "__main__":
    if sys.argv[1] == "test":
        with open(Path("./keys/test.txt"), "r") as f:
            token = f.readline().strip()
            which_bot = "orari_unibo_bot"
    elif sys.argv[1] == "launch":
        with open(Path("./keys/token.txt"), "r") as f:
            token = f.readline().strip()
            which_bot = "the_unibot"

    bot = the_unibot(token, which_bot)
