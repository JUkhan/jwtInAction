import BaseCtrl from 'Scripts/base/BaseCtrl.js';

class tableWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		this.svc=svc;
		this.name='tableCom';
      	this.description='Table component renders list of data';
     	
      	this.loadData();
	}
  	
  	loadData(){
      this.columnDef=[{field:'Country'}, {field:'Name', displayName:'Person Name'},{field:'Age'},
                     {field:'IsMarried', template:'<input type="checkbox" ng-model="row.IsMarried" disabled />'},
                      {field:'Animal', template:'<b>{{row.Animal}}</b><span spark-line data="row.sparkData" ></span>'}
                     ];
      
      let dataConfig={limit:20, columns:[
        {field:'Country', type:'country'},
        {field:'Name', type:'human'},
        {field:'Age', type:'int', min:20, max:100},
        {field:'IsMarried', type:'bool'},
        {field:'Animal', type:'animal'},{field:'sparkData', type:'int', array:true, limit:12, min:-10, max:10}
      ]};      
      
      this.svc.getDummyData(dataConfig)
        .success(res=>{ this.list=angular.fromJson(res.data); });
    }
}
tableWidgetCtrl.$inject=['$scope', 'tableWidgetSvc'];
export default tableWidgetCtrl;