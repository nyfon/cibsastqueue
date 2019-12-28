function Originate(idtelefone)
{   DesativaBotoes();
	var spantimeroculto = "<span hidden class='class"+idtelefone+"' ></span>";	
	document.getElementById(idtelefone).innerHTML = "Discando..."+"<span class='class"+idtelefone+"' ></span>";	
	/*Inicia timer de 40 segundos - timeout da discagem*/
	timer(
    41000, // milliseconds
    function(timeleft) { // called every step to update the visible countdown
        //document.getElementById('timer').innerHTML = timeleft+"(s)";
		$(".class"+idtelefone).html(timeleft+"(s)");
    },
    function() { // what to do after
       console.log("after");
    }
);

	var baseurl = window.location.origin + window.location.pathname + "/consulta/discador_manual/";	
	var jqxhr = $.post( baseurl+ idtelefone, function( data ) {

})
  .done(function(data) {
	  
	var ret_array = JSON.parse(data);	
	retorno = ret_array[1];
	idstatus = ret_array[0];
	console.log("retorno:"+ret_array[1]);
            console.log("retorno:"+ret_array[2]);
	switch(idstatus) {
		case 4:  // nao atendeu		
			
			document.getElementById(idtelefone).innerHTML = retorno+spantimeroculto;
			SalvaChamada(idstatus, idtelefone, retorno);
			AtivaBotoes();			
			var curr = $("#tr" + idtelefone).next('tr').attr('id');
			var res = curr.replace("tr", "bt");
			$("#" + res).click();
			//Finalizar(arg3, "6"); //???????????????????????????????????????
			
			break;
		case 3: // ocupado. congenstionado, falha, etc
			
			SalvaChamada(idstatus, idtelefone, retorno);
			AtivaBotoes();
			document.getElementById(idtelefone).innerHTML = retorno+spantimeroculto;
			var curr = $("#tr" + idtelefone).next('tr').attr('id');
			var res = curr.replace("tr", "bt");
			$("#" + res).click();
			// TODO - Finalizar a chamada automaticamente e puxar o proximo contato.
			//$("#ModalDiscando").modal("hide");//closebox('box_discagem','shadowing_discagem');	 
			//Finalizar(arg3, "5");
			break;
		case 2: // atendeu
			atendido = true;			  
			
			document.getElementById(idtelefone).innerHTML = retorno+spantimeroculto;
			SalvaChamada(idstatus, idtelefone, retorno);
			canal__ = retorno[1];
			actionid__ = retorno[2];		
			Init();
			//Finalizar(arg3, "7"); //atendeu // /???????????????????????????????????????
			AtivaBotoes();
			break;
		case 0: // Falha de conexao com central
						
			document.getElementById(idtelefone).innerHTML = retorno+spantimeroculto;
			SalvaChamada(idstatus, idtelefone, retorno);
			canal__ = retorno[1];
			actionid__ = retorno[2];		
			Init();
			//Finalizar(arg3, "7"); //atendeu // /???????????????????????????????????????
			AtivaBotoes();
			break;
		default:
		document.getElementById(idtelefone).innerHTML = retorno+spantimeroculto;
			SalvaChamada(idstatus, idtelefone, retorno);
			canal__ = retorno[1];
			actionid__ = retorno[2];		
			Init();
			//Finalizar(arg3, "7"); //atendeu // /???????????????????????????????????????
			AtivaBotoes();
			break;
			
	} 
   
   
  })
  .fail(function(data) {
     document.getElementById(idtelefone).innerHTML = data ;
	 //SalvaChamada(idstatus, idtelefone, retorno);
	AtivaBotoes();
	var curr = $("#tr" + idtelefone).next('tr').attr('id');
	var res = curr.replace("tr", "bt");
	$("#" + res).click();
  })
  .always(function(data) {
   // document.getElementById(idtelefone).innerHTML = "alwais" ;
  console.log("always");
  });
 	
}

function timer(time,update,complete) {
    var start = new Date().getTime();
    var interval = setInterval(function() {
        var now = time-(new Date().getTime()-start);
        if( now <= 0) {
            clearInterval(interval);
            complete();
        }
        else update(Math.floor(now/1000));
    },100); // the smaller this number, the more accurate the timer will be
}





var mins, secs, TimerRunning, TimerID, canal__, actionid__, status_chamada, TimerRunning = false;
function Init() //call the Init function when u need to start the timer
{
    mins = 15;
    secs = 0;
    //chamadaatendida = false;
    StopTimer();
    StartTimer();
}

function StopTimer()
{
    if (TimerRunning)
        clearTimeout(TimerID);
    TimerRunning = false;
    //AtivaBotaoDiscar();

}



function StartTimer()
{

    TimerRunning = true;
    TimerID = self.setTimeout("StartTimer()", 3000);
    //alert("muriloooo4");
    //StatusCanal(canal__.replace(/^\s+|\s+$/g, ""));
    /*if( status_chamada.substring(0,24) == "Message: No such channel")
     {
     alert("parou s"+status_chamada+"cn"+canal__);
     StopTimer();
     }*/
    secs++;
}


function DesativaBotoes()
{console.log("Desativando botoes");
    $('.ligacao').removeClass('active').addClass('disabled');
    $(".ligacao").prop("disabled", true);
//        var botao;
//                botao = document.getElementById("btDiscar");
//                botao.disabled = true;
//                botao.className = "btn btn-success disabled";
//                botao = document.getElementById("btFinalizar");
//                botao.disabled = true;
//                botao.className = "btn btn-danger disabled";
//                botao = document.getElementById("btProsseguir");
//                botao.disabled = true;
//                botao.className = "btn btn-primary disabled";
}

function AtivaBotoes()
{
    $('.ligacao').removeClass('disabled').addClass('active');
    $(".ligacao").prop("disabled", false);
//        var botao;
//                botao = document.getElementById("btDiscar");
//                botao.disabled = false;
//                botao.className = "btn btn-success active";
//                botao = document.getElementById("btFinalizar");
//                botao.disabled = false;
//                botao.className = "btn btn-danger active";
//                botao = document.getElementById("btProsseguir");
//                botao.disabled = false;
//                botao.className = "btn btn-primary active";
}


//Salvar registro em tabela de ligacoes, se foi atendida ou nao atendida
//Murilo - 30/11/2016
function SalvaChamada(_idstatus, _idtelefone, _retorno)
{
    var x;
    x = new XMLHttpRequest();
    var url = window.location.origin + window.location.pathname + "/consulta/historico_ligacoes";
    var params = "retorno=" + _retorno + "&idtelefone=" + _idtelefone + "&idstatus=" + _idstatus;

    x.open("POST", url);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    x.send(params);
}



function Finalizar(var1, var2)
{

    var x, arg1, arg2;
    x = new XMLHttpRequest();
    x.onreadystatechange = function ()
    {
        switch (x.readyState)
        {
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:
                if (x.responseText == 1)
                {
                    var msg = '';
                    if (arg2 == '8')
                    {
                        msg = 'Contato finalizado [Inválido]';
                    } else if (arg2 == '5')
                    {
                        msg = 'Contato finalizado [Ocupado]';
                    } else if (arg2 == '6')
                    {
                        msg = 'Contato finalizado [Nao atendeu]';
                    }

                    if (arg2 != '7')
                    {
                        document.getElementById("popcentralvisivel").innerHTML = msg;
                        /*window.location = 'http://localhost/RM_CRM/pages/producao/producao.php'; */
                        //$("#ModalMensagem").modal("show");//openbox('Mensagem.', 0, 'box_NR','shadowing_NR','boxtitle_NR');
                        document.getElementById("texto").innerHTML = msg;
                    }
                } else
                {
                    document.getElementById("popcentralvisivel").innerHTML = "Erro na finalizaçãoo. idcc: " + arg1;
                }
                break;
        }

    }

    arg1 = var1;
    arg2 = var2;
    //x.open("GET","../../controller/finalizarcontatocontr.php?status="+arg2+"&contato="+arg1,true);

    //x.send();
    //alert("Finalizadoo");
}


function fechaBoxRedirecionaProducao()
{
//$("#ModalMensagem").modal("hide");
    //window.location = 'http://localhost/RM_CRM/pages/producao/producao.php';
}






/////////////////////
