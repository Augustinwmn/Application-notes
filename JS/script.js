function ajouter_note(x, y) {
    //Approche 1 : écrire du HTML
    // document.body.innerHTML += '<div class="note"><div class="barre-de-titre"><button>&times</button></div><textarea></textarea></div>';
    // Preparation d'une nouvelle div
    let nouvelle_note = document.createElement("div");
    //Insertion de cette div dans la page (au niveau body)
    document.body.appendChild(nouvelle_note);

    //Paramétrage de la div:
    nouvelle_note.className = "fenetre";
    nouvelle_note.style.left = x + "px";
    nouvelle_note.style.top = y + "px";

    //Chaque élément enfant de notre note pourra être considéré comme une propriété de celle-ci, ce qui facilitera l'accès à ces élément depuis la note(En plus d'être assez élégant dans le concept). La note n'est plus un simple élément HTML mais un objet personnalisé. 

    //Barre de titre :
    nouvelle_note.barre_de_titre = document.createElement("div");
    nouvelle_note.appendChild(nouvelle_note.barre_de_titre);
    nouvelle_note.barre_de_titre.className = "barre-de-titre";

    // Titre de la note :
    nouvelle_note.titre = document.createElement("span");
    nouvelle_note.barre_de_titre.appendChild(nouvelle_note.titre);
    // nouvelle_note.titre.textContent = "Titre de la note";

    // Bouton de supression 
    nouvelle_note.bouton_supression = document.createElement("button");
    nouvelle_note.barre_de_titre.appendChild(nouvelle_note.bouton_supression);
    nouvelle_note.bouton_supression.className = "bouton-fermer";
    nouvelle_note.bouton_supression.textContent = "x";

    //Champ texte :
    nouvelle_note.champ = document.createElement("textarea");
    nouvelle_note.appendChild(nouvelle_note.champ);


    // Gestion glisser-déposer
    // On utilise la méthode draggable de JQuery UI pour rendre la note déplaçable
    $(nouvelle_note).draggable({
        stack: ".fenetre",
        stop: function () {
            if (nouvelle_note.champ.value != "") {
                nouvelle_note.sauvegarder(); // Sauvegarde la note à chaque fois qu'elle est déplacée
            }
        }
    });

    //Méthodes

    nouvelle_note.sauvegarder = function () {

        // On veut :
        // - si la note vien d'être créée, ajouter une ligne qui lui correspond dans la BDD (incluant titre, content, x, y)
        // - si la note existe déjà, mettre à jour la ligne qui lui correspond (incluant titre, content, x, y)

        console.log("Sauvegarde de la note : " + nouvelle_note.champ.value);

        $.ajax({
            url: "traitement_ajout_note.php",
            type: "POST",
            data: {
                titre: nouvelle_note.titre.textContent,
                content: nouvelle_note.champ.value,
                x: nouvelle_note.style.left,
                y: nouvelle_note.style.top
            },
            success: function (response) {
                console.log("Sauvegarde réussie : " + response);
            },
            error: function (xhr, status, error) {
                console.error("Erreur de sauvegarde : " + error);
            }
        });

    };

    // Déclancheur de sauvegarde automatique

    nouvelle_note.champ.addEventListener("input", nouvelle_note.sauvegarder);
    // + au glisser-déposer : voir ci-dessus




    nouvelle_note.bouton_supression.onclick = function () {
        //Supprimer la note
        const confirm = window.confirm('Vous voulez vraiment supprimer cette note ?');
        if (confirm) {
            document.body.removeChild(nouvelle_note);
        }
    };

}

document.body.addEventListener("dblclick", function (event) { ajouter_note(event.clientX - 50, event.clientY - 20); });

// il faudrait que ces coordonées proviennent de l'événement dbonclick (car elle depend du curseur)
