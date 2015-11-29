'use strict';

/**
 * @ngdoc function
 * @name appAngularApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the appAngularApp
 */
angular.module('appAngularApp')
  .controller('ChartCtrl', function ($scope,$routeParams,$http,localStorageService) {

  	// Recupero parametro id
  	$scope.idchart = $routeParams.id;


  	// Consulto en los datos locales si existe el registro
  	$scope.data    = localStorageService.get($scope.idchart);

  	// Valido si tuvo resultados
  	if($scope.data != null){ // Si tuvo lo saco de la base de datos local

  		angular.forEach($scope.data, function(item){
			createStockChart(item,$scope)
		})


  	}else{ // Si no consulto desde el servicio

  		// Url del servicio
	  	var sURL  = 'http://ex3healthcare.softlayer.com:8000/sap/bc/ibmishc/abap_charts?sap-client=110&idchart=' + $scope.idchart;

		// llamo servicio para recuperar la data
		$http.get( sURL ).
			success(function(data){

				// Asigno los datos locales
				localStorageService.set($scope.idchart,data);

				angular.forEach(data, function(item){
					createStockChart(item,$scope)
				})

		 })
  	}

  });


function createStockChart(data,$scope){

	var colors = [
        "#FF6600", "#990000", "#0D8ECF", "#2A0CD0",
        "#CD0D74", "#CC0000", "#00CC00", "#0000CC", "#DDDDDD",
        "#999999", "#333333", "#990000"
    ];

    var bullets = ["round", "square", "triangleUp", "triangleDown", "bubble","round", "square", "triangleUp", "triangleDown",];

    var unit = [];

    var charts = [];


    var amExport = {
		enabled		: true
	};

	var nroCharts = data.graphs.length;
	var marginLeft = 80 * nroCharts;


	angular.forEach(data.graphs, function(graph){
		unit.push(graph.chartunit);
		charts.push(graph.chartdesc);
	})


	angular.forEach(data.values, function(value){
		value.categoryvalue = value.categoryvalue.substring(0, 4) + '-' + value.categoryvalue.substring(4, 6) + '-' + value.categoryvalue.substring(6, 8)
	})

    //AmCharts.theme = AmCharts.themes.dark;

	var chart 							= new AmCharts.AmStockChart();
	chart.language						= "es";
    chart.pathToImages 					= "http://www.amcharts.com/lib/3/images/";
    chart.dataDateFormat				= "YYYY-MM-DD";
    chart.export						= amExport;

    var datas = [];
    var i = 0;
    angular.forEach(data.graphs, function(graph){
      datas.push({fromField: 'value'+i, toField: 'value'+i})
      i++;
    })

    // create data sets first
    var dataSet1 						= new AmCharts.DataSet();
    dataSet1.fieldMappings = datas;
    /*dataSet1.fieldMappings 				= [
        {fromField: "value0", toField: "value0"},
        {fromField: "value1", toField: "value1"},
        {fromField: "value2", toField: "value2"},
        {fromField: "value2", toField: "value3"},
        {fromField: "value2", toField: "value4"},
        {fromField: "value2", toField: "value5"},
    ];*/

    dataSet1.dataProvider 				= data.values;
    dataSet1.categoryField 				= "categoryvalue";

    // set data sets to the chart
    chart.dataSets 						= [dataSet1];


    // first stock panel
    var stockPanel 					 	= new AmCharts.StockPanel();
    stockPanel.addListener('clickGraphItem', chartClick);

    // apply custom style for value axes
    var valueAxesSettings 				= new AmCharts.ValueAxesSettings();
    valueAxesSettings.axisAlpha 		= 1;
    valueAxesSettings.gridThickness 	= 0;
    valueAxesSettings.axisThickness 	= 2;
    valueAxesSettings.inside 			= false;
    chart.valueAxesSettings 			= valueAxesSettings;

    // apply custom style for panels settings
    var panelsSettings 					= new AmCharts.PanelsSettings();
    panelsSettings.marginLeft 			= marginLeft;
    panelsSettings.marginRight 			= 50;
    chart.panelsSettings 				= panelsSettings;

    var i 				= 0;
    var valueAxisArray 	= [];
    var offSet    		= 40;
    var titulo    		= '';

    // Recorro los graficos
	angular.forEach(data.graphs, function(graph){

		// Concateno el titulo
		if(i == 0){
			titulo = graph.chartdesc;
		}else{
			titulo = titulo + ',' + graph.chartdesc;
		}

        var randomColor = colors[i];

	    // adiciono los ejes
	    window["valueAxis" + i] 						= new AmCharts.ValueAxis();
	    window["valueAxis" + i].axisColor 				= randomColor;
	    window["valueAxis" + i].color 					= randomColor;
	    window["valueAxis" + i].offset 					= offSet;
	    window["valueAxis" + i].unit 					= graph.chartunit;
	    window["valueAxis" + i].max						= parseInt(graph.chartmax);
	    window["valueAxis" + i].min						= parseInt(graph.chartmin);
	    window["valueAxis" + i].maximum					= parseInt(graph.chartmax);
	    window["valueAxis" + i].minimum					= parseInt(graph.chartmin);
	    window["valueAxis" + i].fontSize				= 9;
	    stockPanel.addValueAxis(window["valueAxis" + i]);


        window["graph" + i]									= new AmCharts.StockGraph();
	    window["graph" + i].valueField 						= "value"+i;
	    window["graph" + i].title 							= graph.chartdesc;
	    window["graph" + i].useDataSetColors 				= false;
	    window["graph" + i].lineColor 						= randomColor;
	    window["graph" + i].bullet 							= bullets[i];
	    window["graph" + i].bulletBorderColor 				= randomColor;
	    window["graph" + i].bulletBorderAlpha 				= 1;
	    window["graph" + i].balloonFunction					= adjustBalloonText;
	    window["graph" + i].compareGraphBullet 				= "round";
	    window["graph" + i].compareGraphBulletBorderColor 	= randomColor;
	    window["graph" + i].compareGraphBulletBorderAlpha 	= 1;
	    window["graph" + i].valueAxis 						= window["valueAxis" + i];
	    window["graph" + i].showHandOnHover					= true;
	    window["graph" + i].includeInMinMax					= true;
	    window["graph" + i].showAllValueLabels				= true;
	    window["graph" + i].showAllValueLabels				= true;
	    window["graph" + i].labelPosition					= "bottom";
    	window["graph" + i].labelText						= "[[value]]"
    	stockPanel.addStockGraph(window["graph" + i]);


	    offSet = offSet + 70;
	    i++;

	})


    // create stock legend
    var stockLegend1 						    = new AmCharts.StockLegend();
    stockLegend1.useGraphSettings		= true;
    stockLegend1.align              = "center";
    stockLegend1.position 					= "Bottom";
    stockLegend1.valueFunction     	= stockLegendValue;
    stockPanel.stockLegend 					= stockLegend1;



    // set panels to the chart
    chart.panels 							= [stockPanel];

    // OTHER SETTINGS ////////////////////////////////////
    var sbsettings 							= new AmCharts.ChartScrollbarSettings();
    //sbsettings.graph 						= window["graph" + 0];
    chart.chartScrollbarSettings 			= sbsettings;

    // CURSOR
    var cursorSettings 						= new AmCharts.ChartCursorSettings();
    cursorSettings.bulletSize				= 6;
    cursorSettings.zoomable					= true;
    cursorSettings.cursorPosition			= "mouse";
    cursorSettings.valueLineEnabled 		= true;
    cursorSettings.valueLineBalloonEnabled  = true;
    chart.chartCursorSettings 				= cursorSettings;



	var newPanel 							= document.createElement('div');
	newPanel.id 							= 'panel'+data.group;
	newPanel.className 						= 'panel panel-primary';
	$("body").append(newPanel);

	var newHeading 							= document.createElement('div');
	newHeading.id 							= 'heading'+data.group;
	newHeading.className 					= 'panel-heading';
	$('#' + newPanel.id ).append(newHeading);

	var newTitle							= document.createElement('h3');
	newTitle.id 							= 'title'+data.group;
	newTitle.className 						= 'panel-title';
	newTitle.innerHTML						= '<center>' + titulo + '</center>';
	$('#' + newHeading.id ).append(newTitle)

	var newBody 							= document.createElement('div');
	newBody.id 								= 'body'+data.group;
	newBody.className 						= 'panel-body';
	$('#' + newPanel.id ).append(newBody);

    var newDiv 			    				= document.createElement('div');
	newDiv.id 								= 'div'+data.group;
	newDiv.className 						= 'chartdiv';
	$('#' + newBody.id).append(newDiv);

	chart.write(newDiv.id);


	// Armo tabla con valores de datos
	var newBr								= document.createElement('br');
	$('#' + newBody.id).append(newBr);

	var newBr								= document.createElement('br');
	$('#' + newBody.id).append(newBr);

	var newTable							= document.createElement('table');
	newTable.id 							= 'table'+data.group;
	newTable.className 						= 'table table-bordered table-condensed table-striped';
	$('#' + newBody.id).append(newTable);

	var newHeader							= document.createElement('thead');
	newHeader.id 							= 'thead'+data.group;
	$('#' + newTable.id).append(newHeader);

	var newTheadtr							= document.createElement('tr');
	newTheadtr.id 							= 'theadtr'+data.group;
	$('#' + newHeader.id).append(newTheadtr);

	var newTheadth							= document.createElement('th');
	newTheadth.innerHTML					= '<center></center>';
	$('#' + newTheadtr.id).append(newTheadth);

	var newTbody							= document.createElement('tbody');
	newTbody.id 							= 'tbody'+data.group;
	$('#' + newTable.id).append(newTbody);

	var used = [];
	angular.forEach(data.values, function(value){

		var a = used.indexOf(value.categoryvalue);

		//if(a < 0){
			used.push(value.categoryvalue);
			var newTheadth								= document.createElement('th');
            newTheadth.className                        = 'info';
			newTheadth.innerHTML						= '<center>'+value.categoryvalue+'</center>';
			$('#' + newTheadtr.id).append(newTheadth);
		//}
	})

	var i = 0;
	angular.forEach(data.graphs, function(graph){

		var newTheadtr									= document.createElement('tr');
		newTheadtr.id 									= 'tbodytr'+graph.chartname;
		$('#' + newTbody.id).append(newTheadtr);

		var newTheadth									= document.createElement('th');
		newTheadth.innerHTML							= '<center>'+charts[i];+'</center>';
		$('#' + newTheadtr.id).append(newTheadth);

		angular.forEach(data.values, function(value){

			var newTheadtd								= document.createElement('td');
			newTheadtd.innerHTML						= '<center>'+value['value'+i]+ ' ' + unit[i] + '</center>';
			$('#' + newTheadtr.id).append(newTheadtd);
		})

		i++;


	})

}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function adjustBalloonText(graphDataItem, graph){
    var value = graphDataItem;
    var date  = value.dataContext.dataContext.categoryvalue;
    return '<b>' + date + '</b><br>' + value.values.value + '<br>' + graph.valueAxis.unit;
}

function stockLegendValue(graphDataItem){
    return ""

}

	function chartClick (event) {
	    console.log("Clicked!");
	}
