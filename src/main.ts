export * from './basket.model';

import { Basket } from './basket.model';
import { BasketService } from './basket.service';

const basketsContainer = document.getElementById('baskets');
const baskets = BasketService.getBaskets();
baskets.forEach(basket => {
	basketsContainer.appendChild(BasketService.generateCommandTemplate(basket));
});

const closeInvoiceBtn = document.querySelector('.invoice-container .close');
closeInvoiceBtn.addEventListener('click', closeInvoice, false);

function closeInvoice(e) {
	e.preventDefault();

	document.querySelector('.invoice-container').classList.add('hidden');
}
