
class BaseSvc
{
    constructor(http){
        
        this.http=http;
    }
    getDummyData(obj){ 
      
           return this.http.post('Jwt/GetDummyData',obj);        		
    }
    get_1(spName, spParams){
        
        if(spParams && typeof spParams !=='array'){
            spParams=this.getParams(spParams);
        }
         return  this.http.post('Repository/GetTableData',{spName:spName, spParams:spParams}); 
    }
    get_2(spName, spParams){
        
         if(spParams && typeof spParams !=='array'){
            spParams=this.getParams(spParams);
         }
         return  this.http.post('Repository/getScalarValue',{spName:spName, spParams:spParams}); 
    }
    getParams(obj){
        var paramList=[];
        for(var key in obj){
            paramList.push({name:key, value:obj[key]});
        }
        return paramList;
    }
}
export default BaseSvc;