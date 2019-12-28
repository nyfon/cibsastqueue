<html>
<head>
<?php
/*
Creator: Roberto Michelson
Licence: GPLv3
*/
$this->load->helper('html'); 
$this->load->helper('url');
echo doctype();
?>
<!--script  src="https://code.jquery.com/jquery-3.2.1.min.js"  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script-->
<!--BS 4-->
<script  src="https://code.jquery.com/jquery-3.4.1.js"  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<!-- Noty-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-noty/2.4.1/packaged/jquery.noty.packaged.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery.js" ></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery.timer.js" ></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-notify/0.2.0/js/bootstrap-notify.js" integrity="sha256-lY8OdlU6kUK/9tontLTYKJWThbOuSOlWtbINkP0DLKU=" crossorigin="anonymous"></script>

<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-notify/0.2.0/css/bootstrap-notify.css" integrity="sha256-ibUTW+jDj+F8d1T1KZ4DOujRmVTFfvMKL9y14QgEaPQ=" crossorigin="anonymous" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.css" integrity="sha256-YC896To53D/eet6K3jAwOq67iCIK24u2Hg6CQ+026I8=" crossorigin="anonymous" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/styles/styles.css">
 <script>

 $( document ).on( "click", ".dropall",  function(event ) {
   queue = $(this).attr("id");
   var url = "<?php echo base_url(); ?>"+'index.php/load/dropallfromqueue/'+queue;
   var msg = 'All extensions from queue '+queue+' was droped';
   $.ajax({url: url , success: function(result){      
        $("#msg").html("<div id='alert' class='alert alert-success alert-dismissible' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Success! </strong>"+msg+"</div>")  
    }});
 });
    
 $( document ).on( "click", ".dropexten",  function(event ) {
    var exten = $(this).attr("id").replace("SIP/", "SIP"); //event.target.name.replace("SIP/", "SIP");
    var queuename = event.target.title;
    var url = "<?php echo base_url(); ?>"+'index.php/load/dropextenfromqueue/'+exten+"/"+queuename;
    var msg = 'The extension '+exten.replace("SIP", "")+' was droped from queue '+queuename;
    $.ajax({url: url , success: function(result){
       $("#msg").html("<div id='alert' class='alert alert-success alert-dismissible' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Success! </strong>"+msg+"</div>")        
    }});   
 });
       
var timer = $.timer(function() {
  loadqueuepage();    
});
  timer.set({ time : <?php echo (isset($refresh)?$refresh: 5000) ?>}); 
  timer.play();
  loadqueuepage();
   
function loadqueuepage(){	
	   $.ajax({url: "<?php echo $url ?>", async:false, timeout: 3000,  success: function(result){
        $("body").html(result);
    }
    }).fail(function(jqXHR, textStatus){
    if(textStatus === 'timeout')
    {     
        alert('Failed from timeout'); 
        //do something. Try again perhaps?
    }
})
   }  
 </script> 
 <style>
#mydiv {
  height: 400px;
  position: relative; 
}
.ajax-loader {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto; 
}
body{
  background: url(<?php echo base_url().'assets/img/maxresdefault.jpg'; ?>) no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
</head>
<br>
<br>
<br>
<br>
<br>
<br>
<div id="mydiv">  
 <img src="<?php echo base_url().'assets/img/ajax_loader_blue_128.gif'; ?>" class="ajax-loader">
</div>
</html>

