document.getElementById("style").addEventListener("click", function () {
    var style = document.getElementById("style").value;

    
    var notes = document.querySelectorAll(".fenetre");
    notes.forEach(function (note) {
        note.style.backgroundColor = style;
    });
});
