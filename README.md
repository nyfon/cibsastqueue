# CiBsAstQueue
###################
What is CiBsAstQueue
###################

CiBsAstQueue is an application developed with Codeigniter 3 and Bootstrap 4, which displays the service queues
of an Asterisk application over AJAM.

*******************
# Requirements


PHP version 5.6 or newer is recommended.
Asterisk version 13 or newer

*******************
# Configuration

1 - Configure Asynchronous Javascript Asterisk Manager (AJAM) in your Asterisk server, see: https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4817256

2 - Set the custom configurations in \application\config\custom.php file on your project

	$config['title'] =  "Queues - Monitor";  //Page title	
	
	$config['customuser'] = false; // Used if you want to show a custom name from extension owner (loaded from database)	
	
	$config['usersdatatypearray'] =  TRUE;  // False for object. Used if your users' data return type is an array or object
	
	$config['refresh'] =  5000  ;  // Time in milisecongs to refresh page queue
	
	$config['asterisk_ajam'] = array("host" => "172.20.18.91", "port" => "8088"); // Asterisk server IP adrress and AJAM port 
	
	$config['asterisk_ami'] = array("username" => "snep", "secret" => "sneppass");// AMI unsername and password



###################
Qu'est-ce le CiBsAstQueue
###################

Le CiBsAstQueue est un app developé avec le Codeigniter 3 et le Bootstrap 4, qui affiche les files d'attente de service
de l'Asterisk app.

*******************
# L'exigences 


PHP version 5.6 ou ultérieure est recommandée
Asterisk version 13 ou ultérieure

*******************
# La configuration du système

1 - Mettre en place Asynchronous Javascript Asterisk Manager (AJAM) sur votre serveur Asterisk: https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4817256

2 - Définissez les configurations personnalisées dans le fichier \application\config\custom.php de votre projet

	$config['title'] =  "Queues";  //Titre de la page
	
	$config['customuser'] = false; // Ce devoir être utilisé si vous souhaitez afficher un nom personnalisé du propiétaire du poste téléphonique (chargé à partir de la base de données)	
	
	$config['usersdatatypearray'] =  TRUE;  // Utilisez FALSE pour l'objet. C'est utilizsé si votre donnéss utilisateur renvoyer un étalage ou un objet.
	
	$config['refresh'] =  5000  ;  // Le temps en millisecondes pour recharger la page
	
	$config['asterisk_ajam'] = array("host" => "172.20.18.91", "port" => "8088"); // Le IP et l'addresss du serveur asterisk et AJAM
	
	$config['asterisk_ami'] = array("username" => "snep", "secret" => "sneppass");// l'utilisateur et le mot de passe du AMI
