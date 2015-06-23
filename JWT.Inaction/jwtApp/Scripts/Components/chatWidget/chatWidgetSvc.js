import BaseSvc from 'Scripts/base/BaseSvc.js';

class chatWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
		this.http=http;
	}
	static chatWidgetFactory(http)	{
		return new chatWidgetSvc(http);
	}
}
chatWidgetSvc.chatWidgetFactory.$inject=['$http'];
export default chatWidgetSvc.chatWidgetFactory;