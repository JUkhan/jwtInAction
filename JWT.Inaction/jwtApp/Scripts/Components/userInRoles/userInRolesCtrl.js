import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
const SVC=new WeakMap();
class userInRolesCtrl extends BaseCtrl
{
	constructor(scope, svc, timeout){
		super(scope);
		SVC.set(this, svc);
		this.timeout=timeout;
		this.scope=scope;
	    this.loadData();
	    this.options={
	        loadingText:'loading...',filter:true,
	        columns:[
	            {field:'userName', displayName:'User Name', sort:true, onClick:this.showRolesDetail.bind(this)},
	            {field:'fullName', displayName:'Full Name', sort:true},
	            {field:'email', displayName:'Email', sort:true},
	             {field:'email', displayName:'Roles', sort:true, render:this.getClaimsString}
	            ]
	    };
	    this.currentUser=null;
	}
	getClaimsString(row){
	    var temp=[];
	    for(let claim of row.claims){
	        temp.push(claim.value);
	    }
	    return temp.join(',');
	}
	loadData(){
	    SVC.get(this).getAllRoles().success(res=>{ this.roles=res; });
	    SVC.get(this).getAllUsers().success(res=>{ this.users=res; this.options.loadingText='done'; });
	    
	}
	addRole(roleName){
	    if(roleName){
	        SVC.get(this).addRole(roleName).success(res=>{
	          
	           this.roles.push(res);
	           this.roleMsg='';
	           
	        }).error(res=>{ this.roleMsg= res.message; });
	    }else{
	        this.showMsg('Role name is required.');
	    }
	}
	showRolesDetail(user){
	    this.currentUser=user;
	     this.scope.$apply(()=>{
        	  this.userName=user.userName;
        	  this.claims=user.claims;
	     });
	}
    removeClaim(claim){
        if(confirm('Are you sure to remove this role.')){
            SVC.get(this).removeClaimFromUser(this.currentUser.id, claim).success(res=>{
                 this.arrayRemove(this.currentUser.claims, item=>item.value==claim);
                 this.updateGrid();
                 this.showMsg('Role removed successfully');
            })
           
        }
    }
    updateGrid(){
        this.options.loadingText=Number(new Date());
    }
    assignClaimToUser(claimName){
        
        if(this.validateRole(claimName)){
            SVC.get(this).assignClaimToUser(this.currentUser.id, claimName).success(res=>{
                this.currentUser.claims.push({value:claimName});
                 this.updateGrid();
                this.showMsg('Role assigned successfully');
            })
        }
       
    }
    validateRole(claimName){
       
        if(!this.currentUser){
            this.showMsg('Please select an user first.');
            return false;
        }
        else if(!this.claimName){
             this.showMsg('Please select a role.');
            return false;
        }
        this.userMsg='';
        return true;
    }
    showMsg(msg) {
	    this.msg=msg;
        var that=this, timer = that.timeout(function () {
            that.timeout.cancel(timer);
           	that.msg='';
        }, 2000);
    }
}

userInRolesCtrl.$inject=['$scope', 'userInRolesSvc', '$timeout'];
export default userInRolesCtrl;