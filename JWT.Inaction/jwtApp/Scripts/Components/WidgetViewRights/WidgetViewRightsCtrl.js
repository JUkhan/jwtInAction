import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
const SVC=new WeakMap();
class WidgetViewRightsCtrl extends BaseCtrl
{
	constructor(scope, svc, timeout){
		super(scope);
		SVC.set(this, svc);
		this.scope=scope;
		this.timeout=timeout;
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
	          {field:'widgetName', displayName:'Widget Name', sort:true, render:row=>{return row.widgetName.replace('__LAYOUT__','');}},
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
	    this.wvrListOptions.loadingText="";
	}
	cancel(){
	    this.isGrid=true;
	}
	edit(row, index){
	  this.scope.$apply(()=>{
	      this.isUpdate=true;
	      this.wvr=row;
	      this.isGrid=false;
	      this.wvrListOptions.loadingText="";
	  });
	}
	remove(row, index){
	    if(confirm('Are you sure to remove this item?')){
	         SVC.get(this).removeUVR(row).success(res=>{
	              this.arrayRemove(this.wvrList, item=>item.id==row.id);
	              this.wvrListOptions.loadingText="deleted";
	               this.showMsg('Removed successfully');
	         });
	    }
	}
	save(item){
	    if(!this.isValid(item)){
	        return;
	    }
	    if(!this.isUpdate){
	        SVC.get(this).createUVR(item).success((id)=>{
              item.id=id;
              this.isGrid=true;
              this.wvrList.push(item);
              this.wvrListOptions.loadingText="inserted";
	            this.showMsg('Added successfully');
	        });
	    }else{
	         SVC.get(this).updateUVR(item).success(res=>{
	             this.isGrid=true;
	             this.wvrListOptions.loadingText="updated";
	              this.showMsg('Updated successfully');
	         });
	    }
	}
    isValid(item){
	    
	    if(!item.widgetName){
	        this.showMsg('Please select a widget name.');
	      return false
	    }
	    if(!(item.roleId || item.userId)){
	        this.showMsg('Please select a role or user name');
	        res=false;
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
