
const HTTP=new WeakMap();
class BaseSvc
{
    constructor(http){
        HTTP.set(this,http);
    }
    getDummyData(obj){ 
      
           return  HTTP.get(this).post('Jwt/GetDummyData',obj);        		
    }
    getTableData(spName, spParams){
         return  HTTP.get(this).post('Repository/GetTableData',{spName:spName, spParams:spParams}); 
    }
    getScalarValue(spName, spParams){
         return  HTTP.get(this).post('Repository/getScalarValue',{spName:spName, spParams:spParams}); 
    }
}
export default BaseSvc;