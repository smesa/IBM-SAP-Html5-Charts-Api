var chartData = [{
		"country": "USA",
		"visits": 4252,
		"visits": 4253,
		"visits": 4254,
		"visits": 4255,
		"deads":  4
	}, {
		"country": "China",
		"visits": 1882,
		"deads":  7
	}, {
		"country": "Japan",
		"visits": 1809,
		"deads":  6
	}, {
		"country": "Germany",
		"visits": 1322,
		"deads":  7
	}, {
		"country": "UK",
		"visits": 1122,
		"deads":  22
	}, {
		"country": "France",
		"visits": 1114,
		"deads":  29
	}, {
		"country": "India",
		"visits": 984,
		"deads":  211
	}, {
		"country": "Spain",
		"visits": 711,
		"deads":  20
	}, {
		"country": "Netherlands",
		"visits": 665,
		"deads":  222
	}, {
		"country": "Russia",
		"visits": 580,
		"deads":  209
	}, {
		"country": "South Korea",
		"visits": 443,
		"deads":  2233
	}, {
		"country": "Canada",
		"visits": 441,
		"deads":  9
	}, {
		"country": "Brazil",
		"visits": 395,
		"deads":  22
	}, {
		"country": "Italy",
		"visits": 386,
		"deads":  2
	}, {
		"country": "Australia",
		"visits": 384,
		"deads":  28
	}, {
		"country": "Taiwan",
		"visits": 338,
		"deads":  22
	}, {
		"country": "Poland",
		"visits": 328,
		"deads":  9
}];


// Codigo de la grafica
AmCharts.ready(function() {
	

	// Definicion del grafico
	var chart 					= new AmCharts.AmSerialChart();
	chart.dataProvider 			= chartData;
	chart.export			    = true;
	chart.categoryField 		= "country";

	// Definicion de series
	var graph 					= new AmCharts.AmGraph();
	graph.id 					= "g1";
	graph.valueField 			= "visits";
	graph.title					= "visitantes";
	graph.type 					= "line";
	graph.fillAlphas 			= 0.8;
	graph.balloonText 			= "[[category]]: <b>[[value]]</b>";
	graph.fillAlphas 			= 0; 
	graph.bullet 				= "round";
	graph.lineColor 			= "#8d1cc6";
	chart.addGraph(graph);

	var graph2 					= new AmCharts.AmGraph();
	graph2.id 					= "g2";
	graph2.valueField 			= "deads";
	graph2.type 				= "line";
	graph2.title				= "muertes";
	graph2.fillAlphas 			= 0.8;
	graph2.balloonText 			= "[[category]]: <b>[[value]]</b>";
	graph2.fillAlphas 			= 0; 
	graph2.bullet 				= "square";
	graph2.lineColor 			= "#00ff00";
	chart.addGraph(graph2);

	// Propiedades de ejes
	var categoryAxis 			= chart.categoryAxis;
	categoryAxis.autoGridCount  = false;
	categoryAxis.gridCount 		= chartData.length;
	categoryAxis.gridPosition 	= "start";
	categoryAxis.labelRotation 	= 90;

	// Propiedades del scroll
	var chartScrollbar 					  	= new AmCharts.ChartScrollbar();
	chartScrollbar.oppositeAxis				= false;
    chartScrollbar.offset 		  		   	= 30;
    chartScrollbar.scrollbarHeight 			= 80;
    chartScrollbar.backgroundAlpha 			= 0;
    chartScrollbar.selectedBackgroundAlpha 	= 0.1;
    chartScrollbar.selectedBackgroundColor 	= "#888888";
    chartScrollbar.graphFillAlpha 		   	= 0;
    chartScrollbar.graphLineAlpha 			= 0.5;
    chartScrollbar.selectedGraphFillAlpha 	= 0;
    chartScrollbar.selectedGraphLineAlpha 	= 1;
    chartScrollbar.autoGridCount 			= true;
    chartScrollbar.color 					= "#AAAAAA";
	chart.addChartScrollbar(chartScrollbar);

	// Leyenda
	var legend = new AmCharts.AmLegend();
	chart.addLegend(legend);


	var newDiv = document.createElement('div');
	newDiv.id = 'chartdiv';
	$("body").append(newDiv);
	chart.write('chartdiv');

// Definicion del grafico
	var chart 					= new AmCharts.AmSerialChart();
	chart.dataProvider 			= chartData;
	chart.export			    = true;
	chart.categoryField 		= "country";

	// Definicion de series
	var graph 					= new AmCharts.AmGraph();
	graph.id 					= "g1";
	graph.valueField 			= "visits";
	graph.title					= "visitantes";
	graph.type 					= "line";
	graph.fillAlphas 			= 0.8;
	graph.balloonText 			= "[[category]]: <b>[[value]]</b>";
	graph.fillAlphas 			= 0; 
	graph.bullet 				= "round";
	graph.lineColor 			= "#8d1cc6";
	chart.addGraph(graph);

	var graph2 					= new AmCharts.AmGraph();
	graph2.id 					= "g2";
	graph2.valueField 			= "deads";
	graph2.type 				= "line";
	graph2.title				= "muertes";
	graph2.fillAlphas 			= 0.8;
	graph2.balloonText 			= "[[category]]: <b>[[value]]</b>";
	graph2.fillAlphas 			= 0; 
	graph2.bullet 				= "square";
	graph2.lineColor 			= "#00ff00";
	chart.addGraph(graph2);

	// Propiedades de ejes
	var categoryAxis 			= chart.categoryAxis;
	categoryAxis.autoGridCount  = false;
	categoryAxis.gridCount 		= chartData.length;
	categoryAxis.gridPosition 	= "start";
	categoryAxis.labelRotation 	= 90;

	// Propiedades del scroll
	var chartScrollbar 					  	= new AmCharts.ChartScrollbar();
	chartScrollbar.oppositeAxis				= false;
    chartScrollbar.offset 		  		   	= 30;
    chartScrollbar.scrollbarHeight 			= 80;
    chartScrollbar.backgroundAlpha 			= 0;
    chartScrollbar.selectedBackgroundAlpha 	= 0.1;
    chartScrollbar.selectedBackgroundColor 	= "#888888";
    chartScrollbar.graphFillAlpha 		   	= 0;
    chartScrollbar.graphLineAlpha 			= 0.5;
    chartScrollbar.selectedGraphFillAlpha 	= 0;
    chartScrollbar.selectedGraphLineAlpha 	= 1;
    chartScrollbar.autoGridCount 			= true;
    chartScrollbar.color 					= "#AAAAAA";
	chart.addChartScrollbar(chartScrollbar);

	var newDiv = document.createElement('div');
	newDiv.id = 'chart2div';
	$("body").append(newDiv);
	chart.write('chart2div');

});
