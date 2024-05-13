
const UrlBase = "https://striveschool-api.herokuapp.com/api/product/";
const caricamentoDati= document.getElementById("caricamentodati");
const nascondi = document.getElementById("nascondi");
const form = document.getElementById("myForm");
const searchInput = document.getElementById("cerca");
document.getElementById("modificaProdottoBtn").addEventListener("click", modificaProdotto);
let dati=[];

// Creo funzione Creo Prodotto
document.getElementById("creaProdottoBtn").addEventListener("click", async () => {
   
    const product = {
            name: document.querySelector("#nome").value,
            description: document.querySelector("#descrizione").value,
            brand: document.querySelector("#marca").value,
            imageUrl: document.querySelector("#immagine").value,
            price: document.querySelector("#prezzo").value,
    }
    
  let risposta = await fetch(UrlBase, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization:
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDI1ODBiM2IyNTAwMTUxYjU0MWIiLCJpYXQiOjE3MTUxMjA3NzYsImV4cCI6MTcxNjMzMDM3Nn0.rOlEDCCENZKVBGynglCuTWw6ipQmtzh4vJd4JW27hjc`,
    },
    body: JSON.stringify(product),
  });
  if (risposta.ok) {
    form.reset();
    alert("Prodotto inserito");
    ottieniDatiDaAPI();
}
});

//Richiamo i dati da l'API mostrando nel back office i prodotti memorizzati.
async function ottieniDatiDaAPI() {
    let risposta = await fetch(UrlBase, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization:
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDI1ODBiM2IyNTAwMTUxYjU0MWIiLCJpYXQiOjE3MTUxMjA3NzYsImV4cCI6MTcxNjMzMDM3Nn0.rOlEDCCENZKVBGynglCuTWw6ipQmtzh4vJd4JW27hjc`,
        },
    })
     
    // Estraggo i dati JSON dalla risposta
     dati = await risposta.json();
     dati.forEach(dato => { 
        caricamentoDati.innerHTML += `
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
                        <button type="button" class="btn btn-warning" onclick="avviaModificaProdotto(event)" data-id="${dato._id}"> Avvia Modifica</button>
                        <button type="button" class="btn btn-danger" onclick="cancellaProdotto(event)" data-id="${dato._id}">Rimuovi</button>
                    </div>
                    </div>
                </div>
            </div>
        `
        
     });
     nascondi.classList.add("d-none");
     
}


// creo una funzione che al click del pulsante avvia modifica di ogni singolo prodotto presente nella lista prodotti stampi nel form i dati prelevati dall'id prodotto.
async function avviaModificaProdotto(event) {
    // Richiedi i dati del prodotto dall'API
    const idProdotto = event.target.dataset.id;
   

    try {
        const risposta = await fetch(`${UrlBase}/${idProdotto}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDI1ODBiM2IyNTAwMTUxYjU0MWIiLCJpYXQiOjE3MTUxMjA3NzYsImV4cCI6MTcxNjMzMDM3Nn0.rOlEDCCENZKVBGynglCuTWw6ipQmtzh4vJd4JW27hjc`,
            },
        });

        if (!risposta.ok) {
            throw new Error("Errore durante il recupero dei dati del prodotto");
        }
        const prodotto = await risposta.json();
        
       

        // Popola il form con i dati del prodotto
        document.querySelector("#nome").value = prodotto.name;
        document.querySelector("#descrizione").value = prodotto.description;
        document.querySelector("#immagine").value = prodotto.imageUrl;
        document.querySelector("#marca").value = prodotto.brand;
        document.querySelector("#prezzo").value = prodotto.price;
        document.querySelector("#idProdotto").value = prodotto._id;
       // introduco funzionalità di portare automaticamente in alto la pagina nella sezione modifica dati quando utente clicca su avvia modifica
       if (document.getElementById("altezzaPagina")) {
        const altezzaElemento = document.getElementById("altezzaPagina").offsetTop;
            window.scrollTo({
                top: altezzaElemento,
                behavior: "smooth"
            });
        }
    } catch (errore) {
        console.error("Si è verificato un errore durante il recupero dei dati del prodotto:", errore);
        alert("Si è verificato un errore durante il recupero dei dati del prodotto. Si prega di riprovare.");
        window.scrollTo({
            top: altezzaElemento,
            behavior: "smooth"
        });
    }
}

async function modificaProdotto() {
    let valoreAssoluto = document.getElementById("idProdotto").value;

    const product = {
        name: document.querySelector("#nome").value,
        description: document.querySelector("#descrizione").value,
        brand: document.querySelector("#marca").value,
        imageUrl: document.querySelector("#immagine").value,
        price: document.querySelector("#prezzo").value,
    }

    try {
        let risposta = await fetch(UrlBase + valoreAssoluto, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDI1ODBiM2IyNTAwMTUxYjU0MWIiLCJpYXQiOjE3MTUxMjA3NzYsImV4cCI6MTcxNjMzMDM3Nn0.rOlEDCCENZKVBGynglCuTWw6ipQmtzh4vJd4JW27hjc`,
            },
            body: JSON.stringify(product),
        });

        if (risposta.ok) {
            // Aggiornamento istantaneo dell'interfaccia utente con i nuovi dati
            ottieniDatiDaAPI(); 
            alert("Prodotto Modificato");
        } else {
            alert("Si è verificato un errore durante la modifica del prodotto");
        }
    } catch (errore) {
        console.error("Si è verificato un errore durante la modifica del prodotto:", errore);
        alert("Si è verificato un errore durante la modifica del prodotto");
    }
}


    async function cancellaProdotto(event) {
        // Richiedi i dati del prodotto dall'API
        const idProdotto = event.target.dataset.id;
    
        try {
            const risposta = await fetch(`${UrlBase}/${idProdotto}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDI1ODBiM2IyNTAwMTUxYjU0MWIiLCJpYXQiOjE3MTUxMjA3NzYsImV4cCI6MTcxNjMzMDM3Nn0.rOlEDCCENZKVBGynglCuTWw6ipQmtzh4vJd4JW27hjc`,
                },
            });
    
            if (risposta.ok) {
                const altezzaElemento = document.getElementById("altezzaPagina").offsetTop;
                ottieniDatiDaAPI(); 
                alert("Prodotto eliminato");
                window.scrollTo({
                    top: altezzaElemento,
                    behavior: "smooth"
                });
                window.location.reload();
            }
        } catch (errore) {
            console.error("Si è verificato un errore durante l'eliminazione del prodotto:", errore);
            alert("Si è verificato un errore durante l'eliminazione del prodotto. Si prega di riprovare.");
        }
    };
    

        ottieniDatiDaAPI();
        
searchInput.addEventListener("input", function () {
    // Prendo il valore corrente dell'input e lo converto in lowercase
    const searchTerm = searchInput.value.toLowerCase();
           caricamentoDati.innerHTML = "";
        // Filtraggio dei dati in base ai criteri di ricerca
        const risultatiFiltrati = dati.filter((dato) => 
            dato.name.toLowerCase().includes(searchTerm) ||
            dato.description.toLowerCase().includes(searchTerm) ||
            dato.brand.toLowerCase().includes(searchTerm)
        );
        console.log(risultatiFiltrati);
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
                    <button type="button" class="btn btn-warning" onclick="avviaModificaProdotto(event)" data-id="${dato._id}"> Avvia Modifica</button>
                    <button type="button" class="btn btn-danger" onclick="cancellaProdotto(event)" data-id="${dato._id}">Rimuovi</button>
                </div>
                </div>
            </div>
        </div>
        `;
        });
    });


