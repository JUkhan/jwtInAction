import BaseCtrl from 'Scripts/base/BaseCtrl.js';
const SVC=new WeakMap();
class testModuleWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.name='testModule';
      this.description='test module...';
	}
}
testModuleWidgetCtrl.$inject=['$scope', 'testModuleWidgetSvc'];
export default testModuleWidgetCtrl;