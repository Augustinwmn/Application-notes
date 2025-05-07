<?php

require("../config.php");
require("../bdd.class.php");

$bdd = new BDD();

echo json_encode($bdd->requete("SELECT * FROM `notes`"));

?>