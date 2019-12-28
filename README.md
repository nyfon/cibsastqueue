# CiBsAstQueue
###################
What is CiBsAstQueue
###################

CiBsAstQueue is an application developed with codeigniter 3 and bootstrap 4, which displays the service queues
of an asterisk application over AJAM.

*******************
Requirements
*******************

PHP version 5.6 or newer is recommended.
Asterisk version 13 or newer

*******************
Configuration
*******************
1 - Configure Asynchronous Javascript Asterisk Manager (AJAM) in your Asterisk server, see: https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4817256

2 - Set the custom configurations in \application\config\custom.php file on your project
	$config['title'] =  "Queues - Monitor";  //Page title
	$config['customuser'] = false; // Used if you want to show a custom name from extension owner (loaded from database)
	$config['usersdatatypearray'] =  TRUE;  // False for object. Used if your users' data return type is an array or object
	$config['refresh'] =  5000  ;  // Time in milisecongs to refresh page queue
	$config['asterisk_ajam'] = array("host" => "172.20.18.91", "port" => "8088"); // Asterisk server IP adrress and AJAM port 
	$config['asterisk_ami'] = array("username" => "snep", "secret" => "sneppass");// AMI unsername and password
