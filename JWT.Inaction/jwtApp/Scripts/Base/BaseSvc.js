
class BaseSvc
{
    constructor(http){
        
        this.http=http;
    }
    getDummyData(obj){ 
      
           return this.http.post('Jwt/GetDummyData',obj);        		
    }
    getTableData(spName, spParams){
        
         return  this.http.post('Repository/GetTableData',{spName:spName, spParams:spParams}); 
    }
    getScalarValue(spName, spParams){
        
         return  this.http.post('Repository/getScalarValue',{spName:spName, spParams:spParams}); 
    }
}
export default BaseSvc;