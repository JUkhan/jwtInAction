import BaseCtrl from 'Scripts/Base/BaseCtrl.js';

class perItemWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		this.svc = svc;
		this.name='perItem';
		this.description='Perpormance Item ';
		
		this.data1={title:'Belgium', colorCode:'red', chart:'Absolute', period:'May/May', from:'JAN-2014', to:'MAR-2014',volume:'SU',
		    sparkList:[
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'}
    		    ]
		    };
		    
	    this.data2={title:'Channels', 
	    sparkList:[
		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'}
		    ]
	    };
	}
	show(item){
	    alert(item.title);
	}
}
perItemWidgetCtrl.$inject=['$scope', 'perItemWidgetSvc'];
export default perItemWidgetCtrl;