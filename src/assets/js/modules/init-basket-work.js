const basketList = document.querySelector('.basket__list');
const headerItems = document.getElementById('totalItem');
const subtotal = document.getElementById('subtotal');
const tax = document.getElementById('tax');
const shopping = document.getElementById('shipping');
const total = document.getElementById('total');
let totalItemCost = 0;

const ACTION = {
	PLUS: 'plus',
	MINUS: 'minus',
};

// форматирует цену
const formatNumber = x => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

// удаляет товар из корзины
const deleteItem = event => {
	const e = event.target;
	if (e.dataset.counter === 'delete') {
		e.closest('.basket__item').remove();
	}
};

// считает стоимость одного товара
const calculateSeparateItem = (basketItem, action) => {
	const input = basketItem.querySelector('[data-counter="input"]');

	// eslint-disable-next-line default-case
	switch (action) {
		case ACTION.PLUS:
			input.value++;

			break;
		case ACTION.MINUS:
			input.value--;
			break;
	}

	totalItemCost =
		Number(basketItem.querySelector('[data-counter="input"]').value) *
		Number(basketItem.querySelector('[data-counter="price"]').textContent);

	basketItem.querySelector('[data-counter="price"]').dataset.value = totalItemCost;
};

// считает общую сумму
const sumTotal = () => {
	let totalCost = 0;
	let totalSum = 0;
	let totalItem = 0;

	[...document.querySelectorAll('.basket__item')].forEach(item => {
		totalCost += Number(item.querySelector('[data-counter="price"]').dataset.value);
		totalItem += Number(item.querySelector('[data-counter="input"]').value);
	});

	headerItems.textContent = totalItem;
	if (headerItems.textContent === '0') {
		console.log(headerItems.textContent);
		headerItems.remove();
	}
	subtotal.textContent = formatNumber(totalCost);
	totalSum += parseInt(tax.textContent, 10) + parseInt(shopping.textContent, 10) + totalCost;
	total.textContent = formatNumber(totalSum);
};

// меняет кол-во товара и пересчитывает сумму
const changeItem = event => {
	const basketItem = event.target.closest('.basket__item');

	if (event.target.dataset.counter === 'minus') {
		const input = basketItem.querySelector('[data-counter = "input"]');
		if (Number(input.value) > 1) {
			calculateSeparateItem(basketItem, ACTION.MINUS);
		} else if (Number(input.value) === 1) {
			basketItem.remove();
		}
	}

	if (event.target.dataset.counter === 'plus') {
		calculateSeparateItem(basketItem, ACTION.PLUS);
	}

	sumTotal();
};

const initBasketWork = () => {
	basketList.addEventListener('click', deleteItem);
	basketList.addEventListener('click', changeItem);
};

if (module.hot) {
	module.hot.dispose(() => {
		basketList.removeEventListener('click', deleteItem);
		basketList.removeEventListener('click', changeItem);
	});
}

export default initBasketWork;
