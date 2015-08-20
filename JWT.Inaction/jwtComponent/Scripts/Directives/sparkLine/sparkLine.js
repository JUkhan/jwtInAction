class sparkLine
{
    constructor(){
		this.restrict='ACE';
		this.scope={data:'=', options: '='};
	}
  	link(scope, element, attr){ 
      scope.$watchGroup(['data', 'options'], function(newValues, oldValues, scope) {
           element.sparkline(newValues[0], newValues[1]||{type:'bar'});
      });
    }
	static builder()	{
		return new sparkLine();
	}
}
export default sparkLine;