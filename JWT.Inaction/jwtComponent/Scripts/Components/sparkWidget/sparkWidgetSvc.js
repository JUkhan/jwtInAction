import BaseSvc from 'Scripts/base/BaseSvc.js';
const HTTP=new WeakMap();
class sparkWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
		HTTP.set(this, http);
	}
	static sparkWidgetFactory(http)	{
		return new sparkWidgetSvc(http);
	}
}
sparkWidgetSvc.sparkWidgetFactory.$inject=['$http'];
export default sparkWidgetSvc.sparkWidgetFactory;