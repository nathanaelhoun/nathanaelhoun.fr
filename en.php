<?php
require 'assets/php/functions.php';
?>


<!--
	Modifié par Nathanaël Houn pour son site personnel.
	Version anglaise
	google-site-verification: google1b4e0c68de9909ca.html
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->

<!DOCTYPE HTML>


<html>
	<head>
		<title>Nathanaël Houn - Student in computer science</title>
		<link rel="alternate" hreflang="fr" href="https://www.nathanaelhoun.fr"/>
		<meta name="robots" content="noindex">
		<meta name="google-site-verification" content="poAxTBpoQFIHwIVDO9qTaDHRF-_bTdfn3vGup3KPf7g" />
		<meta name="Description" content="Welcome to Nathanaël Houn, computer science enthousiast since when I was younger, and student in Besançon (France)." />
		<meta name="Keyword" content="Nathanaël Houn, student, computer science, Licence informatique, CMI, Cursus Master en Ingénierie, computer enthousiast" />
		<meta name="Copyright" content="Nathanaël Houn"/>
		<link rel="icon" sizes="32x32" href="images/favicon.ico" type="image/png">
		
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
	</head>
	<body class="is-preload">

		<!-- Page Wrapper -->
			<div id="page-wrapper">

				<!-- Header -->
					<header id="header" class="alt">
						<h1><a href="index.html">Nathanaël Houn</a></h1>
						<nav>
							<a href="index"><i class="fa fa-arrow-right"></i> FR</a>
						</nav>
					</header>

				
				<!-- Banner -->
					<section id="banner">
						<div class="inner">
							<h2>Welcome to Nathanaël Houn</h2>
							<p>Student and computer science enthousiast</a></p>
						</div>
					</section>

				<!-- Wrapper -->
					<section id="wrapper">

						<!-- WhoAmI -->
							<section id="WhoAmI" class="wrapper spotlight style1">
								<div class="inner">
									<a href="" class="image"><img src="images/whoami.jpg" alt="" /></a>
									<div class="content">
										<h2 class="major">Who am I ?</h2>
										<p>Already interested in computer since when I was younger, my interest turned into a true passion when I was about 15 years old. I loved experimenting with motherboards, GPUs and others components, sometimes causing some damage but always learning from my mistakes. I also discovered programing and HTML on the Internet, and I have spent a tremendous amount of time learning these things since 2018.</p>
										<a href="#footer" class="special">Get in touch</a>
									</div>
								</div>
							</section>

						<!-- studies -->
							<section id="studies" class="wrapper alt spotlight style2">
								<div class="inner">
									<a href="#" class="image"><img src="images/cmi.jpg" alt="" /></a>
									<div class="content">
										<h2 class="major">My curriculum</h2>
										<p>After graduated from the <em>baccalauréat</em> program (French High School Diploma) with honours, I decided to study in Computer Science. I chose the <em>Cursus Master en Ingénierie</em>, a french university curriculum at the <em>Franche-Comté</em>'s University, where I am currently in my first year of the program. The <em>CMI</em> is an equivalent for the Master of Engineering Program.</p> 
										<a href="http://figure-network.org/" class="special">Learn more about <em>CMI</em></a>
										<a href="http://sciences.univ-fcomte.fr/pages/fr/menu3795/formations/cmi-informatique-besancon-17938-15943.html" class="special">The Computer Sciences <em>CMI</em> curriculum in Besançon</a>
									</div>
								</div>
							</section>


						
						<!-- Projects -->
							<section id="projects" class="wrapper style1">
								<div class="inner">
									<h2 class="major">My projects</h2>
									<section class="features">
										<article>
											<a href="#projects" class="image"><img src="images/drMario.jpg"></a>
											<h3 class="major">Dr Mario</h3>
											<p>Made on my own time, this is a simulation of the retro-game Dr Mario. 
												<br/>Still in development
												<br/>Mobile controls are not available for the moment.
											</p>
											<a href="drMario.html" class="special">Give it a try</a>
										</article>
										<article>
											<a href="#projects" class="image"><img src="images/discordbot.jpg"></a>
											<h3 class="major">Discord bot</h3>
											<p>A little Discord bot, which made me discover JavaScript and Heroku. Has no real usefulness beyond having fun and learning. </p>
											<a href="https://github.com/nathanaelhoun/Discordbot" class="special">See the code on Github</a>
										</article>
										<article>
											<a href="#" class="image"><img src="images/github.jpg" alt="" /></a>
											<h3 class="major">Github</h3>
											<p>Please feel free to browse through some of my projects either created for the college or on my free time.</p>										
											<a href="https://github.com/nathanaelhoun" class="special">Check my Github account</a>
										</article>
									</section>
									

								</div>

							</section>

					</section>

				<!-- Footer -->
					<section id="footer">
						<div class="inner">
							<h2 class="major">Say hello !</h2>
							<p>If you are interested by my profile, or if you have any comments about this website, or if you want to contact me for any other reason, feel free to use the form below.</p>
							<form method="post" action="assets/php/form.php">
								<?php getFlash(); ?>	
								<div class="fields">
									<div class="field">
										<label for="name">Name</label>
										<input type="text" name="name" id="name" />
									</div>
									<div class="field">
										<label for="email">Email</label>
										<input type="email" name="email" id="email" />
									</div>
									<div class="field">
										<label for="subject">Subject</label>
										<input type="text" name="subject" id="subject">
									</div>
									<div class="field">
										<label for="message">Message</label>
										<textarea name="message" id="message" rows="4"></textarea>
									</div>
								</div>
								<ul class="actions">
									<li><input type="submit" value="Send message" /></li>
								</ul>
							</form>
							<ul class="contact">
								<li class="fa-home">
									Héricourt (France)
								</li>
								<li class="fa-linkedin"><a href="https://fr.linkedin.com/in/nathana%C3%ABl-houn">LinkedIn</a></li>
								<li class="fa-file"><a href="Nathanaël%20Houn%20Étudiant%20en%20Informatique%20CV%20online%20version.pdf">My resume (french)</a></li>
							</ul>
							<ul class="copyright">
								<li>&copy; Nathanaël Houn</li><li>Last update on 29/04/2019</li><li>Design: thanks to <a href="http://html5up.net">HTML5 UP</a></li>
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