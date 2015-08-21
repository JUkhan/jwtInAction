class perTable
{
	constructor(compile){
	    this.COMPILE=compile;
		this.restrict='AE';
		this.scope={data:'=', options: '='};
	}
	controller($scope){
	    $scope.viewData=[];
	    $scope.tpl2Click=function(data){
	        if($scope.options && $scope.options.onClick){
	            $scope.options.onClick(data);
	        }
	    }
	}
  	link(scope, element, attr){ 
      scope.$watchGroup(['data', 'options'], function(newValues, oldValues, scope) {
            scope.options=scope.options||{};
            perTable.instance.render(scope, element);
      });
    }
    render(scope, element){
  	    
      element.empty().append(this.COMPILE(this.getTemplate(scope))(scope));
    
    }
    getTemplate(scope){
	    var tpl=[],len=scope.data.length, count=0, itemLimit=scope.options.itemLimit||4,  itemArr=[];
	    scope.viewData=[];
	    if(len==0){ return '<div class="alert alert-warning">No Data Found</div>'; }
	    while(count<len){
	        if(itemArr.length===itemLimit){
	             scope.viewData.push(itemArr);
	            itemArr=[];
	        }
	        itemArr.push(scope.data[count]);
	        count++;
	    }
	    if(itemArr.length>0){
	         scope.viewData.push(itemArr);
	    }
	    if(scope.options.categoryList){
            tpl.push('<div class="row per-table" ng-repeat="items in viewData">');
            tpl.push('<div class="col-md-2 first-item">');
            tpl.push('<per-item data="{categoryList:options.categoryList}" options="{tplId:1}"></per-item>');
            tpl.push('</div>');
            tpl.push('<div class="col-md-10">');
            tpl.push('<div class="row">');
            tpl.push('<div class="col-md-3" ng-class="{\'second-item\':$index==0}" ng-repeat="item in items">');
            tpl.push('<per-item data="item" options="options"></per-item>');
            tpl.push('</div>');
            tpl.push('</div>');
            tpl.push('</div>');
            tpl.push('</div>');
	    }else{
	        tpl.push('<div class="per-table" ng-repeat="items in viewData">');
	        tpl.push('<div class="row">');
            tpl.push('<div class="col-md-3" ng-repeat="item in items">');
            tpl.push('<per-item data="item" options="options"></per-item>');
            tpl.push('</div>');
            tpl.push('</div>');
            tpl.push('</div>');
	    }
	    
	    return tpl.join('');
	}
	static builder(compile){
      	perTable.instance=new perTable(compile);
		return perTable.instance;
	}
}
perTable.builder.$inject=['$compile'];
export default perTable;
