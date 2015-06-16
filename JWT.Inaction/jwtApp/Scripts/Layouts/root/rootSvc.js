import BaseSvc from 'Scripts/base/BaseSvc.js';

class rootSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
		super(http);
	    this.http=http;
      	this.baseUrl=ngAuthSettings.apiServiceBaseUri;
	}
  	getUser(userName){
       
        return this.http.get(this.baseUrl+'api/account/user/'+userName);
  
    }
	static rootFactory(http, ngAuthSettings)	{
		return new rootSvc(http, ngAuthSettings);
	}
}
rootSvc.rootFactory.$inject=['$http','ngAuthSettings'];
export default rootSvc.rootFactory;