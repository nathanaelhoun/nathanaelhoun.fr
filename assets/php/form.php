<?php
// Récupération des infos du formulaire, créé par Nathanaël Houn 
require 'functions.php';

// Récupération des variables
$name = htmlentities($_POST['name']);
$email = htmlentities($_POST['email']);
$subject = htmlentities($_POST['subject']);
$message = htmlentities($_POST['message']);


// Forme de l'email à envoyer 
$headers = 'MIME-Version: 1.0'."\n";
$headers .= 'Content-type: text/html; charset=utf-8'."\n";
$headers .= 'From : '.$email;

$content = '
	<html>
		<head>
			<title> Nouvel email depuis nathanaelhoun.fr </title>
		</head>';
$content .= '
		<body>
			<p><strong>Nom :</strong> '.$name;
$content .= '</p>
			<p><strong>Adresse mail :</strong> ' .$email;
$content .= '</p>
			<p><strong>Sujet :</strong> '.$subject;
$content .= '</p>
			<p><strong>Message :</strong> '.$message;
$content .= '</p></body></html>';


//Envoi du mail
if(mail('contact@nathanaelhoun.fr', 'Nouvel email depuis nathanaelhoun.fr : '. $email, $content, $headers)) {
	setFlash("<i class=\"icon fa-envelope\"></i>&nbsp;<strong> C'est envoyé ! </strong>Merci pour votre message, j'y répondrai dans les meilleurs délais. <br><br> ", "success");
} else {
	setFlash("<i class=\"icon fa-exclamation-triangle\"></i>&nbsp;<strong>Attention ! </strong>Une erreur s'est produite lors de l'envoi du mail... <br><br> ", "alert");
}

//Redirection vers la page
header('Location:' . '../../' . '#footer');

?>