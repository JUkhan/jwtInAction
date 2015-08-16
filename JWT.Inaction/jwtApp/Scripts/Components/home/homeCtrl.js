import BaseCtrl from 'Scripts/base/BaseCtrl.js';
import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';
class homeCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		this.svc=svc;
		this.title='home';
      	this.loadData();
      	 this.chartTypes = [
                {"id": "line", "title": "Line"},
                {"id": "spline", "title": "Smooth line"},
                {"id": "area", "title": "Area"},
                {"id": "areaspline", "title": "Smooth area"},
                {"id": "column", "title": "Column"},
                {"id": "bar", "title": "Bar"},
                {"id": "pie", "title": "Pie"},
                {"id": "scatter", "title": "Scatter"}
            ];
        this.chartStack = [
            {"id": '', "title": "No"},
            {"id": "normal", "title": "Normal"},
            {"id": "percent", "title": "Percent"}
          ];
          
        var opt={
      	       loadingText:'loading...',filter:true,limit:25, 
      	      columns:[{field:'name', onClick:row=>{alert(row.name)}}, {field:'age', sort:true}, {field:'price'},
      	      {field:'selling', spark:true, options:{type:'line'}}
      	      ]
  	    }; 
  	    
  	  this.initFilter();
      this.grid=React.render(React.createElement(JwtGrid, {options: opt}), document.getElementById('grid'));
      this.loadGridData(this.COUNTRY_ID);
	}
	filterValueChanged(obj){
	   
	    if(obj.name==='COUNTRY_ID')
          this.loadGridData(obj.newValue);  
    } 
	loadGridData(countryId){
	    
	    var data_config={
  	     limit:countryId,
  	     columns:[{field:'age', type:'int', min:20, max:35},{field:'name', type:'human'},
  	     {field:'price', type:'double', min:50000, max:500000},{field:'selling', type:'int', array:true, limit:15, min:1, max:15} ]  
  	   };
  	   
  	   this.svc.getDummyData(data_config).success(res=>{
  	       this.grid.setData(angular.fromJson(res.data));
  	   });
  	   
	}
  	loadData(){
  	   
      this.chartConfig={
          "options":{
              "chart":{"type":"areaspline"},
              "plotOptions":{"series":{"stacking":"no"}}
              
          },
          "series":[
              {"name":"Some data", "data":[1,2,4,7,3],"id":"series-0"},
              {"name":"Some data 3","data":[3,1,null,5,2],"connectNulls":true,"id":"series-1"},
              {"name":"Some data 2","data":[5,2,2,3,5],"type":"column","id":"series-2"},
              {"name":"My Super Column","data":[1,1,2,3,2],"type":"column","id":"series-3"}],
        "title":{"text":"Hello"},
        "credits":{"enabled":true},
        "loading":false,"size":{}};
    }
}
homeCtrl.$inject=['$scope', 'homeSvc'];
export default homeCtrl;