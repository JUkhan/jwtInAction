import BaseSvc from 'Scripts/base/BaseSvc.js';

class tableWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
		this.http=http;
	}
	static tableWidgetFactory(http)	{
		return new tableWidgetSvc(http);
	}
}
tableWidgetSvc.tableWidgetFactory.$inject=['$http'];
export default tableWidgetSvc.tableWidgetFactory;