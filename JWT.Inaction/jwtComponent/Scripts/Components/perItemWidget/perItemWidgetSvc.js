import BaseSvc from 'Scripts/Base/BaseSvc.js';

class perItemWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
		this.http= http;
	}
	static perItemWidgetFactory(http)	{
		return new perItemWidgetSvc(http);
	}
}
perItemWidgetSvc.perItemWidgetFactory.$inject=['$http'];
export default perItemWidgetSvc.perItemWidgetFactory;