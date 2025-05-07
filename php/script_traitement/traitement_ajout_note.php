<?php

// A modifier : valeur à chercher dans le tableau $_POST

if (isset($_POST["titre"]) && isset($_POST["content"]) && isset($_POST["x"]) && isset($_POST["y"]) && trim($_POST["titre"]) != "" && trim($_POST["content"]) != "") {

    $titre = $_POST["titre"];
    $content = $_POST["content"];
    $x = $_POST["x"];
    $y = $_POST["y"];
    

    require("../config.php");
    require("../bdd.class.php");
    $bdd = new BDD();
    $bdd->requete("INSERT INTO `notes` (`id`, `titre`, `content`, `x`, `y`) VALUES (NULL, ?, ?, ?, ?)", [$titre, $content, $x, $y]);
}

echo $bdd->requete("SELECT MAX(`id`) FROM `notes` ")[0]['MAX(`id`)']; // Retourne l'id de la dernière note insérée

?>