import BaseCtrl from 'Scripts/base/BaseCtrl.js';

class rootCtrl extends BaseCtrl
{
	constructor(location, authService, svc, scope){
         super(scope);
         
		this.authentication = authService.authentication;
      	this.authService=authService;
      	this.location=location;
      	this.hasAuthorize=false;
      	svc.getUser(this.authentication.userName).success(user=>{this.userAction(user);});
      	this.svc=svc;
      
      	
      	this.initFilter();
      	this.loadCountry();
	}
	loadCountry(){
	    var data_config={limit:10, columns:[{field:'country', type:'country'},{field:'id', type:'int', min:1, max:20} ]};
	    this.svc.getDummyData(data_config).success(res=>{
	        this.countryList=angular.fromJson(res.data);
	        this.COUNTRY_ID=this.countryList[0].id;
	    })
	}
  	logOut() {
        this.authService.logOut();
        this.location.path('root/login');
    }
  	userAction(user){
  	    
  	    for(var claim of user.claims){
  	        if(claim.value==='Admin' || claim.value==='SuperAdmin'){
  	            this.hasAuthorize=true;
  	        }
  	    }
  	}
}
rootCtrl.$inject=['$location', 'authService', 'rootSvc', '$scope'];
export default rootCtrl;