import BaseCtrl from 'Scripts/base/BaseCtrl.js';
const SVC=new WeakMap();
class tableWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.name='tableCom';
      	this.description='Table component renders list of data';
     	
      	this.loadData();
	}
  	
  	loadData(){
      this.columnDef=[{field:'Country'}, {field:'Name', displayName:'Person Name'},{field:'Age'},
                     {field:'IsMarried', template:'<input type="checkbox" ng-model="row.IsMarried" disabled />'},
                      {field:'Beloved', template:'<b>{{row.Beloved}}</b><span spark data="row.sparkData"></span>'}
                     ];
      
      let dataConfig={limit:20, columns:[
        {name:'Country', type:'country'},
        {name:'Name', type:'human'},
        {name:'Age', type:'int', min:20, max:100},
        {name:'IsMarried', type:'bool'},
        {name:'Beloved', type:'animal'},{name:'sparkData', type:'int', array:true, limit:12, min:1, max:10}
      ]};      
      
      SVC.get(this).getDummyData(dataConfig)
        .success(res=>{ this.list=angular.fromJson(res.data); });
    }
}
tableWidgetCtrl.$inject=['$scope', 'tableWidgetSvc'];
export default tableWidgetCtrl;