<?php

class BDD
{

    /* 
    - Etablir une connexion à la BDD
    - Envoyer des requêtes à la BDD
    - Récuperer des données de la BDD
    */
    public function requete($requete, $valeurs = [])
    {


        //On établit la connexion
        $connexion = new PDO("mysql:host=" . SERVERNAME . "; dbname=" . DBNAME, USERNAME, PASSWORD);
        // On prépare puis exécute la requête (envoi vers la BDD)
        $preparation = $connexion->prepare($requete);
        $preparation->execute($valeurs);

        // On récupère le résultat / la réponse de la BDD
        return $preparation->fetchAll(PDO::FETCH_ASSOC);

    }

    /* 
    La méthode BDD->requete() est particulièrement intelligente :
     - Elle peut être utilisée avec un seul ou deux paramètres selon besoin
        > Si la requete n'a pas de paramètres, on peut l'appeler avec un seul paramètre
        > Si la requete a des paramètres, on peut l'appeler avec deux paramètres
        > Dans le cas où seul la requete est fournie, la méthode BDD->requete() renvoie un tableau vide

     - Elle renverra, au cas où, toujours un résultat ...
    */
}