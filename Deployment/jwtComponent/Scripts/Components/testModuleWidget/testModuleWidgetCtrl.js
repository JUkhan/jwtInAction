import BaseCtrl from 'Scripts/base/BaseCtrl.js';
const SVC=new WeakMap();
class testModuleWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.name='angularCharts';
      	this.description='d3Charts......';
      	
      	this.initChart();
	}
  	
  	initChart(){
    	this.data = {
		series: ['Sales', 'Income', 'Expense'],
		data : [{
			x : "Jack",
			y: [100,210, 384],
			tooltip:"this is tooltip"
		},
		{
			x : "John",
			y: [300, 289, 456]
		},
		{
			x : "Stacy",
			y: [351, 170, 255]
		},
		{
			x : "Luke",
			y: [54, 341, 879]
		}]     
	};

	this.chartType = 'bar';

	this.sampledata = {
		x : "Computers",
		y: [54, 0, 879],
		tooltip : "This is a tooltip"
	};
	
	this.combinedsample = {
		series : ['Sales', 'Income', 'Expense'],
		data : [{
			x : "Computers",
			y: [54, 0, 879],
			tooltip : "This is a tooltip"
		}]
	}
	this.messages = [];

	

	this.config = {
		labels: false,
		title : "Products",
		legend : {
			display: true,
			position:'right'
		},
		click : function(d) {
			//$scope.messages.push('clicked!');
		},
		mouseover : function(d) {
			//$scope.messages.push('mouseover!');
		},
		mouseout : function(d) {
			//$scope.messages.push('mouseout!');
		},
		innerRadius: 0,
		lineLegend: 'lineEnd',
	};
    }
}
testModuleWidgetCtrl.$inject=['$scope', 'testModuleWidgetSvc'];
export default testModuleWidgetCtrl;