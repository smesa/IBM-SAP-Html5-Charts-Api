'use strict';

/**
 * @ngdoc function
 * @name appAngularApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the appAngularApp
 */
angular.module('appAngularApp')
  .controller('ChartCtrl', function ($scope,$routeParams,$http) {

  	// Recupero parametro id
  	$scope.idchart = $routeParams.id;

  	// Url del servicio
  	var sURL  = 'http://173.193.125.74:8000/sap/bc/ibmishc/abap_charts?idchart=' + $scope.idchart;
	
	// llamo servicio para recuperar la data
	$http.get( sURL ).
		success(function(data){

			angular.forEach(data, function(item){
				createStockChart(item,$scope)
			})

		 })
	
  });


function createStockChart(data,$scope){

	var colors = [
        "#FF6600", "#990000", "#0D8ECF", "#2A0CD0",
        "#CD0D74", "#CC0000", "#00CC00", "#0000CC", "#DDDDDD",
        "#999999", "#333333", "#990000"
    ];

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


	var chart 							= new AmCharts.AmStockChart();
	chart.language						= "es";
    chart.pathToImages 					= "http://www.amcharts.com/lib/3/images/";
    chart.dataDateFormat				= "YYYY-MM-DD";
    chart.export						= amExport;

    // create data sets first
    var dataSet1 						= new AmCharts.DataSet();
    dataSet1.fieldMappings 				= [
        {fromField: "value0", toField: "value0"},
        {fromField: "value1", toField: "value1"},
        {fromField: "value2", toField: "value2"}
    ];

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

	    // adiciono los ejes
	    window["valueAxis" + i] 						= new AmCharts.ValueAxis();
	    window["valueAxis" + i].axisColor 				= colors[i];
	    window["valueAxis" + i].color 					= colors[i];
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
	    window["graph" + i].lineColor 						= colors[i];
	    window["graph" + i].bullet 							= "round";
	    window["graph" + i].bulletBorderColor 				= "#FFFFFF";
	    window["graph" + i].bulletBorderAlpha 				= 1;
	    window["graph" + i].balloonFunction					= adjustBalloonText;
	    window["graph" + i].compareGraphBullet 				= "round";
	    window["graph" + i].compareGraphBulletBorderColor 	= "#FFFFFF";
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


    // add first value axes
    /*var valueAxis1 						= new AmCharts.ValueAxis();
    valueAxis1.axisColor 				= colors[0];
    valueAxis1.color 					= colors[0];
    valueAxis1.offset 					= 40;
    valueAxis1.unit 					= unit[0];
    valueAxis1.max						= 105;
    valueAxis1.min						= 55;
    valueAxis1.maximum					= 105;
    valueAxis1.minimum					= 55;
    valueAxis1.fontSize					= 9;
    stockPanel.addValueAxis(valueAxis1);    

    // add second value axes
    var valueAxis2 						= new AmCharts.ValueAxis();
    valueAxis2.axisColor 				= colors[1];
    valueAxis2.color 					= colors[1];
    valueAxis2.offset 					= 110;
    valueAxis2.unit 					= unit[1];
    valueAxis2.max						= 180;
    valueAxis2.min						= 50;
    valueAxis2.maximum					= 180;
    valueAxis2.minimum					= 50;
    valueAxis2.baseValue				= 50;
    valueAxis2.fontSize					= 9;

    stockPanel.addValueAxis(valueAxis2);


    // add second value axes
    var valueAxis3 						= new AmCharts.ValueAxis();
    valueAxis3.axisColor 				= colors[2];
    valueAxis3.color 					= colors[2];
    valueAxis3.offset 					= 180	;
    valueAxis3.unit 					= unit[2];
    valueAxis3.max						= 180;
    valueAxis3.min						= 55;
    valueAxis3.maximum					= 180;
    valueAxis3.minimum					= 55;
    valueAxis3.fontSize					= 9;

    stockPanel.addValueAxis(valueAxis3);*/


    // graph of first stock panel
    /*var graph1 								= new AmCharts.StockGraph();
    graph1.valueField 						= "value0";
    graph1.title 							= charts[0];
    graph1.useDataSetColors 				= false;
    graph1.lineColor 						= colors[0];
    graph1.bullet 							= "round";
    graph1.bulletBorderColor 				= "#FFFFFF";
    graph1.bulletBorderAlpha 				= 1;
    graph1.balloonFunction					= adjustBalloonText;
    graph1.compareGraphBullet 				= "round";
    graph1.compareGraphBulletBorderColor 	= "#FFFFFF";
    graph1.compareGraphBulletBorderAlpha 	= 1;
    graph1.valueAxis 						= valueAxis1;
    graph1.showHandOnHover					= true;
    graph1.includeInMinMax					= true;
    graph1.showAllValueLabels				= true;
    graph1.showAllValueLabels				= true;
    graph1.labelPosition					= "bottom";
    graph1.labelText						= "[[value]]"
    stockPanel.addStockGraph(graph1);

    // graph of second stock panel
    var graph2 								= new AmCharts.StockGraph();
    graph2.valueField 						= "value1";
    graph2.title 							= charts[1];
    graph2.useDataSetColors 				= false;
    graph2.lineColor 						= colors[1];
    graph2.bullet 							= "diamond";
    graph2.bulletBorderColor 				= "#FFFFFF";
    graph2.bulletBorderAlpha 				= 1;
    graph2.hideBulletsCount					= 0;
    graph2.balloonFunction					= adjustBalloonText;
    graph2.compareGraphBulletBorderColor 	= "#FFFFFF";
    graph2.compareGraphBulletBorderAlpha 	= 1;
    graph2.valueAxis 						= valueAxis2;
    graph2.showHandOnHover					= true;
    graph2.includeInMinMax					= true;
    graph2.showAllValueLabels				= true;
    graph2.labelPosition					= "bottom";
    graph2.labelText						= "[[value]]"
    stockPanel.addStockGraph(graph2);


    // graph of second stock panel
    var graph3 								= new AmCharts.StockGraph();
    graph3.valueField 						= "value2";
    graph3.title 							= charts[2];
    graph3.useDataSetColors 				= false;
    graph3.lineColor 						= colors[2];
    graph3.bullet 							= "square";
    graph3.bulletBorderColor 				= "#FFFFFF";
    graph3.bulletBorderAlpha 				= 1;
    graph3.balloonFunction					= adjustBalloonText;
    graph3.compareGraphBullet 				= "square";
    graph3.compareGraphBulletBorderColor 	= "#FFFFFF";
    graph3.compareGraphBulletBorderAlpha 	= 2;
    graph3.bulletSize						= 8;
    graph3.valueAxis 						= valueAxis3;
    graph3.showHandOnHover					= true;
    graph3.includeInMinMax					= true;
    graph3.showAllValueLabels				= true;
    graph3.showAllValueLabels				= true;
    graph3.labelPosition					= "bottom";
    graph3.labelText						= "[[value]]"
    stockPanel.addStockGraph(graph3);*/

    // create stock legend                
    var stockLegend1 						= new AmCharts.StockLegend();
    stockLegend1.useGraphSettings			= true;
    stockLegend1.align                   	= "center";
    stockLegend1.position 					= "Bottom";
    stockLegend1.valueFunction     			= stockLegendValue;
    stockPanel.stockLegend 					= stockLegend1;



    // set panels to the chart
    chart.panels 							= [stockPanel];

    // OTHER SETTINGS ////////////////////////////////////
    var sbsettings 							= new AmCharts.ChartScrollbarSettings();
    sbsettings.graph 						= window["graph" + 0];
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
	newPanel.className 						= 'panel panel-default';
	$("body").append(newPanel);

	var newHeading 							= document.createElement('div');
	newHeading.id 							= 'heading'+data.group;
	newHeading.className 					= 'panel-heading';
	$('#' + newPanel.id ).append(newHeading);

	var newTitle							= document.createElement('h3');
	newTitle.id 							= 'title'+data.group;
	newTitle.className 						= 'panel-title';
	newTitle.innerHTML						= titulo;
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

