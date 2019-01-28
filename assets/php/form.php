<?php
// Récupération des infos du formulaire, créé par Nathanaël Houn 

// Récupération des variables
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];


// Forme de l'email à envoyer 
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
mail('contact@nathanaelhoun.fr', 'Nouvel email depuis nathanaelhoun.fr : '. $email, $content, 'From : '.$email);

//Redirection vers la page
header('Location:' . $_SERVER['HTTP_REFERER'] . '#footer');

?>