import BaseSvc from 'Scripts/base/BaseSvc.js';
const HTTP=new WeakMap();
class homeSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
		super(http);
		HTTP.set(this, http);
      	this.baseUrl=ngAuthSettings.apiServiceBaseUri;
	}
  	getData(){
       
       var config={limit:20, columns:[{name:'Animal', type:'animal'}]};
        return HTTP.get(this).post('Jwt/GetDummyData', config);
  
    }
	static homeFactory(http, ngAuthSettings)	{
		return new homeSvc(http, ngAuthSettings);
	}
}
homeSvc.homeFactory.$inject=['$http','ngAuthSettings'];
export default homeSvc.homeFactory;