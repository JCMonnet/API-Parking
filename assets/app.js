
let apiResults;

function callApi() {
    fetch('https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&facet=etat_descriptif')
        .then((response) => {
            return response.json();
        })
        .then(function (data) {
            afficherParking(data.records)
        });

    function afficherParking(apiResults) {
        let tableBody = document.querySelector('tbody');
        tableBody.innerHTML = "";
        for (const parkingSeul of apiResults) {
            //définir les résulats voulus de l'api sous une variable
            let parkingNom = parkingSeul.fields.nom_parking;
            let statutParking = parkingSeul.fields.etat_descriptif;
            let placesRestantes = parkingSeul.fields.libre;
            console.log(parkingNom + " - " + statutParking + " - " + placesRestantes);
            //création des éléments du tableau html: create element puis contenu élement puis rattachement element /!\ attention ordre


            let newRow = document.createElement('tr');
            let caseNom = document.createElement('td');
            let caseStatut = document.createElement('td');
            let caseNbPlaces = document.createElement('td');
            let pastille = document.createElement('div');
            // &nbsp veut dire "espace" en html, n'apparaitra pas
            // pastille.innerHTML = '&nbsp;';
            caseNom.textContent = parkingNom;
            caseStatut.innerHTML = statutParking;
            caseNbPlaces.textContent = placesRestantes;
            // pour obtenir pastille verte/rouge selon ouvert/fermé
            if (statutParking === "Ouvert") {
                pastille.classList.add("vert")
            }
            else {
                pastille.classList.add("rouge")
            }

            if (placesRestantes <= 30) {
                caseNbPlaces.classList.add("txtrouge")
            }

            ///!\ attention ordre tablebody = tag tbody, en dernier
            newRow.appendChild(caseNom);
            newRow.appendChild(caseStatut);
            caseStatut.appendChild(pastille);
            newRow.appendChild(caseNbPlaces);
            tableBody.appendChild(newRow);
        }

    }
    //pour mise à jour toutes les 5mn setTimeout, tjs en ms: Donc 1000ms*60=1mn x5 pour 5mn

    setTimeout(callApi, (1000 * 60) * 5);
}
callApi();
