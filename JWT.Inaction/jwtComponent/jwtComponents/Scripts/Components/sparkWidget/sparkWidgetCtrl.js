import BaseCtrl from 'Scripts/base/BaseCtrl.js';
const SVC=new WeakMap();
class sparkWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.name='spark';
      	this.description='sparkline';
	}
}
sparkWidgetCtrl.$inject=['$scope', 'sparkWidgetSvc'];
export default sparkWidgetCtrl;