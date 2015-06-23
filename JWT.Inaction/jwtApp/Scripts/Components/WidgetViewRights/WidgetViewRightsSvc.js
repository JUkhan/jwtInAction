import BaseSvc from 'Scripts/Base/BaseSvc.js';

class WidgetViewRightsSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
	    
		super(http);
		this.apiServiceBaseUri=ngAuthSettings.apiServiceBaseUri;
		this.http=http;
	}
	getWidgets(){
	    
	    return this.http.get(this.apiServiceBaseUri+'api/widgetRight/getWidgets');
	}
	getWidgetViewRights(){
	    
	     return this.http.get(this.apiServiceBaseUri+'api/widgetRight/getWidgetViewRights');
	}
	getUsers(){
	    
	     return this.http.get(this.apiServiceBaseUri+'api/widgetRight/getUsers');
	}
	getRoles(){
	    
	     return this.http.get(this.apiServiceBaseUri+'api/widgetRight/getRoles');
	}
	createUVR(item){
	    
	     return this.http.post(this.apiServiceBaseUri+'api/widgetRight/createItem', item);
	}
	updateUVR(item){
	    
	     return this.http.post(this.apiServiceBaseUri+'api/widgetRight/updateItem', item);
	}
	removeUVR(item){
	    
	     return this.http.post(this.apiServiceBaseUri+'api/widgetRight/removeItem', item);
	}
	static widgetViewRightsFactory(http, ngAuthSettings)	{
		return new WidgetViewRightsSvc(http, ngAuthSettings);
	}
}
WidgetViewRightsSvc.widgetViewRightsFactory.$inject=['$http','ngAuthSettings'];
export default WidgetViewRightsSvc.widgetViewRightsFactory;

