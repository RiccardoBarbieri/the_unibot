# The Unibot
Telegram @the_unibot

Il bot creato per l'università di Bologna. Di seguito una guida in cui ne sono spiegati i principali comandi.

## Impostare corso e anno
Per impostare il corso è sufficiente utilizzare il comando:

    /set_corso [nome_corso]
    
Verrà visualizzata una lista dei corsi trovati inerenti al nome inserito. Una volta premuto il bottone corrispondente al corso desiderato verrà inviato un messaggio di conferma contenente il link alla pagina web del corso.

Analogamente per impostare l'anno basta utilizzare il comando:

    /set_anno [num]

Verrà inviato un messaggio di conferma.

## Ricevere gli orari
Per ricevere gli orari è possibile settare in primis il livello di dettaglio che si vuole avere utilizzando il comando:

    /set_detail [num]

I livelli di dettaglio implementati sono:
1) orario + nome corso;
2) orario + nome corso + luogo + link alla lezione;
3) orario + nome corso + CFU + docente + luogo + teledidattica obbligatoria + link alla lezione;

N.B.: il dettaglio di default è il 2.

Una volta impostato il livello di dettaglio è possibile richiedere l'orario di un giorno con il comando:

    /orario [gg-mm-aaaa]

Specificando la data *rigorosamente* nel formato indicato.

## Ricerca su Wikipedia
Il bot possiede anche un comando per effettuare ricerche rapide su Wikipedia:

    /wiki [qualcosa]

Ad ogni ricerca eseguita verrà fornita una lista di risultati attinenti tra i quali scegliere. Nel caso di disambiguazioni è probabile sia necessario selezionare un risultato per più di una volta.

## Utility
Data l'emergenza Covid e la migrazione online delle lezioni si potrebbe pensare che qualcuno le possa registrare (ILLEGALMENTE!): il bot possiede (preventivamente) una censura automatica per le parole derivate da *registrazione*, particolarmente consigliata nei canali telegram.