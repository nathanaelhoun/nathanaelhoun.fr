<?php
require 'assets/php/functions.php';
?>


<!--
	Modifié par Nathanaël Houn pour son site personnel.
	Version française
	google-site-verification: google1b4e0c68de9909ca.html
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->

<!DOCTYPE HTML>


<html>
	<head>
		<title>Nathanaël Houn - Étudiant en Informatique</title>
		<meta name="google-site-verification" content="poAxTBpoQFIHwIVDO9qTaDHRF-_bTdfn3vGup3KPf7g" />
		<link rel="alternate" hreflang="en" href="https://www.nathanaelhoun.fr/en"/>
		<link rel="alternate" hreflang="x-default" href="https://www.nathanaelhoun.fr/en"/>
		<meta name="Description" content="Bienvenue chez Nathanaël Houn, passionné d'informatique depuis de nombreuses années, et étudiant en Licence Informatique CMI à Besançon." />
		<meta name="Keyword" content="Nathanaël Houn, étudiant, informatique, Licence informatique, CMI, Cursus Master en Ingénieurie, passionné d'informatique" />
		<meta name="Copyright" content="Nathanaël Houn"/>
		<link rel="icon" sizes="32x32" href="images/favicon.ico" type="image/png">

		<link rel="stylesheet" href="assets/css/main.css" />
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
	</head>
	<body class="is-preload">

		<!-- Page Wrapper -->
			<div id="page-wrapper">

				<!-- Header -->
					<header id="header" class="alt">
						<h1><a href="index.html">Nathanaël Houn</a></h1>
						<nav>
							<a href="en"><i class="fa fa-arrow-right"></i> EN</a>
						</nav>
					</header>

				
				<!-- Banner -->
					<section id="banner">
						<div class="inner">
							
							<h2>Bienvenue chez Nathanaël Houn</h2>
							<p>Étudiant et passionné d'informatique</a></p>
						</div>
					</section>

				<!-- Wrapper -->
					<section id="wrapper">

						<!-- WhoAmI -->
							<section id="WhoAmI" class="wrapper spotlight style1">
								<div class="inner">
									<a href="" class="image"><img src="images/whoami.jpg" alt="" /></a>
									<div class="content">
										<h2 class="major">Qui suis-je ?</h2>
										<p>Intéressé par l'informatique depuis tout petit, j'en ai fait une véritable passion depuis mes 15 ans. J'ai fait beaucoup d'expériences hardware avec des cartes-mères et autres composants informatiques, causant parfois quelques dégâts mais apprenant de mes erreurs. J'ai aussi découvert, via Internet, la programmation et l'HTML, dans lesquels je passe plus de temps depuis 2018.</p>
										<a href="#footer" class="special">Me contacter</a>
									</div>
								</div>
							</section>

						<!-- studies -->
							<section id="studies" class="wrapper alt spotlight style2">
								<div class="inner">
									<a href="#" class="image"><img src="images/cmi.jpg" alt="" /></a>
									<div class="content">
										<h2 class="major">Mon parcours</h2>
										<p>Après l'obtention de mon baccalauréat scientifique avec mention, j'ai décidé de m'orienter dans l'informatique. J'ai choisi le Cursus Master en Ingénieurie Informatique de l'Université de Franche-Comté, où j'étudie actuellement en première année de licence.</p>
										<a href="http://reseau-figure.fr/quest-ce-que-le-cmi/" class="special">En savoir plus sur le CMI</a>
										<a href="http://sciences.univ-fcomte.fr/pages/fr/menu3795/formations/cmi-informatique-besancon-17938-15943.html" class="special">La formation CMI Informatique à Besançon</a>
									</div>
								</div>
							</section>

						<!-- Hobbies
							<section id="hobbies" class="wrapper spotlight style3">
								<div class="inner">
									<a href="#" class="image"><img src="images/cmi.jpg" alt="" /></a>
									<div class="content">
										<h2 class="major">Mes hobbies</h2>
										<p>À côté de mes études, j'apprends la guitare.</p>
									</div>
								</div>
							</section>

						-->
						
						<!-- Projects -->
							<section id="projects" class="wrapper style1">
								<div class="inner">
									<h2 class="major">Mes projets</h2>
									<section class="features">
										<article>
											<a href="#projects" class="image"><img src="images/discordbot.jpg"></a>
											<h3 class="major">Bot discord</h3>
											<p>Un petit robot pour Discord, qui m'a permis de découvrir le JavaScript et Heroku. N'a pas de réelle utilité si ce n'est s'amuser et apprendre.</p>
											<a href="https://github.com/nathanaelhoun/Discordbot" class="special">Voir le code sur Github</a>

										</article>
										<article>
											<a href="#projects" class="image"><img src="images/github.jpg" alt="" /></a>
											<h3 class="major">Github</h3>
											<p>Vous pouvez retrouver quelques projets codés pour l'Université ou sur mon temps personnel.</p>										
											<a href="https://github.com/nathanaelhoun" class="special">Voir la page</a>
										</article>
										


									</section>
									

								</div>

							</section>

					</section>

				<!-- Footer -->
					<section id="footer">
						<div class="inner">
							<h2 class="major">Contactez-moi</h2>
							<p>Si mon profil vous intéresse, si vous avez un conseil pour ce site, ou si vous souhaitez me contacter pour toute autre raison, sentez-vous libre d'utiliser le formulaire ci-dessous, il est prévu à cet effet.</p>
							<form method="post" action="assets/php/form.php">
								<?php getFlash(); ?>	
								<div class="fields">
									<div class="field">
										<label for="name">Nom</label>
										<input type="text" name="name" id="name" />
									</div>
									<div class="field">
										<label for="email">Adresse mail</label>
										<input type="email" name="email" id="email" />
									</div>
									<div class="field">
										<label for="subject">Sujet</label>
										<input type="text" name="subject" id="subject">
									</div>
									<div class="field">
										<label for="message">Message</label>
										<textarea name="message" id="message" rows="4"></textarea>
									</div>
								</div>
								<ul class="actions">
									<li><input type="submit" value="Envoyer le message" /></li>
								</ul>
							</form>
							<ul class="contact">
								<li class="fa-home">
									Héricourt
								</li>
								<li class="fa-linkedin"><a href="https://fr.linkedin.com/in/nathana%C3%ABl-houn">LinkedIn</a></li>
								<li class="fa-file"><a href="Nathanaël%20Houn%20Étudiant%20en%20Informatique%20CV%20online%20version.pdf">Mon CV</a></li>
							</ul>
							<ul class="copyright">
								<li>&copy; Nathanaël Houn</li><li>Dernière mise à jour le 14/03/2019 - Journée de Pi</li><li>Design : merci à <a href="http://html5up.net">HTML5 UP</a></li>
							</ul>
						</div>
					</section>

			</div>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>

	</body>
</html>