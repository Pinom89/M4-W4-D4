Questo codice JavaScript è responsabile della visualizzazione dei dettagli di un prodotto su una pagina web. Si comporta nel seguente modo:

    Recupera l'ID del prodotto: All'avvio della pagina, estrae l'ID del prodotto dall'URL corrente.
    Imposta l'endpoint API: Definisce l'URL base dell'API che fornisce i dati del prodotto.
    Recupera i dati del prodotto:
        Invia una richiesta di recupero dati (chiamata fetch) all'API, specificando l'ID del prodotto.
        Controlla lo stato della risposta: se la richiesta ha avuto successo, prosegue all'elaborazione dei dati. In caso di errore, viene visualizzato un messaggio di errore in console.
        Converte la risposta in un formato JSON utilizzabile.
    Visualizza i dettagli del prodotto:
        Crea una struttura HTML per la scheda del prodotto, utilizzando i dati recuperati dall'API (immagine, marca, nome, descrizione, prezzo).
        Inserisce la struttura HTML appena creata all'interno di un elemento specifico della pagina identificato da caricamentoDati.
        Rimuove un elemento di caricamento (presumibilmente uno spinner) una volta che i dati del prodotto sono stati visualizzati.

Note:

    Il codice utilizza l'autorizzazione tramite token (header Authorization) per accedere all'API. Il token fornito nel codice è un placeholder e dovrà essere sostituito con un token valido.
    Il codice presuppone l'esistenza di un elemento con l'ID spinner che rappresenta un elemento di caricamento da nascondere una volta caricati i dati.
    Il codice utilizza classi Bootstrap per lo styling della scheda del prodotto.