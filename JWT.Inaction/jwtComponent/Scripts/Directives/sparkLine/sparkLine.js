class sparkLine
{
    constructor(){
		this.restrict='AE';
		this.scope={data:'=', options: '='};
	}
  	link(scope, element, attr){ 
      scope.$watchGroup(['data', 'options'], function(newValues, oldValues, scope) {
           element.sparkline(angular.isArray(newValues[0])? newValues[0] : newValues[0].split(','), newValues[1]||{type:'bar'});
      });
    }
	static builder()	{
		return new sparkLine();
	}
}
export default sparkLine;