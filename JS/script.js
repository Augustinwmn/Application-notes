function ajouter_note(x, y){
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
    // + gestion du positionnement ?

    //Chaque élément enfant de notre note pourra être considéré comme une propriété de celle-ci, ce qui facilitera l'accès à ces élément depuis la note(En plus d'être assez élégant dans le concept). La note n'est plus un simple élément HTML mais un objet personnalisé. 

    //Barre de titre :
    nouvelle_note.barre_de_titre = document.createElement("div");
    nouvelle_note.appendChild(nouvelle_note.barre_de_titre);
    nouvelle_note.barre_de_titre.className = "barre-de-titre";

    // Bouton de supression 
    nouvelle_note.bouton_supression = document.createElement("button");
    nouvelle_note.barre_de_titre.appendChild(nouvelle_note.bouton_supression);
    nouvelle_note.bouton_supression.className = "bouton-fermer";
    nouvelle_note.bouton_supression.textContent = "x";
    // + gestion du positionnement ?

    //Champ texte :
    nouvelle_note.champ = document.createElement("textarea");
    nouvelle_note.appendChild(nouvelle_note.champ);
    // + gestion du positionnement ?

   
    // Gestion glisser-déposer
    
    $( nouvelle_note ).draggable({
        stack:".fenetre"
    });
    

}

document.body.ondblclick = function () {
    ajouter_note(event.clientX - 50, event.clientY - 20);  // On utilise les coordonnées de l'événement pour positionner la note
};
// il faudrait que ces coordonées proviennent de l'événement dbonclick (car elle depend du curseur)
