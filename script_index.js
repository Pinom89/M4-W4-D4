const UrlBase = "https://striveschool-api.herokuapp.com/api/product/";
const caricamentoDati= document.getElementById("caricamentodati");
const nascondi = document.getElementById(`nascondi`);
const searchInput = document.getElementById("cerca");
let dati=[];


window.onload = async function() {
    async function ottieniDatiDaAPI() {
        
        try {
            let risposta = await fetch(UrlBase, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDI1ODBiM2IyNTAwMTUxYjU0MWIiLCJpYXQiOjE3MTUxMjA3NzYsImV4cCI6MTcxNjMzMDM3Nn0.rOlEDCCENZKVBGynglCuTWw6ipQmtzh4vJd4JW27hjc`
                }
            });

            // Controlliamo lo stato della risposta
            if (!risposta.ok) {
                throw new Error("Errore durante il recupero dei dati");
            }

            // Estraggo i dati JSON dalla risposta
            dati = await risposta.json();   
            dati.forEach(dato => { 
                caricamentoDati.innerHTML += `
                    <div class="col-sm-12 col-md-6 col-lg-4 swing-in-top-fwd ">
                        <div class="card border border-primary shadow-0 ">
                            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img src=${dato.imageUrl} class="img-fluid"/>
                                <a href="#!">
                                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
                                </a>
                            </div>
                            <div class="card-header">${dato.brand}</div>
                            <div class="card-body">
                                <h5 class="card-title">${dato.name}</h5>
                                <p class="card-text">
                                    ${dato.description}
                                </p>
                                <div class= "d-flex flex-column gap-2">
                                    <button type="button" class="btn btn-primary">€ ${dato.price}</button>
                                    <button type="button" class="btn btn-warning dettagli" data-id="${dato._id}"> Dettagli </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            // Nascondo l'interfaccia di caricamento con la classe nascondi
            nascondi.classList.add("d-none");
             // Seleziona tutti i pulsanti "Dettagli" e aggiungi loro un event listener
          const bottoniDettagli = document.querySelectorAll(".dettagli");
          bottoniDettagli.forEach(bottone => {
              bottone.addEventListener("click", () => {
                  // Reindirizza a dettagli.html passando l'ID dell'utente come parametro
                  window.location = `dettagli.html?id=${bottone.getAttribute("data-id")}`;
              });
          });
             
        } catch (errore) {
            console.error("Si è verificato un errore durante il recupero dei dati:", errore);
        }
    }

    ottieniDatiDaAPI();
};
   



    searchInput.addEventListener("input", function () {
    // Prendo il valore corrente dell'input e lo converto in lowercase
    const searchTerm = searchInput.value.toLowerCase();
           console.log(searchTerm);
           console.log(dati);
           caricamentoDati.innerHTML = "";
        // Filtraggio dei dati in base ai criteri di ricerca
        const risultatiFiltrati = dati.filter((dato) => 
            dato.name.toLowerCase().includes(searchTerm) ||
            dato.description.toLowerCase().includes(searchTerm) ||
            dato.brand.toLowerCase().includes(searchTerm)
        );
            // Aggiornamento dell'HTML della tabella con i risultati filtrati
        risultatiFiltrati.forEach((dato) => {
            caricamentodati.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4  swing-in-top-fwd">
                        <div class="card border border-primary shadow-0 ">
                            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img src=${dato.imageUrl} class="img-fluid"/>
                                <a href="#!">
                                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
                                </a>
                            </div>
                            <div class="card-header">${dato.brand}</div>
                            <div class="card-body">
                                <h5 class="card-title">${dato.name}</h5>
                                <p class="card-text">
                                    ${dato.description}
                                </p>
                                <div class= "d-flex flex-column gap-2">
                                    <button type="button" class="btn btn-primary">€ ${dato.price}</button>
                                    <button type="button" class="btn btn-warning dettagli" data-id="${dato._id}"> Dettagli </button>
                                </div>
                            </div>
                        </div>
                </div>
        `;
        });
          // Seleziona tutti i pulsanti "Dettagli" e aggiungi loro un event listener
          const bottoniDettagli = document.querySelectorAll(".dettagli");
          bottoniDettagli.forEach(bottone => {
              bottone.addEventListener("click", () => {
                  // Reindirizza a dettagli.html passando l'ID dell'utente come parametro
                  window.location = `dettagli.html?id=${bottone.getAttribute("data-id")}`;
              });
          });
    });


