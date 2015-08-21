import BaseCtrl from 'Scripts/Base/BaseCtrl.js';

class perTableWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		this.svc = svc;
		this.name='perTable';
		this.description='Performance Table';
		
		this.options={tplId:2, categoryList:['Share', 'Sales', 'Growth','Above/Below'], onClick:item=>{alert(item.title);}};
		this.list=[
		    {title:'Belgium', colorCode:'red', chart:'Absolute', period:'May/May', from:'JAN-2014', to:'MAR-2014',volume:'SU',
		    sparkList:[
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'}
    		    ]
		    },
		     {title:'Japan', colorCode:'green', chart:'Absolute', period:'May/May', from:'JAN-2014', to:'MAR-2014',volume:'SU',
		    sparkList:[
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'},
    		    {min:'-3%', max:'10%', data:'9,4,-3,7,8,10,12,8,9,4,14,12,13'}
    		    ]
		    }
		    ];
	}
}
perTableWidgetCtrl.$inject=['$scope', 'perTableWidgetSvc'];
export default perTableWidgetCtrl;