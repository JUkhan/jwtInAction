
import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
import JwtFormGrid from 'Scripts/Modules/jwtComponents/JwtFormGrid.js';

class WidgetViewRightsCtrl extends BaseCtrl
{
	constructor(scope, svc, timeout){
		super(scope);
		this.svc=svc;
		this.scope=scope;
		this.timeout=timeout;
	    this.loadData();
	    this.setFormGridOptions();
	}
	setFormGridOptions(){
	    var me=this;
	    var grid={
	        filter:true,limit:15,
	      loadingText:'Loading...',newItem:()=>{me.formGrid.showForm().formRefresh(); }, newItemText:'Add New Widget Permission',
	      columns:[
	          {field:'action', displayName:'Action', linkText:['Edit','Delete'],  onClick:[row=>this.formGrid.setFormData(row), this.remove.bind(this)]},
	          {field:'widgetName', displayName:'Widget Name', sort:true, render:row=>{return row.widgetName.replace('__LAYOUT__','');}},
	          {field:'roleId', displayName:'Role', sort:true},
	          {field:'userId', displayName:'User', sort:true},
	          {field:'create', displayName:'Create', render:row=>{return '<input type="checkbox" '+(row.create?'checked':'')+' disabled/>';}},
	          {field:'update', displayName:'Update', render:row=>{return '<input type="checkbox" '+(row.update?'checked':'')+' disabled/>';}},
	          {field:'delete', displayName:'Delete', render:row=>{return '<input type="checkbox" '+(row.delete?'checked':'')+' disabled/>';}}
	         
	          ]
	    };
	    var form={
	        title:'Widget Permission',
	        formSubmit:function(data){
	            me.save(data)  
	        },
	        formCancel:function(){
	            me.formGrid.showGrid()
	        },
	        fields:[
	            {type:'select', name:'widgetName', label:'Widgets', displayField:'widgetName', valueField:'widgetId', required:true},
	            {type:'select', name:'roleId', label:'Roles',displayField:'name', valueField:'roleId',},
	            {type:'select', name:'userId', label:'Users', displayField:'name', valueField:'userId',},
	            {type:'checkboxInlines', label:'Permission', values:['create','update','delete']},
	            ]
	    };
	    this.formGrid=React.render(React.createElement(JwtFormGrid, {gridOptions:grid, formOptions:form}), document.getElementById('formGrid'));
	}
	loadData(){
	    
	    this.svc.getWidgetViewRights().success(res=>{this.wvrList=res; this.formGrid.setGridData(res) });
	    this.svc.getWidgets().success(res=>{this.widgetList=res; this.formGrid.setSelectOptions('widgetName', res); });
    	this.svc.getUsers().success(res=>{ this.formGrid.setSelectOptions('userId', res); });
    	this.svc.getRoles().success(res=>{ this.formGrid.setSelectOptions('roleId', res);});
    	
	}
	remove(row, index){
	    if(confirm('Are you sure to remove this item?')){
	         this.svc.removeUVR(row).success(res=>{
	              this.arrayRemove(this.wvrList, item=>item.id==row.id);
	               this.formGrid.setGridData(this.wvrList)
	               this.showMsg('Removed successfully');
	         });
	    }
	}
	save(item){
	    if(!this.isValid(item)){
	        return;
	    }
	    if(!item.id){
	        this.svc.createUVR(item).success((id)=>{
              item.id=id;
              this.wvrList.push(item);
              this.formGrid.setGridData(this.wvrList);
	          this.showMsg('Added successfully');
	          this.formGrid.showGrid()
	        });
	    }else{
	         this.svc.updateUVR(item).success(res=>{
	              this.formGrid.setGridData(this.wvrList)
	              this.showMsg('Updated successfully');
	              this.formGrid.showGrid()
	         });
	    }
	}
    isValid(item){
	    
	    if(!(item.roleId || item.userId)){
	        this.showMsg('Please select a role or user.');
	        this.scope.$apply()
	        return false;
	    }
	    return true;
	}
	showMsg(msg) {
	    this.msg=msg;
        var that=this, timer = that.timeout(function () {
            that.timeout.cancel(timer);
           	that.msg='';
        }, 2000);
    }
}
WidgetViewRightsCtrl.$inject=['$scope', 'WidgetViewRightsSvc', '$timeout'];
export default WidgetViewRightsCtrl;
