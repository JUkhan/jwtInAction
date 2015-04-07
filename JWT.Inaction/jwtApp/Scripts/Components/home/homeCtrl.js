import BaseCtrl from 'Scripts/base/BaseCtrl.js';
const SVC=new WeakMap();
class homeCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='home';
      	this.loadData();
	}
  	loadData(){
      SVC.get(this).getData().success(data=>{this.list=data;});
    }
}
homeCtrl.$inject=['$scope', 'homeSvc'];
export default homeCtrl;