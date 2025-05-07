<?php

// A modifier : valeur à chercher dans le tableau $_POST

if (isset($_POST["id"]) && !empty($_POST["id"])) {

    $id = $_POST["id"]; // Récupération de l'id de la note à mettre à jour
    
    require("../config.php");
    require("../bdd.class.php");
    $bdd = new BDD();
    $bdd->requete("DELETE FROM `notes` WHERE `notes`.`id` = ?", [$id]);
}

?>