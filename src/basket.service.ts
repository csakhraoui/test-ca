import { Product, ProductInfo } from './product.model';
import { Basket } from './basket.model';

import { commands } from './commands';

export namespace BasketService {
	export const getBaskets = () => {
		const baskets = [];
		for(let name in commands) {
			const basket = new Basket(name);
			commands[name]
				.map((productInfo: ProductInfo) => new Product(productInfo))
				.forEach(product => basket.add(product));
			baskets.push(basket);
		}

		return baskets;
	};

	export const generateCommandTemplate = (basket) => {
		let tpl = basket.products.reduce(
			(tpl, product) => tpl + '<li>' + product.getCommandEntry() + '</li>',
			''
		);

		tpl = `
			<ul class="command">${tpl}</ul>
			<a href="#" class="goto-invoice invoice">Commander</a>
		`;
		const container = document.createElement('div');
		container.insertAdjacentHTML('beforeend', tpl);
		container.querySelector('.goto-invoice')
			.addEventListener('click', gotoInvoice.bind(basket), false);
		return container;
	};

	function gotoInvoice(e) {
		e.preventDefault();
		const basket = this;

		let tpl = basket.products.reduce(
			(tpl, product) => tpl + '<li>' + product.getInvoiceEntry() + '</li>',
			''
		);
		tpl = `
			<h2>Facture : ${basket.name}</h2>
			<ul>${tpl}</ul>
			<div>Montant des taxes : ${basket.taxSum().toFixed(2)}</div>
			<div>Total : ${basket.total().toFixed(2)}</div>
		`

		const container = document.querySelector('.invoice-container');
		container.querySelector('.invoice').innerHTML = tpl;
		container.classList.remove('hidden');
	};
}
