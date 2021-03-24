# The Unibot
Telegram @the_unibot

Il bot creato per l'università di Bologna. Supporta il 94% dei corsi UniBO (231/244)


Di seguito una guida in cui ne sono spiegati i principali comandi.

## Impostare corso e anno
Per impostare il corso è sufficiente utilizzare il comando:

    /set_corso nome_corso
    
Verrà visualizzata una lista dei corsi trovati inerenti al nome inserito. Una volta premuto il bottone corrispondente al corso desiderato verrà inviato un messaggio di conferma contenente il link alla pagina web del corso.

Analogamente per impostare l'anno basta utilizzare il comando:

    /set_anno num

Verrà inviato un messaggio di conferma.

## Orari
### Livello di dettaglio
Per ricevere gli orari è possibile settare in primis il livello di dettaglio che si vuole avere utilizzando il comando:

    /set_detail num

I livelli di dettaglio implementati sono:
1) orario + nome corso
2) orario + nome corso + luogo + link all'aula virtuale
3) orario + nome corso + CFU + docente + luogo + teledidattica obbligatoria + link all'aula virtuale

**N.B.**: il livello di dettaglio di default è il 2.

### Ottenere l'orario di un giorno
Una volta impostato il livello di dettaglio è possibile richiedere l'orario di un giorno con il comando:

    /orario gg-mm-aaaa

specificando la data *rigorosamente* nel formato indicato o scrivendo invece della data *oggi, domani o dopodomani*.

**N.B.**: se l'orario viene richiesto nelle giornate *oggi* o *domani* verranno fornite anche informazioni meteo sulla città sede del corso.

### Autosend
Per impostare l'orario in cui si vuole ricevere l'orario quotidianamente:

    /set_autosend hh:mm

specificando l'orario *rigorosamente* nel formato indicato.

**N.B.**: se l'orario inserito è precedente alle 15:00 il bot manderà l'orario del giorno stesso, in caso contrario verrà mandato l'orario del giorno dopo.

Per abilitare/disabilitare l'autosend è sufficiente lanciare il comando, funzionante come un bottone booleano:

    /autosend

Verrà inviato un messaggio di conferma.

## Ricerca su Wikipedia
Il bot possiede anche un comando per effettuare ricerche rapide su Wikipedia:

    /wiki qualcosa

Ad ogni ricerca eseguita verrà fornita una lista di risultati attinenti tra i quali scegliere. Nel caso di disambiguazioni è probabile sia necessario selezionare un risultato per più di una volta.

## Utility
Data l'emergenza Covid e la migrazione online delle lezioni si potrebbe pensare che qualcuno le possa registrare **illegalmente**: il bot possiede (preventivamente) una censura automatica per le parole derivate da *registrazione*, particolarmente consigliata nei canali telegram.