import BaseSvc from 'Scripts/base/BaseSvc.js';
const HTTP=new WeakMap();
class testModuleWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
		HTTP.set(this, http);
	}
	static testModuleWidgetFactory(http)	{
		return new testModuleWidgetSvc(http);
	}
}
testModuleWidgetSvc.testModuleWidgetFactory.$inject=['$http'];
export default testModuleWidgetSvc.testModuleWidgetFactory;