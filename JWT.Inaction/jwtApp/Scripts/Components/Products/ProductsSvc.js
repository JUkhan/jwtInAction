import BaseSvc from 'Scripts/Base/BaseSvc.js';

class ProductsSvc extends BaseSvc
{
	constructor(http){
		super(http);
		this.http= http;
	}
	static productsFactory(http)	{
		return new ProductsSvc(http);
	}
}
ProductsSvc.productsFactory.$inject=['$http'];
export default ProductsSvc.productsFactory;