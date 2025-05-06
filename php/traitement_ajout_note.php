<?php

// A modifier : valeur à chercher dans le tableau $_POST

require("config.php");


if (isset($_POST["title"]) && isset($_POST["content"]) && trim($_POST["title"]) != "" && trim($_POST["content"]) != "") {

    // A mettre à jour
    $title = $_POST["title"];
    $content = $_POST["content"];
    /*
        //On établit la connexion
        $connexion = new PDO("mysql:host=" . SERVERNAME . ";dbname=" . DBNAME, USERNAME, PASSWORD);

        // On écrit la requête à envoyer
        $requete = "INSERT INTO `pages` (`id`, `titre`, `contenu`) VALUES (NULL, ?, ?)";

        // On prépare puis exécute la requête (envoi vers la BDD)
        $preparation = $connexion->prepare($requete);
        $preparation->execute([$title, $content]);// Le tableau en paramètre contient, dans le bon ordre des valeurs qui remplaçeront les "?" dans notre schéma de requête

    */
    require("bdd.class.php");
    $bdd = new BDD();
    $bdd->requete("INSERT INTO `notes` (`id`, `titre`, `content`, `x`, `y`) VALUES (NULL, ?, ?, ?, ?)", [$title, $content]);
}

// header("Location: ./index.html");
?>