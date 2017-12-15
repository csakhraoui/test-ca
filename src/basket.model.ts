import { Product } from './product.model';

export class Basket {
	protected productsList: Product[] = [];

	get label() { return this.name; }
	get products() { return this.productsList; }

	constructor(protected name: string) {}

	add(product: Product) {
		this.productsList.push(product);
	}

	taxSum(): number {
		return this.productsList.reduce((tax, product) => tax + product.tax(), 0);
	}

	total(): number {
		return this.priceWithoutTax() + this.taxSum();
	}

	protected priceWithoutTax(): number {
		return this.productsList.reduce((price, product) => price + product.price, 0);
	}
}
