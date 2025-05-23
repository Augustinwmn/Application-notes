$.ajax("./php/script_traitement/traitement_initialisation_notes.php", {
    success: function (data) {

        let liste_notes = JSON.parse(data);

        for (let note of liste_notes) {
            ajouter_note(note.x, note.y, note.titre, note.content, note.id);
        }
    }
});

function ajouter_note(x, y, titre = "Titre de la note", contenu = "", id = false) {
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
    nouvelle_note.stopPropagation = function (event) {
        event.stopPropagation();
    };

    //Chaque élément enfant de notre note pourra être considéré comme une propriété de celle-ci, ce qui facilitera l'accès à ces élément depuis la note(En plus d'être assez élégant dans le concept). La note n'est plus un simple élément HTML mais un objet personnalisé. 

    //Barre de titre :
    nouvelle_note.barre_de_titre = document.createElement("div");

    nouvelle_note.appendChild(nouvelle_note.barre_de_titre);
    nouvelle_note.barre_de_titre.className = "barre-de-titre";

    // Titre de la note :
    nouvelle_note.titre = document.createElement("span");
    nouvelle_note.titre.setAttribute("contenteditable", "true");
    nouvelle_note.titre.className = "titre-note";
    nouvelle_note.barre_de_titre.appendChild(nouvelle_note.titre);
    nouvelle_note.titre.textContent = titre;

    // Bouton de supression 
    nouvelle_note.bouton_supression = document.createElement("button");
    nouvelle_note.barre_de_titre.appendChild(nouvelle_note.bouton_supression);
    nouvelle_note.bouton_supression.className = "bouton-fermer";
    nouvelle_note.bouton_supression.textContent = "x";

    //Champ texte :
    nouvelle_note.champ = document.createElement("textarea");
    nouvelle_note.appendChild(nouvelle_note.champ);
    nouvelle_note.champ.placeholder = "Contenu de la note";
    nouvelle_note.champ.value = contenu;



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

    nouvelle_note.id_bdd = id;

    //Méthodes

    nouvelle_note.sauvegarder = function () {

        // On veut :
        // - si la note vien d'être créée, ajouter une ligne qui lui correspond dans la BDD (incluant titre, content, x, y)
        // - si la note existe déjà, mettre à jour la ligne qui lui correspond (incluant titre, content, x, y)

        if (!nouvelle_note.id_bdd) {
            var url_script_php = "./php/script_traitement/traitement_ajout_note.php";
        }
        else {
            // On met à jour la note dans la BDD
            var url_script_php = "./php/script_traitement/traitement_updated_note.php";
        }

        console.log("Sauvegarde de la note : " + nouvelle_note.champ.value);

        $.ajax(url_script_php, {
            type: "POST",
            data: {
                id: nouvelle_note.id_bdd,
                titre: nouvelle_note.titre.textContent,
                content: nouvelle_note.champ.value,
                x: nouvelle_note.style.left,
                y: nouvelle_note.style.top
            },
            success: function (data) {

                if (!nouvelle_note.id_bdd) {
                    nouvelle_note.id_bdd = data;
                    // On récupère l'id de la note dans la BDD

                    console.log("Nouvelle note créée avec l'id : " + nouvelle_note.id_bdd);
                }
            },
        });

    };

    nouvelle_note.supprimer = function () {
        const confirmer = confirm('Vous voulez vraiment supprimer cette note ?');
        if (confirmer) {

            $.ajax("./php/script_traitement/traitement_delete_note.php", {
                type: "POST",
                data: {
                    id: nouvelle_note.id_bdd
                },
                success: function (data) {
                    console.log("Note supprimée : " + nouvelle_note.id_bdd);
                },
            });

            nouvelle_note.remove();
        }
    };

    // Déclancheur de sauvegarde automatique
    nouvelle_note.champ.addEventListener("blur", nouvelle_note.sauvegarder);

    // Declancheur de suppression de note
    nouvelle_note.bouton_supression.addEventListener("click", nouvelle_note.supprimer);
};


// Declencheur de création de note
document.body.addEventListener("dblclick", function (event) { ajouter_note(event.clientX - 50, event.clientY - 20); });

// il faudrait que ces coordonées proviennent de l'événement dbonclick (car elle depend du curseur)
