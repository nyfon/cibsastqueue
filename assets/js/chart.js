/**
 * Created by Roberto on 07/11/17.
 */
/*Esta função recebe os dados para gerar o relatorio com 3 informações:
 * Label - são os dados que ficam na linha horizontal (X) do grafico
 * Y - são os dados de vlaores do gráfico
 * Legenda - dados de quem pertence a informação no gráfico
 *
 * Esse gerador precisa deste pagrão para funcionar, onde a query precisa ter esses 3 valores com esses 3 nomes no objeto retornado.
 * Os dados de Y são o agrupamento de infomrmação dos agrupadores Label e Legenda
 *
 * O algoritimo lê quais Legendas distintas existem e para cada Legenda percorre o array de dados e renderiza no grafico seus respectivos
 * laels e Y
 * */
/*
*   A view precisa ter um elemento com o id chartContainer para receber o grafico
*  <div id="chartContainer" style="height: 600px; width: 100%;"></div>
*
* */
   // TEMAS: "light1",  "light2", "dark1", "dark2"
function gerarRelatorioSimples(nomeDoGrafico, tipo, tema, dados)
{
    var dataPoints = [];
    var dataArray =  JSON.parse(dados);

    var legendas = new Array();
    $(dataArray).each(function(){
        if(jQuery.inArray((this).legenda, legendas) == -1){
            legendas.push((this).legenda);
        }
    });

    var labels = new Array();
    $(dataArray).each(function(){
        if(jQuery.inArray((this).label, labels) == -1){
            labels.push((this).label);
        }
    });

    var data_ = new  Array();

    $(legendas).each(function(){
        var legenda = (this);

                $(labels).each(function(){
                    var label = (this);
                    var break_ = false;
                    $(dataArray).each(function(){
                        if(label == (this).label && legenda == (this).legenda )
                        {
                            dataPoints.push({label: (this).label, y: parseInt((this).y)   });
                            break_ = true;
                            return false;
                        }
                        break_ = false;
                    });

                    if(break_ == false ) {
                        dataPoints.push({label: label, y: parseInt(0)   });
                    }

                });

        //dataPoints.push({label: label, y: parseInt(0)   });
        data_.push({ showInLegend: true, legendText: legenda, type: tipo, dataPoints: dataPoints });
         console.log(data_);
        dataPoints = [];

    });


/*
    $(legendas).each(function(){

        var legenda = (this);
        $(dataArray).each(function(){
            if(legenda == (this).legenda)
            {
                dataPoints.push({label: (this).label, y: parseInt((this).y)   });
            }
        });
        data_.push({ showInLegend: true, legendText: legenda, type: tipo, dataPoints: dataPoints });
       // console.log(data_);
        dataPoints = [];
    });
*/
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: tema,
        animationEnabled: true, // change to true
        title:{
            text: nomeDoGrafico
        },
        data: data_
    });

    chart.render();


}
