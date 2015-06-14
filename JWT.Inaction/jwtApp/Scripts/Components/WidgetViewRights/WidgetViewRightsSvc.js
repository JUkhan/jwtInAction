import BaseSvc from 'Scripts/Base/BaseSvc.js';
const HTTP=new WeakMap();
class WidgetViewRightsSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
		super(http);
		this.apiServiceBaseUri=ngAuthSettings.apiServiceBaseUri;
		HTTP.set(this, http);
	}
	getWidgets(){
	    return HTTP.get(this).get(this.apiServiceBaseUri+'api/widgetRight/getWidgets');
	}
	getWidgetViewRights(){
	     return HTTP.get(this).get(this.apiServiceBaseUri+'api/widgetRight/getWidgetViewRights');
	}
	getUsers(){
	     return HTTP.get(this).get(this.apiServiceBaseUri+'api/widgetRight/getUsers');
	}
	getRoles(){
	     return HTTP.get(this).get(this.apiServiceBaseUri+'api/widgetRight/getRoles');
	}
	createUVR(){
	     return HTTP.get(this).get(this.apiServiceBaseUri+'api/widgetRight/create');
	}
	updateUVR(){
	     return HTTP.get(this).get(this.apiServiceBaseUri+'api/widgetRight/update');
	}
	removeUVR(){
	     return HTTP.get(this).get(this.apiServiceBaseUri+'api/widgetRight/delete');
	}
	static widgetViewRightsFactory(http, ngAuthSettings)	{
		return new WidgetViewRightsSvc(http, ngAuthSettings);
	}
}
WidgetViewRightsSvc.widgetViewRightsFactory.$inject=['$http','ngAuthSettings'];
export default WidgetViewRightsSvc.widgetViewRightsFactory;

