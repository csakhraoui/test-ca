export interface ProductInfo {
	name: string;
	type: string;
	price: number;
	qty: number;
	imported?: boolean;
}

export class Product {
	static readonly exemptedProducts: string[] = ['book', 'food', 'medication'];

	get name(): string { return this.metadata.name; }
	get type(): string { return this.metadata.type; }
	get price(): number { return this.metadata.price; }
	get imported(): boolean { return this.metadata.imported; }
	get exempted(): boolean { return Product.exemptedProducts.indexOf(this.type) !== -1; }
	get qty(): number { return this.metadata.qty; }
	get label(): string {
		return this.qty + ' ' + this.name;
	}

	constructor(protected metadata: ProductInfo) {}

	getCommandEntry(): string {
		return this.label + ' à ' + this.price;
	}

	getInvoiceEntry(): string {
		return this.label + ((this.imported) ? 'importé' : '') + ' : ' + this.ttcPrice().toFixed(2);
	}

	tax(): number {
		return this.vat() + this.importTax();
	}

	vat(): number {
		return (this.exempted) ? 0 : (Math.ceil((this.price * 0.1) * 20) / 20);
	}

	importTax(): number {
		return (this.imported) ? (Math.ceil((this.price * 0.05) * 20) / 20): 0;
	}

	ttcPrice(): number {
		return this.price + this.vat() + this.importTax();
	}
}
