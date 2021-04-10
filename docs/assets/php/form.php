<?php
//Récupération des infos du formulaire, créé par Nathanaël Houn

//Récupération des variables
$name = htmlentities($_POST['name']);
$email = htmlentities($_POST['email2']);
$subject = htmlentities($_POST['subject']);
$message = htmlentities($_POST['message']);
$shouldBeEmpty = htmlentities($_POST["email"]);

if (strlen($shouldBeEmpty) > 0 || strlen($name . $email . $subject . $message) == 0) {
	// Le formulaire vide a été rempli, probablement un robot : redirection
	header('Location:' . $_SERVER['HTTP_REFERER'] . '#footer-message-not-sent');
	exit;
}

//Forme de l'email à envoyer
$headers = 'MIME-Version: 1.0' . "\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\n";
$headers .= 'From : ' . $email;

$content = <<<CONTENT
<html>
	<head>
		<title>Nouvel email depuis nathanaelhoun.fr</title>
	</head>
	<body>
		<p><strong>Nom : </strong>$name</p>
		<p><strong>Adresse mail : </strong>$email</p>
		<p><strong>Sujet : </strong>$subject</p>
		<p><strong>Message : </strong>$message</p>
	</body>
</html>
CONTENT;

//Envoi du mail
if (mail('contact@nathanaelhoun.fr', 'Nouvel email depuis nathanaelhoun.fr : ' . $email, $content, $headers)) {
	header('Location:' . $_SERVER['HTTP_REFERER'] . '#footer-message-sent');
	exit();
}

header('Location:' . $_SERVER['HTTP_REFERER'] . "#footer-message-not-sent?name=$name&email2=$email&subject=$subject&message=$message");
