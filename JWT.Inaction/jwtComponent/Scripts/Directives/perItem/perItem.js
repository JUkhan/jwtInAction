
class perItem
{
	constructor(compile){
	    this.COMPILE=compile;
		this.restrict='AE';
		this.scope={data:'=', options: '='};
	}
	controller($scope){
	    $scope.itemClick=function(data){
	        if(!angular.isUndefined($scope.options.selectableItem)){
	            $scope.options.selectableItem=data.title;
	        }
	        if($scope.options && $scope.options.onClick){
	            $scope.options.onClick(data);
	        }
	    }
	    
	}
  	link(scope, element, attr){ 
      scope.$watchGroup(['data', 'options'], function(newValues, oldValues, scope) {
            scope.options=scope.options||{};
            perItem.instance.render(scope, element);
      });
    }
    render(scope, element){
  	    
      element.empty().append(this.COMPILE(this.getTemplate(scope))(scope));
    
    }
    getTemplate(scope){
	    switch (scope.options.tplId) {
	       case 1:
	            return this.getTpl_1();
	       case 2:
	            return this.getTpl_2();
	       case 3:
	            return this.getTpl_3();
	       default:
	           return '<div class="alert alert-warning">tplId not defined</div>'; 
	    }
	    return this.getCountryTpl(scope);
	}
    getTpl_1(scope){
        var tpl=[];
        tpl.push('<div class="per-item"><div class="tpl1">');
        tpl.push('<div class="title">&nbsp;</div>');
        tpl.push('<div class="title">&nbsp;</div>');
        tpl.push('<div class="spark-content item" ng-repeat="item in data.categoryList">');
        tpl.push('<span ng-bind="item"></span>');
        tpl.push('</div>');
        tpl.push('</div></div>');
        return tpl.join('');
    }
     getTpl_2(scope){
        var tpl=[];
        tpl.push('<div class="per-item"><div class="tpl2" ng-class="{selected:options.selectableItem===data.title}" ng-click="itemClick(data)">');
        tpl.push('<div class="title"><span style="background-color:{{data.colorCode}}" class="badge">&nbsp;</span><strong class="main-title" ng-bind="data.title"></strong>');
        tpl.push('<span class="pull-right right-title" ng-bind="data.period"></span></div>');
        tpl.push('<div class="title" ng-if="data.chart===\'Trend\'"><span ng-bind="data.from"></span><span class="pull-right" ng-bind="data.to"></span></div>');
        tpl.push('<div class="title" ng-if="data.chart!==\'Trend\'"><span ng-class="{gray:data.chart!==\'Dynamics\'}">Dynamics</span>');
        tpl.push('<span class="pull-right" ng-class="{gray:data.chart!==\'Absolute\'}">Absolute</span></div>');
        tpl.push('<div class="spark-content" ng-repeat="item in data.sparkList"><div class="text-center">');
        tpl.push('<span class="min" ng-bind="item.min"></span>');
        tpl.push('<span spark-line data="item.data" options="item.options"></span>');
        tpl.push('<span class="max" ng-bind="item.max"></span>');
        tpl.push('</div></div>');
        tpl.push('<div class="title text-center footer" ng-bind="data.volume"></div>');
        tpl.push('</div></div>');
        return tpl.join('');
    }
     getTpl_3(scope){
        var tpl=[];
        tpl.push('<div class="per-item"><div class="title"><strong ng-bind="data.title"></strong></div><div class="tpl3" ng-class="{selected:options.selectableItem===data.title}" ng-click="itemClick(data)">');
       
        tpl.push('<div class="itemst" ng-repeat="item in data.sparkList">');
        tpl.push('<span class="min" ng-bind="item.min"></span>');
        tpl.push('<span class="max pull-right" ng-bind="item.max"></span>');
        tpl.push('<div class="text-center"><span spark-line data="item.data" options="item.options"></span></div>');
        
        tpl.push('</div>');
       
        tpl.push('</div></div>');
        return tpl.join('');
    }
	static builder(compile){
      	perItem.instance=new perItem(compile);
		return perItem.instance;
	}
}
perItem.builder.$inject=['$compile'];
export default perItem;
