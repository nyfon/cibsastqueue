<?php
/*
Creator: Roberto Michelson
Licence: GPLv3
*/

class User_model extends CI_Model {

    public function __construct() {
        $this->load->database();
    }

    //Needs to return an field called extension
    public function select_users($returnarray) {
        //Here a query that returns the extension and name fields
        //For example:
        //$this->db->select("extension, unsername as name");        
        //$query = $this->db->get('users');
        if(!isset($query))
        {
            echo "Error: You need to make a query that returns the extension and name fields from any data source. <br> If you dont want to show the extension owner you can set the 'customuser' configuration to FALSE in config/custom.php file.";
            exit();
        }
        if($returnarray)
        {
            $row = $query->result_array();
        }else{

            $row = $query->result();
        }
        if (isset($row)) {
            return $row;
        } else {
            return null;
        }
    }

   
}
?>

