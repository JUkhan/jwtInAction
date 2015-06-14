import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
const SVC=new WeakMap();
class WidgetViewRightsCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='WidgetViewRights';
		
		this.lostOptions();
	    this.loadData();
	
	}
	lostOptions(){
	    this.wvrListOptions={
	      loadingText:'Loading...'  
	    };
	}
	loadData(){
	    var me=this;
	    SVC.get(me).getWidgets().success(res=>{console.log(res)});
    	SVC.get(me).getUsers().success(res=>{console.log(res)});
    	SVC.get(me).getRoles().success(res=>{console.log(res)});
    	SVC.get(me).getWidgetViewRights().success(res=>{me.wvrList=res; me.wvrListOptions.loadingText='';});
	}
}
WidgetViewRightsCtrl.$inject=['$scope', 'WidgetViewRightsSvc'];
export default WidgetViewRightsCtrl;