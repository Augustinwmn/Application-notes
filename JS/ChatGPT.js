var fenetre = document.getElementsByClassName('fenetre');
var zIndexCounter = 1; // Compteur pour gérer le z-index des fenêtres
var numero_notes = 0;

function charger_notes() {
    // Récupérer les notes depuis le localStorage
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        numero_notes = notes.length;
        notes.forEach(noteData => {
            ajouter_note_existant(noteData);
        });
    }
}

function ajouter_note() {
    numero_notes++;
    var note = document.createElement('div');
    note.classList.add('fenetre');
    note.innerHTML = '<div class="barre-de-titre"><span>Notes ' + numero_notes + '</span><button class="bouton-fermer">&times;</button></div><textarea></textarea>';
    document.body.appendChild(note);

    var boutons = note.getElementsByClassName('bouton-fermer');
    for (let btn of boutons) {
        btn.onclick = delete_note;
    }

    note.style.zIndex = zIndexCounter++;

    // Ajouter la fonctionnalité de déplacement à la barre de titre
    var barreDeTitre = note.querySelector('.barre-de-titre');

    barreDeTitre.onmousedown = function(event) {
        var shiftX = event.clientX - note.getBoundingClientRect().left;
        var shiftY = event.clientY - note.getBoundingClientRect().top;

        note.style.zIndex = zIndexCounter++; // Met à jour le z-index pour qu'elle passe devant les autres fenêtres
        // Fonction pour déplacer la fenêtre
        function moveNote(e) {
            note.style.left = e.clientX - shiftX + 'px';
            note.style.top = e.clientY - shiftY + 'px';
        }

        // Lorsque la souris est relâchée, on arrête de déplacer la fenêtre
        function stopMoving() {
            document.removeEventListener('mousemove', moveNote);
            document.removeEventListener('mouseup', stopMoving);
            sauvegarder_notes(); // Sauvegarder la position après le déplacement
        }

        // Commencer à déplacer la fenêtre
        document.addEventListener('mousemove', moveNote);
        document.addEventListener('mouseup', stopMoving);
    };

    sauvegarder_notes();
}

function ajouter_note_existant(noteData) {
    var note = document.createElement('div');
    note.classList.add('fenetre');
    note.innerHTML = '<div class="barre-de-titre"><span>' + noteData.titre + '</span><button class="bouton-fermer">&times;</button></div><textarea>' + noteData.texte + '</textarea>';
    document.body.appendChild(note);

    var boutons = note.getElementsByClassName('bouton-fermer');
    for (let btn of boutons) {
        btn.onclick = delete_note;
    }

    note.style.zIndex = zIndexCounter++;

    // Restaurer la position des notes à partir du localStorage
    if (noteData.position) {
        note.style.left = noteData.position.left;
        note.style.top = noteData.position.top;
    }

    // Ajouter la fonctionnalité de déplacement à la barre de titre
    var barreDeTitre = note.querySelector('.barre-de-titre');
    barreDeTitre.onmousedown = function(event) {
        var shiftX = event.clientX - note.getBoundingClientRect().left;
        var shiftY = event.clientY - note.getBoundingClientRect().top;

        note.style.zIndex = zIndexCounter++; // Met à jour le z-index pour qu'elle passe devant les autres fenêtres
        // Fonction pour déplacer la fenêtre
        function moveNote(e) {
            note.style.left = e.clientX - shiftX + 'px';
            note.style.top = e.clientY - shiftY + 'px';
        }

        // Lorsque la souris est relâchée, on arrête de déplacer la fenêtre
        function stopMoving() {
            document.removeEventListener('mousemove', moveNote);
            document.removeEventListener('mouseup', stopMoving);
            sauvegarder_notes(); // Sauvegarder la position après le déplacement
        }

        // Commencer à déplacer la fenêtre
        document.addEventListener('mousemove', moveNote);
        document.addEventListener('mouseup', stopMoving);
    };
}

document.body.ondblclick = ajouter_note;

function delete_note() {
    const confirm = window.confirm('Vous voulez vraiment supprimer cette note ?');
    if (confirm) {
        var noteASupprimer = event.target.closest('.fenetre');
        document.body.removeChild(noteASupprimer);
        sauvegarder_notes();
    }
}

function sauvegarder_notes() {
    // Récupérer toutes les fenêtres de notes
    const notes = [];
    const fenetres = document.getElementsByClassName('fenetre');
    for (let fenetre of fenetres) {
        const titre = fenetre.querySelector('.barre-de-titre span').innerText;
        const texte = fenetre.querySelector('textarea').value;
        const position = {
            left: fenetre.style.left || '0px', // Valeur par défaut si la position n'est pas définie
            top: fenetre.style.top || '0px'
        };
        notes.push({ titre, texte, position });
    }

    // Sauvegarder les notes dans le localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Charger les notes au démarrage de la page
window.onload = charger_notes;
