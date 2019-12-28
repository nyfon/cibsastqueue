<?php
/*
Creator: Roberto Michelson
Licence: GPLv3
*/
defined('BASEPATH') OR exit('No direct script access allowed');

$config['title'] =  "Queues - Monitor";  //Page title
$config['customuser'] = false; // Used if you want to show a custom name from extension owner (loaded from database)
$config['usersdatatypearray'] =  TRUE;  // False for object
$config['refresh'] =  5000  ;  // Time in milisecongs to refrsh page queue
$config['asterisk_ajam'] = array("host" => "172.20.18.91", "port" => "8088"); // Asterisk server IP adrress and AJAM port 
$config['asterisk_ami'] = array("username" => "snep", "secret" => "sneppass"); // User and psw configured in asterisk manager.conf file
//$config['exten_status_lang'] = "pt-br"; 

