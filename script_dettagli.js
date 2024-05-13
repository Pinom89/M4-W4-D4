document.addEventListener("DOMContentLoaded", async function () {
    const userId = new URLSearchParams(window.location.search).get("id");
    const caricamentoDati = document.getElementById("caricamentodati");
    const UrlBase = "https://striveschool-api.herokuapp.com/api/product/";

   

    async function ottieniDatiDaAPI() {
        try {
            let risposta = await fetch(UrlBase + userId, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDI1ODBiM2IyNTAwMTUxYjU0MWIiLCJpYXQiOjE3MTUxMjA3NzYsImV4cCI6MTcxNjMzMDM3Nn0.rOlEDCCENZKVBGynglCuTWw6ipQmtzh4vJd4JW27hjc`
                }
            });

            if (!risposta.ok) {
                throw new Error("Errore durante il recupero dei dati");
            }

            let dato = await risposta.json();   
            caricamentoDati.innerHTML = `
                <div class=" col-sm-12 col-md-6 col-lg-4  swing-in-top-fwd">
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
                            </div>
                        </div>
                    </div>
                </div>
            `;        
            rimuoviSpinner();
        } catch (errore) {
            console.error("Si è verificato un errore durante il recupero dei dati:", errore);
        }
    }

    function rimuoviSpinner() {
        const spinner = document.getElementById("spinner")
        spinner.classList.add("d-none");
    }

    await ottieniDatiDaAPI();
});




