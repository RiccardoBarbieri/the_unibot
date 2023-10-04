# The Unibot
![version](https://img.shields.io/github/v/release/RiccardoBarbieri/the_unibot)
[![license](https://img.shields.io/badge/license-GNU--3.0-yellow)](https://github.com/RiccardoBarbieri/the_unibot/blob/master/LICENSE.md)

Telegram @the_unibot

A bot created for Alma Mater Studiorum - Università di Bologna. It supports the 94% of UniBO's courses (231/244).

## Table of contents
1. [Quick Guide](#English)
2. [Guida rapida](#Italiano)
3. [Simple_SQL](#Simple_SQL)

## English

Here it is a quick guide to explain the main commands.

### Set course and year
To set the course it is sufficient to run:
```
/set_course name
```
It will open a list of the courses with similar names with respect to the one searched.
One selected the course, a confirmation message will be sent by the bot, with the link to the course's web page.

To set the year it is sufficient to:
```
/set_year number
```
The bot will send a confirmation message.

### Timetables
#### Detail level
One can set the detail level through:
```
/set_detail number
```
The detail's levels are:
1) timetable + course name
2) timetable + course name + place + link to the online lesson (if exists)
3) timetable + course name + CFU + professor + place + online-only lecture + link to the online lesson (if exists)

**N.B.**: default detail level is 2.

#### Get the timetable of a generic day
To get the timetable of a generic day:
```
/timetable param
```

where `param` can be anything, i.e. *today, tomorrow, aftertomorrow, monday, saturday, ...* or a date in the format *day month year*, separated by any special character (*year* can be omitted).

**N.B.**: if no day is passed to the command, it will send the timetable of the current day.
Also, using if one word from *today, tomorrow* is given, the bot will also return weather info.

#### Filter courses
It is possible to filter the courses by calling:
```
/hide course_code filter_word
```
or
```
/show course_code filter_word
```
One can pass as many parameters as he wants.

**N.B.**: if no argument is given to the command, it will reset filters.

#### Autosend
One can also set an autosend time
```
/set_autosend hh:mm
```
**N.B.**: if the time is before 15:00 boot will send the current day timetable, else, it will send the timetable for the next day.

To enable/disable the autosend:
```
/autosend
```
The bot will send a confirmation message.

#### Reset
To reset all user data to default values one can simply call
```
/reset
```
The bot will send a confirmation message.

### Search on Wikipedia
One can also do a quick search on Wikipedia
```
/wiki something
```
### Utility
To avoid the presence of the word *registration* in the group chats, the bot will automatically censor it.

**N.B.**: the bot will do this *if and only if* it's group admin.

## Italiano

Di seguito una guida in cui ne sono spiegati i principali comandi.

### Impostare corso e anno
Per impostare il corso è sufficiente utilizzare il comando:
```
/set_course nome_corso
```  
Verrà visualizzata una lista dei corsi trovati inerenti al nome inserito. Una volta premuto il bottone corrispondente al corso desiderato verrà inviato un messaggio di conferma contenente il link alla pagina web del corso.

Analogamente per impostare l'anno basta utilizzare il comando:
```
/set_year numero
```
Verrà inviato un messaggio di conferma.

### Orari
#### Livello di dettaglio
Per ricevere gli orari è possibile settare in primis il livello di dettaglio che si vuole avere utilizzando il comando:
```
/set_detail numero
```
I livelli di dettaglio implementati sono:
1) orario + nome corso
2) orario + nome corso + luogo + link all'aula virtuale
3) orario + nome corso + CFU + docente + luogo + teledidattica obbligatoria + link all'aula virtuale

**N.B.**: il livello di dettaglio di default è il 2.

#### Ottenere l'orario di un giorno
Una volta impostato il livello di dettaglio è possibile richiedere l'orario di un giorno con il comando:
```
/timetable param
```

dove `param` può assumere qualsiasi valore, ad esempio *oggi, domani, dopodomani, lunedì, sabato, ...* o specificando la data nel formato *giorno mese anno* separata da qualsiasi carattere speciale (l'*anno* può essere omesso).

**N.B.**: se l'orario viene richiesto nelle giornate *oggi* o *domani* verranno fornite anche informazioni meteo sulla città sede del corso.

**N.B.**: se il comando viene lanciato senza fornire alcun parametro verrà interpretato come *oggi*

#### Filtrare i corsi
Utilizzando i comandi:
```
/hide codice_corso parole_filtro
```
oppure
```
/show codice_corso parole_filtro
```
è possibile filtrare i corsi inviati, fornendo sia codici corso che parole filtro, anche una combinazione di entrambi.

**N.B.**: se il comando viene chiamato senza argomenti, i filtri verranno resettati.

#### Autosend
Per impostare l'orario in cui si vuole ricevere l'orario quotidianamente:
```
/set_autosend oo:mm
```
specificando l'orario *rigorosamente* nel formato indicato.

**N.B.**: se l'orario inserito è precedente alle 15:00 il bot manderà l'orario del giorno stesso, in caso contrario verrà mandato l'orario del giorno dopo.

Per abilitare/disabilitare l'autosend è sufficiente lanciare il comando, funzionante come un bottone booleano:
```
/autosend
```
Verrà inviato un messaggio di conferma.

#### Reset
Per reimpostare i dati dell'utente ai valori di default è poissibile chiamare il comando
```
/reset
```
Verrà inviato un messaggio di conferma.

### Ricerca su Wikipedia
Il bot possiede anche un comando per effettuare ricerche rapide su Wikipedia:
```
/wiki qualcosa
```
Ad ogni ricerca eseguita verrà fornita una lista di risultati attinenti tra i quali scegliere. Nel caso di disambiguazioni è probabile sia necessario selezionare un risultato per più di una volta.

### Utility
Data l'emergenza Covid e la migrazione online delle lezioni si potrebbe pensare che qualcuno le possa registrare **illegalmente**: il bot possiede (preventivamente) una censura automatica per le parole derivate da *registrazione*, particolarmente consigliata nei canali telegram.

**N.B.**: le utility necessitano dei privilegi di amministratore per funzionare.

## Simple_SQL [![Documentation Status](https://readthedocs.org/projects/the-unibot/badge/?version=latest)](https://the-unibot.readthedocs.io/en/latest/?badge=latest)
This project includes a simple library used to manage MySQL databases directly from Python.
It's still in its first version, and it will be updated in the future.

The simple-sql docs are available (work in progress): [documentazione](https://the-unibot.readthedocs.io/en/latest/)
