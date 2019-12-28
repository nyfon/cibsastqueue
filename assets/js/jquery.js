

function myTimerOK() {
    document.getElementById("demo").innerHTML = '<span class="glyphicon glyphicon-ok" style="color: #5CB85C;"></span>';
}

function inssTimerOK() {
    document.getElementById("inss_demo").innerHTML = '<span class="glyphicon glyphicon-ok" style="color: #5CB85C;"></span>';
}

function myTimerCount() {
    document.getElementById('time').innerHTML = Math.round((.1 / 30) * ((new Date()).getTime() - startTimeMS)) + '%';
}

function inssTimerCount() {
    document.getElementById('inss_time').innerHTML = Math.round((.1 / 15) * ((new Date()).getTime() - startTimeMS)) + '%';
}

function lockoutInss(button, baseUrl) {
    $.ajax({url: baseUrl, async: false,

        success: function (result) {
            var time = 15000; //milÃ©simos
            startTimeMS = (new Date()).getTime();
            document.getElementById("inss_demo").innerHTML = "Atualizando... ";

            setInterval(inssTimerOK, time);
            var timer = setInterval(inssTimerCount, time / 1000);

            button.setAttribute('disabled', true);

            setTimeout(function () {
                clearTimeout(timer);
                document.getElementById("inss_button").style.display = "none";
                document.getElementById("inss_reset").style.display = "inline";
                document.getElementById("inss_time").innerHTML = 'Consulta completa';
            }, time)
        }
    })
}

function lockoutSubmit(button, mensagem, baseUrl) {
    $.ajax({url: baseUrl, async: false,

        success: function (result) {
            var time = 30000; //milÃ©simos
            startTimeMS = (new Date()).getTime();
            document.getElementById("demo").innerHTML = "Atualizando... ";

            setInterval(myTimerOK, time);
            var timer = setInterval(myTimerCount, time / 1000);

            button.setAttribute('disabled', true);

            setTimeout(function () {
                clearTimeout(timer);
                document.getElementById("create_button").style.display = "none";
                document.getElementById("reset").style.display = "inline";
                document.getElementById("time").innerHTML = mensagem;
            }, time)
        }
    })
}



$(document).ready(function () {

    $(".mtr").click(function () {
        var $value = $(this).text();
        var orgao = ($(this).attr('name'));
        //alert(window.location.pathname + "/Consulta/process_matricula/"+$value.trim() + "/" + orgao.trim());
        //alert(JSON.stringify($(this)));
        $('#pleaseWaitDialog').modal('show');

        $.ajax({url: window.location.pathname + "/Consulta/process_matricula/" + $value.trim() + "/" + orgao.trim(),
            async: false,

            success: function (result) {
                //alert(JSON.stringify(this));
                if ($.trim(result) == 'erro') {
                    $(document).attr('location').href = window.location.pathname + "/" + "acesso/login/logar"
                } else {
                    $("#" + $value.trim()).html(result);
                }
            },
            error: function (result) {
                $("#" + $value.trim()).html(result);
            },
            complete: function (res) {
                $('#pleaseWaitDialog').modal('hide');
            }
        });

    });
    $(".mat").click(function () {
        var $value = $(this).text();
        $('#pleaseWaitDialog').modal('show');

        $.ajax({url: window.location.pathname + "/matricula/" + $value.trim(),
            async: false,

            success: function (result) {
                if ($.trim(result) == 'erro') {
                    $(document).attr('location').href = window.location.pathname + "/" + "acesso/login/logar"
                } else {
                    $("#" + $value.trim()).html(result);
                }
            },
            error: function (result) {
                $("#" + $value.trim()).html(result);
            },
            complete: function (res) {
                $('#pleaseWaitDialog').modal('hide');
            }
        });

    });

    $(".matr").click(function () {
        var $value = $(this).text();
        $('#pleaseWaitDialog').modal('show');
        $.ajax({url: window.location.pathname + "/matricula/" + $value.trim(),
            async: false,

            success: function (result) {
                if ($.trim(result) == 'erro') {
                    $(document).attr('location').href = window.location.pathname + "/" + "acesso/login/logar"
                } else {
                    $("#" + $value.trim()).html(result);
                }
            },
            error: function (result) {
                $("#" + $value.trim()).html(result);
            },
            complete: function (res) {
                $('#pleaseWaitDialog').modal('hide');
            }
        });

    });
    $(".trr").on({
        mouseenter: function () {
            $(this).addClass("success");
        },
        mouseleave: function () {
            $(this).removeClass("success");
        },
        click: function () {
            if ($(this).attr('class') === 'success')
            {
                $(this).addClass("info");
            } else
            {
                $(this).removeClass("info");
            }
        }
    });
});

/*
 * INICIO - Simulador de emprestimo do contra cheque
 * adicionado 14/03/2017
 * Murilo
 */

function Limpar()
{
    document.Simule_Seu_Emprestimo.coeficiente_calculo.value = ""
    //document.Simule_Seu_Emprestimo.taxa_de_juros.value = ""
    document.Simule_Seu_Emprestimo.valor_da_parcela.value = ""
    document.Simule_Seu_Emprestimo.valor_simulado.value = ""
    $(".clearer").hide();
    $("#vl_parcela").removeClass("has-success");
    $("#vl_parcela").removeClass("has-error");
}

function checkInput(i)
{
    if (i.value == "" || isWhitespace(i.value))
    {

        return false
    } else
    {
        return true
    }
}

function Calcular(opcao)
{
    
    /* VALIDAÇÃO e CONTAS DOS CAMPOS DA CALCULADORA */
    var s
    if (!checkInput(document.Simule_Seu_Emprestimo.coeficiente_calculo)) {
        if (!checkInput(document.Simule_Seu_Emprestimo.valor_da_parcela) ||
                !checkInput(document.Simule_Seu_Emprestimo.valor_simulado)) {
            alert("Preencha 2 valores para calcular o 3º.")
            return
        }
        //alert("coeficiente")
        opcao = 1
    } else
    if (!checkInput(document.Simule_Seu_Emprestimo.valor_da_parcela)) {
        if (!checkInput(document.Simule_Seu_Emprestimo.coeficiente_calculo) ||
                !checkInput(document.Simule_Seu_Emprestimo.valor_simulado)) {
            alert("Preencha 2 valores para calcular o 3º.")
            return
        }
        //alert("valor_da_parcela.")
        opcao = 2
    } else
    if (!checkInput(document.Simule_Seu_Emprestimo.valor_simulado)) {
        if (!checkInput(document.Simule_Seu_Emprestimo.valor_da_parcela) ||
                !checkInput(document.Simule_Seu_Emprestimo.coeficiente_calculo)) {
            alert("Preencha 2 valores para calcular o 3º.")
            return
        }
        //alert("valor_simulado")
        opcao = 3
    } else {
        alert("Preencha somente 2 valores para calcular o 3º.")
        return
    }

    if (opcao != 1) {
        s = document.Simule_Seu_Emprestimo.coeficiente_calculo.value
        s = s.replace(",", ".")
        if (!isFloat(s))
        {
            alert("Per&iacute;odo deve ser um valor inteiro.")
            return
        }

        per_int = parseFloat(s)
    }

    if (opcao != 2) {
        s = document.Simule_Seu_Emprestimo.valor_da_parcela.value
        s = s.replace(",", ".")
        if (!isFloat(s))
        {
            alert("Valor da presta&ccedil;&atilde;o deve ser um valor num&eacute;rico, tendo a v&iacute;rgula(,) como delimitador dos centavos.")
            return
        }

        valor_da_parcela_float = parseFloat(s)
    }

    if (opcao != 3) {
        s = document.Simule_Seu_Emprestimo.valor_simulado.value
        s = s.replace(",", ".")

        if (!isFloat(s))
        {
            alert("Valor do Financiamento deve ser um valor num&eacute;rico maior que zero, tendo a v&iacute;rgula(,) como delimitador dos centavos.")
            return
        }

        valor_simulado_float = parseFloat(s)
    }

    if (opcao == 1) {
        //alert(valor_simulado_float);
        //alert(valor_da_parcela_float);

        per_int = (valor_da_parcela_float / valor_simulado_float);
        //alert("1");

        var s = String(per_int)
        
        i = s.indexOf(".")
        if (i != -1)
        {
            s = s.substring(0, i) + "," + s.substring(i + 1, s.length)

        }
        
        document.Simule_Seu_Emprestimo.coeficiente_calculo.value = s
        $(".clearer").show();
    }

    if (opcao == 2) {
        per_int = (per_int * valor_simulado_float);

        var s = String(per_int);
        
        i = s.indexOf(",");
        if (i != -1)
        {
            s = s.substring(0, i) + "." + s.substring(i + 1, s.length)

        }
        s = parseFloat(s);
        s = s.toFixed(2);
        document.Simule_Seu_Emprestimo.valor_da_parcela.value = s
        $(".clearer").show();
    }

    if (opcao == 3) {
        per_int = (valor_da_parcela_float / per_int);
        //alert("3");

        var s = String(per_int)
        i = s.indexOf(".")
        if (i != -1)
        {
            s = s.substring(0, i) + "," + s.substring(i + 1, s.length)

        }
        s = parseFloat(s);
        s = s.toFixed(2);
        
        document.Simule_Seu_Emprestimo.valor_simulado.value = s
        $(".clearer").show();
    }

    var comp = parseInt($("#margem_texto").text());
    //alert(comp);
    var vl_vl = document.Simule_Seu_Emprestimo.valor_da_parcela.value;
    //alert(vl_vl);
    var vl_parc = parseInt(vl_vl);
    //alert(vl_parc);
    if (comp < vl_parc) {
        $("#vl_parcela").removeClass("has-success");
        $("#vl_parcela").addClass("has-error"); 
    } else {        
        $("#vl_parcela").removeClass("has-error");
        $("#vl_parcela").addClass("has-success");
    }

    return false;
}

var digits = "0123456789";
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var whitespace = " \t\n\r";
var decimalPointDelimiter = "."

function makeArray(n) {

    for (var i = 1; i <= n; i++) {
        this[i] = 0
    }
    return this
}



var daysInMonth = makeArray(12);
daysInMonth[1] = 31;
daysInMonth[2] = 29;   // must programmatically check this
daysInMonth[3] = 31;
daysInMonth[4] = 30;
daysInMonth[5] = 31;
daysInMonth[6] = 30;
daysInMonth[7] = 31;
daysInMonth[8] = 31;
daysInMonth[9] = 30;
daysInMonth[10] = 31;
daysInMonth[11] = 30;
daysInMonth[12] = 31;



function isEmpty(s)
{
    return ((s == null) || (s.length == 0))
}


function isWhitespace(s)

{
    var i;

    // Is s empty?
    if (isEmpty(s))
        return true;

    for (i = 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);

        if (whitespace.indexOf(c) == -1)
            return false;
    }

    // All characters are whitespace.
    return true;
}



// Removes all characters which appear in string bag from string s.

function stripCharsInBag(s, bag)

{
    var i;
    var returnString = "";

    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1)
            returnString += c;
    }

    return returnString;
}

function stripCharsNotInBag(s, bag)

{
    var i;
    var returnString = "";

    // Search through string's characters one by one.
    // If character is in bag, append to returnString.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) != -1)
            returnString += c;
    }

    return returnString;
}


function stripWhitespace(s)

{
    return stripCharsInBag(s, whitespace)
}


function charInString(c, s)
{
    for (i = 0; i < s.length; i++)
    {
        if (s.charAt(i) == c)
            return true;
    }
    return false
}


function stripInitialWhitespace(s)

{
    var i = 0;

    while ((i < s.length) && charInString (s.charAt(i), whitespace))
        i++;

    return s.substring(i, s.length);
}

function isLetter(c)
{
    return (((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")))
}

function isDigit(c)
{
    return ((c >= "0") && (c <= "9"))
}

function isLetterOrDigit(c)
{
    return (isLetter(c) || isDigit(c))
}

function isInteger(s)

{
    var i;

    if (isEmpty(s))
        if (isInteger.arguments.length == 1)
            return defaultEmptyOK;
        else
            return (isInteger.arguments[1] == true);


    for (i = 0; i < s.length; i++)
    {
        // Check that current character is number.
        var c = s.charAt(i);

        if (!isDigit(c))
            return false;
    }

    // All characters are numbers.
    return true;
}


function isSignedInteger(s)

{
    if (isEmpty(s))
        if (isSignedInteger.arguments.length == 1)
            return defaultEmptyOK;
        else
            return (isSignedInteger.arguments[1] == true);

    else {
        var startPos = 0;
        var secondArg = defaultEmptyOK;

        if (isSignedInteger.arguments.length > 1)
            secondArg = isSignedInteger.arguments[1];

        // skip leading + or -
        if ((s.charAt(0) == "-") || (s.charAt(0) == "+"))
            startPos = 1;
        return (isInteger(s.substring(startPos, s.length), secondArg))
    }
}

function isPositiveInteger(s)
{
    var secondArg = defaultEmptyOK;

    if (isPositiveInteger.arguments.length > 1)
        secondArg = isPositiveInteger.arguments[1];


    return (isSignedInteger(s, secondArg)
            && ((isEmpty(s) && secondArg) || (parseInt(s, 10) > 0)));
}

function isNonnegativeInteger(s)
{
    var secondArg = defaultEmptyOK;

    if (isNonnegativeInteger.arguments.length > 1)
        secondArg = isNonnegativeInteger.arguments[1];

    return (isSignedInteger(s, secondArg)
            && ((isEmpty(s) && secondArg) || (parseInt(s, 10) >= 0)));
}


function isNegativeInteger(s)
{
    var secondArg = defaultEmptyOK;

    if (isNegativeInteger.arguments.length > 1)
        secondArg = isNegativeInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a negative, not positive, number

    return (isSignedInteger(s, secondArg)
            && ((isEmpty(s) && secondArg) || (parseInt(s, 10) < 0)));
}


function isNonpositiveInteger(s)
{
    var secondArg = defaultEmptyOK;

    if (isNonpositiveInteger.arguments.length > 1)
        secondArg = isNonpositiveInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a number <= 0

    return (isSignedInteger(s, secondArg)
            && ((isEmpty(s) && secondArg) || (parseInt(s, 10) <= 0)));
}


function isFloat(s)

{
    var i;
    var seenDecimalPoint = false;

    if (isEmpty(s))
        if (isFloat.arguments.length == 1)
            return defaultEmptyOK;
        else
            return (isFloat.arguments[1] == true);

    if (s == decimalPointDelimiter)
        return false;

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is number.
        var c = s.charAt(i);

        if ((c == decimalPointDelimiter) && !seenDecimalPoint)
            seenDecimalPoint = true;
        else if (!isDigit(c))
            return false;
    }

    // All characters are numbers.
    return true;
}


function isSignedFloat(s)

{
    if (isEmpty(s))
        if (isSignedFloat.arguments.length == 1)
            return defaultEmptyOK;
        else
            return (isSignedFloat.arguments[1] == true);

    else {
        var startPos = 0;
        var secondArg = defaultEmptyOK;

        if (isSignedFloat.arguments.length > 1)
            secondArg = isSignedFloat.arguments[1];

        // skip leading + or -
        if ((s.charAt(0) == "-") || (s.charAt(0) == "+"))
            startPos = 1;
        return (isFloat(s.substring(startPos, s.length), secondArg))
    }
}

function isAlphabetic(s)

{
    var i;

    if (isEmpty(s))
        if (isAlphabetic.arguments.length == 1)
            return defaultEmptyOK;
        else
            return (isAlphabetic.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (!isLetter(c))
            return false;
    }

    // All characters are letters.
    return true;
}


function isAlphanumeric(s)

{
    var i;

    if (isEmpty(s))
        if (isAlphanumeric.arguments.length == 1)
            return defaultEmptyOK;
        else
            return (isAlphanumeric.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphanumeric character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is number or letter.
        var c = s.charAt(i);

        if (!(isLetter(c) || isDigit(c)))
            return false;
    }

    // All characters are numbers or letters.
    return true;
}



function reformat(s)

{
    var arg;
    var sPos = 0;
    var resultString = "";

    for (var i = 1; i < reformat.arguments.length; i++) {
        arg = reformat.arguments[i];
        if (i % 2 == 1)
            resultString += arg;
        else {
            resultString += s.substring(sPos, sPos + arg);
            sPos += arg;
        }
    }
    return resultString;
}

function isIntegerInRange(s, a, b)
{
    if (isEmpty(s))
        if (isIntegerInRange.arguments.length == 1)
            return defaultEmptyOK;
        else
            return (isIntegerInRange.arguments[1] == true);

    // Catch non-integer strings to avoid creating a NaN below,
    // which isn't available on JavaScript 1.0 for Windows.
    if (!isInteger(s, false))
        return false;

    // Now, explicitly change the type to integer via parseInt
    // so that the comparison code below will work both on 
    // JavaScript 1.2 (which typechecks in equality comparisons)
    // and JavaScript 1.1 and before (which doesn't).
    var num = parseInt(s, 10);
    return ((num >= a) && (num <= b));
}

function CompletaString(s, i)
{
    var t, u
    u = new String()

    u = s

    if (u.length > i)
    {

        t = u.substring(0, i)
    } else
    {
        t = u
        for (j = u.length; j < i; j++)
        {
            t = t + " "
        }
    }
    return t
}

function CompletaNumero2(s, i)
{
    var t, u
    u = new String(s)


    t = ""


    if (u.length > i)
    {

        t = u.substring(0, i)
    } else
    {
        t = u
        for (j = u.length; j < i; j++)
        {
            t = "0" + t
        }
    }

    return t
}

/*
 * FIM - Simulador de emprestimo do contra cheque
 * adicionado 14/03/2017
 * Murilo
 */





