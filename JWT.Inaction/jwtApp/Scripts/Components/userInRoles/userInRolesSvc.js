import BaseSvc from 'Scripts/Base/BaseSvc.js';
const HTTP=new WeakMap();
class userInRolesSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
		super(http);
		this.apiServiceBaseUri=ngAuthSettings.apiServiceBaseUri;
		HTTP.set(this, http);
	}
	getAllRoles(){
	     return HTTP.get(this).get(this.apiServiceBaseUri+'api/roles/');
	}
	removeUser(id){
	    return HTTP.get(this).delete(this.apiServiceBaseUri+'api/account/user/'+id);
	}
	addRole(name){
	     return HTTP.get(this).post(this.apiServiceBaseUri+'api/roles/create',{name:name});
	}
	getAllUsers(){
	    return HTTP.get(this).get(this.apiServiceBaseUri+'api/account/users');
	}
	assignClaimToUser(id, claimName){
	     return HTTP.get(this).put(this.apiServiceBaseUri+'api/account/user/'+id+'/assignclaim' ,{type:'role',value:claimName});
	}
	removeClaimFromUser(id, claimName){
	     return HTTP.get(this).put(this.apiServiceBaseUri+'api/account/user/'+id+'/removeclaim' ,{type:'role',value:claimName});
	}
	static userInRolesFactory(http, ngAuthSettings)	{
		return new userInRolesSvc(http, ngAuthSettings);
	}
}
userInRolesSvc.userInRolesFactory.$inject=['$http','ngAuthSettings'];
export default userInRolesSvc.userInRolesFactory;