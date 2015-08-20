import BaseCtrl from 'Scripts/base/BaseCtrl.js';

class sparkWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
	    this.svc=svc;
		this.name='sparkLine';
      	this.description='sparkline';
	}
}
sparkWidgetCtrl.$inject=['$scope', 'sparkWidgetSvc'];
export default sparkWidgetCtrl;