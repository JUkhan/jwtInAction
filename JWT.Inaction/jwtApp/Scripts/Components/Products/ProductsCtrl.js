
import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
import JwtFormGrid from 'Scripts/Modules/jwtComponents/JwtFormGrid.js';

class ProductsCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		this.svc = svc;
		this.title='Products';
		
		this.setFormGridOptions();
		this.loadData();
	}
	
	setFormGridOptions(){
	    var grid={
	        filter:true,limit:15,checkList:(data)=>{ console.log(data);},
	      loadingText:'Loading...',newItem:()=>{this.formGrid.showForm().formRefresh(); }, newItemText:'Add New Widget Permission',
	      columns:[
	          {field:'ProductName', displayName:'Product Name', sort:true },
	          {field:'ProductCode', displayName:'Product Code', sort:true },
	          {field:'action', displayName:'Action', icon:['glyphicon glyphicon-ok','glyphicon glyphicon-remove'], linkText:['Edit','Delete'],  onClick:[row=>this.formGrid.setFormData(row), this.remove.bind(this)]},
	         
	          ]
	    };
	    var form={
	        title:'Widget Permission', fileUpload:true,
	        formSubmit:(data, form)=>{
	            this.save(data);  
	        },
	        formCancel:()=>{
	            this.formGrid.showGrid()
	        },
	        fields:[
	            {type:'text', name:'ProductName', label:'Product Name',  required:true},
	            {type:'text', name:'ProductCode', label:'Product Code', required:true}
	           
	            ]
	    };
	    this.formGrid=React.render(React.createElement(JwtFormGrid, {gridOptions:grid, formOptions:form}), document.getElementById('formGrid'));
	}
	loadData(){
	    
	    this.svc.get_1('Products_GetAll').success(res=>{
	        console.log(res)
    	        this.list=angular.fromJson(res); 
    	        this.formGrid.setGridData(this.list);
	        });
	   
	}
	remove(row, index){
	    if(confirm('Are you sure to remove this item?')){
	         this.svc.get_2('Products_Delete',{Id:row.Id}).success(res=>{
	                this.arrayRemove(this.list, item=>item.Id===row.Id);
	                this.formGrid.setGridData(this.list)
	                this.formGrid.showMessage('Removed successfully');
	         });
	    }
	}
	save(item){
	    
	    if(!item.Id){
	        this.svc.get_2('Products_Create', item).success((id)=>{
                  item.Id=parseInt(id);
                  this.list.push(item);
                  this.formGrid.setGridData(this.list);
    	          this.formGrid.showMessage('Added successfully');
    	          this.formGrid.showGrid()
	        });
	    }else{
	         this.svc.get_2('Products_Update', item).success(res=>{
	              this.formGrid.setGridData(this.list)
	              this.formGrid.showMessage('Updated successfully');
	              this.formGrid.showGrid()
	         });
	    }
	}
}
ProductsCtrl.$inject=['$scope', 'ProductsSvc'];
export default ProductsCtrl;