import BaseSvc from 'Scripts/base/BaseSvc.js';

class sparkWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
	    this.http=http;
	}
	static sparkWidgetFactory(http)	{
		return new sparkWidgetSvc(http);
	}
}
sparkWidgetSvc.sparkWidgetFactory.$inject=['$http'];
export default sparkWidgetSvc.sparkWidgetFactory;