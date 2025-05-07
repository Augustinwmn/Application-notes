<?php

// A modifier : valeur à chercher dans le tableau $_POST

if (isset($_POST["id"]) 
&& isset($_POST["titre"]) 
&& isset($_POST["content"]) 
&& isset($_POST["x"]) 
&& isset($_POST["y"]) 
&& ( 
    trim($_POST["titre"]) != "" 
    || trim($_POST["content"]) != "" 
    )) {

    $id = $_POST["id"]; // Récupération de l'id de la note à mettre à jour
    $titre = $_POST["titre"];
    $content = $_POST["content"];
    $x = $_POST["x"];
    $y = $_POST["y"];
    

    require("../config.php");
    require("../bdd.class.php");
    $bdd = new BDD();
    $bdd->requete("UPDATE `notes` SET `titre` = ?, `content` = ?, `x` = ?, `y` = ? WHERE `notes`.`id` = ?", [$titre, $content, $x, $y , $id]);
}

?>