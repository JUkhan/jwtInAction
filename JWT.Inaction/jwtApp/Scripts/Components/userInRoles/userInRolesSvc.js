import BaseSvc from 'Scripts/Base/BaseSvc.js';

class userInRolesSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
		super(http);
		this.apiServiceBaseUri=ngAuthSettings.apiServiceBaseUri;
	    this.http=http;
	}
	getAllRoles(){
	    
	     return  this.http.get(this.apiServiceBaseUri+'api/roles/');
	}
	removeUser(id){
	    
	    return  this.http.delete(this.apiServiceBaseUri+'api/account/user/'+id);
	}
	addRole(name){
	    
	     return  this.http.post(this.apiServiceBaseUri+'api/roles/create',{name:name});
	}
	getAllUsers(){
	    
	    return  this.http.get(this.apiServiceBaseUri+'api/account/users');
	}
	assignClaimToUser(id, claimName){
	    
	     return  this.http.put(this.apiServiceBaseUri+'api/account/user/'+id+'/assignclaim' ,{type:'role',value:claimName});
	}
	removeClaimFromUser(id, claimName){
	    
	     return  this.http.put(this.apiServiceBaseUri+'api/account/user/'+id+'/removeclaim' ,{type:'role',value:claimName});
	}
	static userInRolesFactory(http, ngAuthSettings)	{
	    
		return new userInRolesSvc(http, ngAuthSettings);
	}
}
userInRolesSvc.userInRolesFactory.$inject=['$http','ngAuthSettings'];
export default userInRolesSvc.userInRolesFactory;