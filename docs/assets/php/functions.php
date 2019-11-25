<?php
//Fonctions d'affichage d'avertissements
session_start();

// Mettre en place un avertissement flash
// $avertissement : texte à afficher dans l'avertissement
// $type : type de avertissement -> success / alert
function setFlash($avertissement, $type) {
	$_SESSION['Flash']['avertissement'] = $avertissement;
	$_SESSION['Flash']['type'] = $type;
}

//Afficher un avertissement flash
function getFlash() {
	if(isset($_SESSION['Flash'])) {
		//avertissement
		echo "<div class =\"avertissement-flash avertissement-flash--" . $_SESSION['Flash']['type'] . "\">";
			echo $_SESSION['Flash']['avertissement'];
		echo "</div>";

		// déstruction de la variable
		unset($_SESSION['Flash']);
	}
}
?>