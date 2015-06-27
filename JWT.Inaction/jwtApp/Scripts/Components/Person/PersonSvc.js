import BaseSvc from 'Scripts/Base/BaseSvc.js';

class PersonSvc extends BaseSvc
{
	constructor(http){
		super(http);
		this.http= http;
	}
	static personFactory(http)	{
		return new PersonSvc(http);
	}
}
PersonSvc.personFactory.$inject=['$http'];
export default PersonSvc.personFactory;