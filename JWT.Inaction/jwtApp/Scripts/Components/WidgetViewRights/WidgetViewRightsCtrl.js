import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
const SVC=new WeakMap();
class WidgetViewRightsCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='WidgetViewRights';
		
	
		svc.getWidgets().success(res=>{console.log(res)})
		svc.getUsers().success(res=>{console.log(res)})
		svc.getRoles().success(res=>{console.log(res)})
		svc.getWidgetViewRights().success(res=>{console.log(res)})
	}
}
WidgetViewRightsCtrl.$inject=['$scope', 'WidgetViewRightsSvc'];
export default WidgetViewRightsCtrl;