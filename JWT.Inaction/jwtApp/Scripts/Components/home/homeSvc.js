import BaseSvc from 'Scripts/base/BaseSvc.js';

class homeSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
		super(http);
	    this.http=http;
      	this.baseUrl=ngAuthSettings.apiServiceBaseUri;
	}
  	getData(){
       
        return this.http.get(this.baseUrl+'api/orders');
  
    }
	static homeFactory(http, ngAuthSettings)	{
		return new homeSvc(http, ngAuthSettings);
	}
}
homeSvc.homeFactory.$inject=['$http','ngAuthSettings'];
export default homeSvc.homeFactory;