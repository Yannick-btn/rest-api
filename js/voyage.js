document.addEventListener("DOMContentLoaded", function () {
    // URL de l'API REST de WordPress
    let bouton_categorie = document.querySelectorAll(".bouton__categorie");
    for (const elm of bouton_categorie) {
      elm.addEventListener("mousedown", function () {
        // Récupérer l'identifiant de la catégorie à partir de l'ID du bouton
        let categorie_id = elm.id.split("__")[1]; // Obtient l'ID après le "__"
        // Construire l'URL de requête avec la catégorie sélectionnée
        let url = `https://gftnth00.mywhc.ca/tim31/wp-json/wp/v2/posts?categories=${categorie_id}`;
        // Effectuer la requête HTTP en utilisant fetch()
        fetch(url)
          .then(function (response) {
            // Vérifier si la réponse est OK (statut HTTP 200)
            if (!response.ok) {
              throw new Error(
                "La requête a échoué avec le statut " + response.status
              );
            }
            // Analyser la réponse JSON
            return response.json();
          })
          .then(function (data) {
            // La variable "data" contient la réponse JSON
            let restapi = document.querySelector("#contenu__restapi");
            if (!restapi) {
              console.error("Element avec l'id 'contenu__restapi' non trouvé.");
              return;
            }
            restapi.innerHTML = "";
            // Parcourir les données et afficher les articles correspondants
            data.forEach(function (article) {
              let titre = article.title.rendered;
              let contenu = article.content.rendered.substr(0, 200) + "...";
              let carte = document.createElement("div");
              carte.classList.add("restapi__carte");
              carte.innerHTML = `
                <h5>${titre}<h5>
                <p>${contenu}<p>
              `;
              restapi.appendChild(carte);
            });
          })
          .catch(function (error) {
            // Gérer les erreurs
            console.error("Erreur lors de la récupération des données :", error);
          });
      });
    }
  });
  