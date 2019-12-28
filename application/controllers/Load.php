<?php
/*
Creator: Roberto Michelson
Licence: GPLv3
*/
class User{
	public $name;
	public $extension;  

	function set_name($name) {
	  $this->name = $name;
	}
	function get_name() {
	  return $this->name;
	}

	function set_extension($extension) {
		$this->extension = $extension;
	  }
	  function get_extension() {
		return $this->extension;
	  }

}


class Load extends CI_Controller 
{	
		
    public function __construct() 
    {
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('User_model');   
		$this->config->load('custom');				  
	
    }
    
  public function index()
  {    		
        $urlbase = base_url();
		$data["url"] =  $urlbase."index.php/load/showqueues";          	
		$data["usersdatatypearray"]= $this->config->item('usersdatatypearray');
		$data["refresh"] =	$this->config->item('refresh');		
        $this->load->view('show', $data);
        
  }

  public function queue($fila)
  {       
      $urlbase = base_url();
	  $data["url"] = $urlbase."index.php/load/showqueue/".$fila;
	  $data["usersdatatypearray"]= $this->config->item('usersdatatypearray');
	  $data["refresh"] =	$this->config->item('refresh');	
      $this->load->view('show', $data);
  }

  
private function callcurl($url)
{
$asterisk_ajam = $this->config->item('asterisk_ajam');
$asterisk_ami = $this->config->item('asterisk_ami');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://".$asterisk_ajam['host'].":".$asterisk_ajam['port']."/mxml?action=Login&username=".$asterisk_ami['username']."&secret=".$asterisk_ami['secret']);
//curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/32.0.1700.107 Chrome/32.0.1700.107 Safari/537.36');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIESESSION, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
curl_setopt($ch, CURLOPT_COOKIEFILE, '/var/www/ip4.x/file/tmp');  //could be empty, but cause problems on some hosts
curl_setopt($ch, CURLOPT_TIMEOUT, 6); //timeout in seconds
$answer = curl_exec($ch);
if (curl_error($ch)) {
    echo curl_error($ch);
}

$xml2 = simplexml_load_string($answer);

//another request preserving the session
curl_setopt($ch, CURLOPT_URL, $url);
//curl_setopt($ch, CURLOPT_POST, false);
//curl_setopt($ch, CURLOPT_POSTFIELDS, "");
$answer = curl_exec($ch);
if (curl_error($ch)) {
    echo curl_error($ch);
}
$xml2 = simplexml_load_string($answer);
curl_close($ch);
return $xml2;
	
}

function getusers() 
{
	$load_customuser = $this->config->item('customuser');	
	if(!$load_customuser)
	{
		return array();
	}
	$returnarray= $this->config->item('usersdatatypearray');
	$users = array();
	$result = $this->User_model->select_users($returnarray);
	if(empty($result))
	{
		return array();
	}
	$val =  array_keys($result[0]);
	
	if($val[0] != "extension" || $val[1] != "name")
	{
		echo "Error: You need to return an 'extension' and 'name' fields in array!<br> If you dont want to show the extension owner you can set the 'customuser' configuration to FALSE in config/custom.php file.";
		exit;
	}
	if(!$returnarray)
	{		
    	foreach ($result as $obj) {		
			$usr = new User();		
			$usr->set_extension($obj->extension);
			$usr->set_name($obj->name);       
        	$users[] = $usr;
        
		}		
	}
	else{
		$result = $this->User_model->select_users($returnarray);		
		foreach ($result as $arraykey => $array) {
			
			foreach ($array as $key => $value) {				
				if($key == "extension")
				{
					$exten = $value;
				}
				if($key == "name")
				{
					$user = $value;
				}
				
			}
			$users += [$user => $exten];
			
		}

	}
	
	return $users;

}



public function showqueues()
{
	
	$users = $this->getusers();
	$asterisk_ajam = $this->config->item('asterisk_ajam');	
	$xml = $this->callcurl("http://".$asterisk_ajam['host'].":".$asterisk_ajam['port']."/mxml?action=Queuestatus");	
	if($xml == false)
	{
		echo "<br> Can't connect to asterisk server. See config/custom.php to set asterisk IP and PORT or read the instructions to configure Asterisk.";
		exit();
	}
	foreach ($xml->response as $row)
		{
			foreach($row->generic as $generic)
			{
				//print_r( $generic);
				if($generic->attributes()->response == "Success")
				{
					//echo $generic->attributes()->message ;
					echo "<br>";
					if((string)$generic->attributes()->message == "Queue status will follow" )
					{
						echo "<br>";
						$this->listQueues($xml, $users);
					}
					else
					{
						echo 	$generic->attributes()->message;				
					}
					
				}
				
			}
		}
}

public function showqueue($_fila)
{
	$users = $this->getusers();
	$asterisk_ajam = $this->config->item('asterisk_ajam');
	$xml = $this->callcurl("http://".$asterisk_ajam['host'].":".$asterisk_ajam['port']."/mxml?action=Queuestatus&queue=$_fila");	
	foreach ($xml->response as $row)
	{
		foreach($row->generic as $generic)
		{
			//print_r( $generic);
			if($generic->attributes()->response == "Success")
			{
				echo "<br>";
				if((string)$generic->attributes()->message == "Queue status will follow" )
				{
					echo "<br>";
					$this->listQueues($xml, $users);
				}
				else
				{
					echo 	$generic->attributes()->message;				
				}				
			}			
		}
	}
}

function listQueues($xml, $users)
{
	$queues = array();
	foreach ($xml->response as $row)
	{		
		foreach($row->generic as $generic)
		{					
			if($generic->attributes()->event == "QueueParams")
			{			
				array_push( $queues,  $generic->attributes()->queue);				
			}			
		}
	}		
	$this->Show($xml, $queues, $users );	
}

function Show($xml, $_queues, $_users)
{
	$urlbase = base_url(); 
        echo "<div class='row'>";
        echo "<div class='col-md-2'></div>";
        	echo "<div class='col-md-8'>";				 
            	echo "<h1><a href='".$urlbase."index.php/load'>".$this->config->item('title')."</a></h1>";
                    echo "<div id='msg' class='notifications top-right' >";	                
                    echo "</div>";                                   
                echo "</div>";
        echo "<div class='col-md-2'></div>";
        echo "</div>";
	echo "<div class='row'>";
	echo "<div class='col-md-2'></div>";
  	echo "<div class='col-md-8'>";		
	foreach($_queues as $queue)
	{	$urlbase = base_url();
		$cab = $this->QueueSummary($queue);	
		$classloggedin = $this->SetClassLoggedinAndAvailable((string)$cab['Loggedin']);
		$classavail = $this->SetClassLoggedinAndAvailable((string)$cab['Available']);
		echo "<div class='card card-body bg-light'>";		
		echo "<table class='table'>";					
		echo "<tr class='alert alert-primary'><td ><a name='queuename' href='".$urlbase."index.php/load/queue/$queue' class='btn btn-success '>Queue: $queue</a></td>";
		echo "<td ><span class='".$classloggedin."'>Logged in <span class='badge badge-light'> ".(string)$cab['Loggedin']."</span></span></td>";
		echo "<td ><span class='".$classavail."'>Available <span class='badge badge-light'> ".(string)$cab['Available']."</span></span></td>";
		echo "<td ><span class='btn btn-warning btn-sm'>Calls <span class='badge badge-light'>".(string)$cab['Calls']."</span></span></td>";
		echo "<td ><span class='btn btn-warning btn-sm'>On hold <span class='badge badge-light'>".(string)$cab['holdtime']."</span></span></td>";
		echo "<td  ><button  id='$queue'  class='btn btn-default btn-sm dropall'> <span  class='glyphicon glyphicon-remove' aria-hidden='true'> </span> Drop all</button></td>";
		echo "</tr>";
	
		echo "</table>";
		echo "<table class='table'>";	
		echo "<tr class='active' >";
		echo "<th >Extension</th><th >Status</th><th >Incoming</th><th >Last</th><th >Pause</th><th >On call</th>";
		echo "</tr>";		
		foreach ($xml->response as $row)
		{
			foreach($row->generic as $generic)
			{				
				if($generic->attributes()->event == "QueueMember" && (string)$generic->attributes()->queue == $queue  )
				{					
					
					$location = str_replace("SIP/", "", (string)$generic->attributes()->location[0]);					
					$key = array_search($location, $_users);
				    $class = 'badge badge-secondary';
                    if ((int)$generic->attributes()->incall[0] > 0 )
                    {
                        $class = 'badge badge-danger';
                    }
					$status = $this->getStatusText((string)$generic->attributes()->status[0]);
					echo "<tr class='active' > <td ><a id='".(string)$generic->attributes()->location[0]."' title='".$queue."'   class='".$class." dropexten' style=\"color:white;\"  ><span  name='".(string)$generic->attributes()->location[0]."' title='".$queue."' class='fas fa-times' aria-hidden='true'> </span> ".(string)$generic->attributes()->location[0]." - ".$key."</a></td>";
					echo "<td ><span class='".$status[1]."' > ".$status[0]."</span></td>" ; 
					echo "<td ><span class='badge badge-pill badge-success' > ".(string)$generic->attributes()->callstaken[0]."</span></td>";
					echo "<td ><span class='badge badge-pill badge-success' > ".(string)$generic->attributes()->lastcall[0]."</span></td>";
					echo "<td ><span class='badge badge-pill badge-success' > ".(string)$generic->attributes()->paused[0]."</span></td>";
					echo "<td ><span class='".$class."' > ".(string)$generic->attributes()->incall[0]."</span></td>";
					echo "</tr>";					
				}
			}
		}	
	  	echo "</table>";
		echo "<br>";
		echo "<br>";
		echo "</div>";
	}			
		echo "</div>";
	echo "<div class='col-md-2'></div>";
echo "</div>";


}


function  QueueSummary($queue)
{
	$asterisk_ajam = $this->config->item('asterisk_ajam');
	$xml = $this->callcurl("http://".$asterisk_ajam['host'].":".$asterisk_ajam['port']."/mxml?action=QueueSummary");	
	$dadosFila = array();
	foreach ($xml->response as $row)
	{
		foreach($row->generic as $generic)
		{		
			if($generic->attributes()->event == "QueueSummary"  && (string)$generic->attributes()->queue == $queue  )
			{		
				$queueData = array("Loggedin"=>(string)$generic->attributes()->loggedin);
				$queueData = array_merge($queueData,array("Available"=>(string)$generic->attributes()->loggedin) );
				$queueData = array_merge($queueData,array("Calls"=>(string)$generic->attributes()->callers) );
				$queueData = array_merge($queueData,array("holdtime"=>(string)$generic->attributes()->holdtime) );
				$queueData = array_merge($queueData,array("talktime"=>(string)$generic->attributes()->talktime) );
				$queueData = array_merge($queueData,array("maxholdtime"=>(string)$generic->attributes()->longestholdtime) );											
			}			
		}
	}
	return $queueData;	
}


function dropextenfromqueue($exten, $queue)
{
	$asterisk_ajam = $this->config->item('asterisk_ajam');
    $exten = str_replace("SIP","SIP/",$exten);
	$xml = $this->callcurl("http://".$asterisk_ajam['host'].":".$asterisk_ajam['port']."/mxml?action=QueueRemove&Queue=".$queue."&Interface=".$exten);		
	foreach ($xml->response as $row)
	{
		foreach($row->generic as $generic)
		{	
			if($generic->attributes()->response == "Success")
			{
				return true;				
			}
			else
			{
				return false;
			}			
		}
	}
	
}

function logarramalfila($exten, $queue)
{
	$asterisk_ajam = $this->config->item('asterisk_ajam');
    $exten = "SIP/".$exten;
	$xml = $this->callcurl("http://".$asterisk_ajam['host'].":".$asterisk_ajam['port']."/mxml?action=QueueAdd&Queue=".$queue."&Interface=".$exten);			
	foreach ($xml->response as $row)
	{
		foreach($row->generic as $generic)
		{
			print_r( $generic);
			if($generic->attributes()->response == "Success")
			{
				return true;				
			}
			else
			{
				return false;
			}			
		}
	}	
}

function dropallfromqueue($_queue)
{
	$members = $this->queueMembers($_queue);
	if(count($members) > 0)
	{
		foreach($members as $member)
		{  
			$m = str_replace("SIP/","SIP",$member);
         	$this->dropextenfromqueue($m, $_queue);
		}
		 		
		return true;
	}
	else{
		
		return false;
	}
	
}


function queueMembers($queue)
{
	$asterisk_ajam = $this->config->item('asterisk_ajam');
	$xml = $this->callcurl("http://".$asterisk_ajam['host'].":".$asterisk_ajam['port']."/mxml?action=Queuestatus&queue=".$queue);
	$members = array();
		foreach ($xml->response as $row)
		{
			foreach($row->generic as $generic)
			{				
				if($generic->attributes()->event == "QueueMember" )
				{		
					array_push($members , (string)$generic->attributes()->location[0]);
				}				
			}
		}
	
	return $members;	
}


function getStatusText($status)
{	
	$ret = array();
	switch ($status) {
    case "0":
        $ret[0] = "Error";
		$ret[1] = "badge badge-info";
        break;
    case 1:
        $ret[0] = "Logged in";
		$ret[1] = "badge badge-success";
        break;
    case 2:
        $ret[0] = "Aavaiable";
		$ret[1] = "badge badge-success";
        break;
	case 3:
        $ret[0] = "Busy";
		$ret[1] = "badge badge-danger";
        break;
	case 4:
        $ret[0] = "Invalid";
		$ret[1] = "badge badge-default";
        break;
	case 5:
        $ret[0] = "Unavailable";
		$ret[1] = "badge badge-default";
        break;
	case 6:
        $ret[0] = "Calling";
		$ret[1] = "badge badge-warning";
        break;
	case 7:
        $ret[0] = "In use";
		$ret[1] = "badge badge-default";
        break;
	case 8:
        $ret[0] = "On hold";
		$ret[1] = "badge badge-warning";
        break;
	
}

return 	$ret;
	
}


function SetClassLoggedinAndAvailable($logavail)
{
	if((int)$logavail >0 )
	{
		return "btn btn-warning btn-sm";
	}
	else {
		return "btn btn-danger btn-sm";
	}	
}

}