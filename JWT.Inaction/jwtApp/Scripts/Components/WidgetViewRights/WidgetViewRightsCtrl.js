import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
const SVC=new WeakMap();
class WidgetViewRightsCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.scope=scope;
		
		this.listOptions();
	    this.loadData();
	    this.wvr={};
	    
	}
	listOptions(){
	   
	    this.isGrid=true;
	    this.wvrListOptions={
	        filter:true,
	      loadingText:'Loading...',
	      columns:[
	          {field:'action', displayName:'Action', linkText:['Edit','Delete'],  onClick:[this.edit.bind(this),this.remove.bind(this)]},
	          {field:'widgetName', displayName:'Widget Name', sort:true},
	          {field:'roleId', displayName:'Role', sort:true},
	          {field:'userId', displayName:'User', sort:true},
	          {field:'create', displayName:'Create', render:row=>{return '<input type="checkbox" '+(row.create?'checked':'')+' disabled/>';}},
	          {field:'update', displayName:'Update', render:row=>{return '<input type="checkbox" '+(row.update?'checked':'')+' disabled/>';}},
	          {field:'delete', displayName:'Delete', render:row=>{return '<input type="checkbox" '+(row.delete?'checked':'')+' disabled/>';}}
	         
	          ]
	    };
	}
	loadData(){
	   
	    SVC.get(this).getWidgets().success(res=>{this.widgetList=res; });
    	SVC.get(this).getUsers().success(res=>{this.users=res;});
    	SVC.get(this).getRoles().success(res=>{this.roles=res;});
    	SVC.get(this).getWidgetViewRights().success(res=>{this.wvrList=res; this.wvrListOptions.loadingText=''; });
	}
	add(){
	    this.isGrid=false;
	    this.wvr={widgetName: "", roleId: "", serId: "", create: false, update: false, delete: false};
	    this.isUpdate=false;
	}
	cancel(){
	    this.isGrid=true;
	}
	edit(row, index){
	  this.scope.$apply(()=>{
	      this.isUpdate=true;
	      this.wvr=row;
	      this.isGrid=false;
	  });
	}
	remove(row, index){
	    if(confirm('Are you sure to remove this item?')){
	         SVC.get(this).removeUVR(row).success(res=>{
	              this.scope.$apply(()=>{
	                   this.wvrListOptions.loadingText="deleted";
	              });
	         });
	    }
	}
	save(item){
	    if(!this.isUpdate){
	        SVC.get(this).createUVR(item).success(()=>{
	             this.scope.$apply(()=>{
	                  this.isGrid=true;
	                  this.wvrListOptions.loadingText="inserted";
	             });
	        });
	    }else{
	         SVC.get(this).updateUVR(item).success(res=>{
	             
	              this.scope.$apply(()=>{
	                   this.isGrid=true;
	                   //this.wvrListOptions.loadingText="updated";
	              });
	         });
	    }
	}
}
WidgetViewRightsCtrl.$inject=['$scope', 'WidgetViewRightsSvc'];
export default WidgetViewRightsCtrl;
