class spark
{
	constructor(){
		this.restrict='A';
		
	}
  	link(scope, element, attr){
      element.sparkline('html', { enableTagOptions: true });
    }
	static builder()	{
		return new spark();
	}
}
export default spark;