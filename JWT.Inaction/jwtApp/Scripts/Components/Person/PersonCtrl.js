
import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
import JwtFormGrid from 'Scripts/Modules/jwtComponents/JwtFormGrid.js';

class PersonCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		this.svc = svc;
	
	    this.setFormGridOptions();
	    this.loadData();
	}
	
	setFormGridOptions(){
	   
	    var me=this;
	     var grid={
	        filter:true,limit:15,
	      loadingText:'Loading...',newItem:()=>{me.formGrid.showForm().formRefresh(); }, newItemText:'Add New Person',
	      columns:[
	          {field:'action', displayName:'Action', linkText:['Edit','Delete'],  onClick:[row=>this.formGrid.setFormData(row), this.remove.bind(this)]},
	          {field:'Name', displayName:'Name', sort:true},
	          {field:'Email', displayName:'Email', sort:true},
	          {field:'Phone', displayName:'Phone', sort:true},
	          {field:'FileName', displayName:'FileName', render:row=>{ return '<img class="img-thumbnail" width="304" height="236" src="'+row.Path+'/'+row.FileName+'" />' }},
	          {field:'Path', displayName:'Path', sort:true}
	          ]
	      };
	      
	       var form={
	        title:'Person Sample', fileUpload:true,
	        formSubmit:function(data, form){
	           me.save(data, form); 
	          
	        },
	        formCancel:function(){
	            me.formGrid.showGrid()
	        },
	        fields:[
	            {type:'text', name:'Name', label:'Name', required:true},
	            {type:'text', name:'Email', label:'Email', required:true},
	            {type:'text', name:'Phone', label:'Phone', required:true},
	            {type:'text', name:'Path', label:'Path', required:true},
	            {type:'file', name:'file', label:'Image File'}
	           
	            ]
	    };
	    this.formGrid=React.render(React.createElement(JwtFormGrid, {gridOptions:grid, formOptions:form}), document.getElementById('formGrid'));
	}
	
	loadData(){
	    this.svc.get_1('Person_SelectAll').success(res=>{
	        this.list=angular.fromJson(res);
	       this.formGrid.setGridData(this.list);
	    })
	}
	
	save(item, form){
	   
	    var spParams=this.getParams({name:item.Name, email:item.Email, phone:item.Phone, path:item.Path});
	    if(!item.Id){
	        form.submit({
	            url:'http://localhost:53954/Repository/FileUpload',
	            data:{spName:'Person_Create', spParams:angular.toJson(spParams), path:'images'},
	            success:function(res){
	                console.log(res);
	            }
	        });
	        /*this.svc.createUVR(item).success((id)=>{
                  item.id=id;
                  this.list.push(item);
                  this.formGrid.setGridData(this.list);
    	          this.formGrid.showMessage('Added successfully');
    	          this.formGrid.showGrid()
	        });*/
	    }else{
	         this.svc.updateUVR(item).success(res=>{
	              this.formGrid.setGridData(this.list)
	              this.formGrid.showMessage('Updated successfully');
	              this.formGrid.showGrid()
	         });
	    }
	}
	remove(row, index){
	    if(confirm('Are you sure to remove this item?')){
	         this.svc.removeUVR(row).success(res=>{
	                this.arrayRemove(this.list, item=>item.Id==row.Id);
	                this.formGrid.setGridData(this.list)
	                this.formGrid.showMessage('Removed successfully');
	         });
	    }
	}
}
PersonCtrl.$inject=['$scope', 'PersonSvc'];
export default PersonCtrl;