import BaseSvc from 'Scripts/Base/BaseSvc.js';

class perTableWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
		this.http= http;
	}
	static perTableWidgetFactory(http)	{
		return new perTableWidgetSvc(http);
	}
}
perTableWidgetSvc.perTableWidgetFactory.$inject=['$http'];
export default perTableWidgetSvc.perTableWidgetFactory;