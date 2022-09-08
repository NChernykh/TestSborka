// модуль отвечает за валидацию полей оплаты картой

const initCardValidation = () => {
	const card = {
		numberWrap: document.querySelector('.payment-form__card-number'),
		numbers: document.querySelectorAll('.payment-form__card-number input'),
		holder: document.querySelector('#cardHolder'),
		expire: document.querySelector('#expireDate'),
		cvv: document.querySelector('#cvv'),
	};
	let numberI = 0;

	// cardHolder
	card.holder.addEventListener('input', () => {
		const regName = /\D/;
		let holderValue = '';
		const holderName = card.holder.value.substr(0, 40);
		if (regName.test(holderName)) {
			card.holder.value = holderName;
			holderValue = holderName;
		} else {
			card.holder.value = holderValue;
		}
	});

	// номер карты
	card.numbers.forEach(item => {
		item.addEventListener('focus', () => {
			card.numbers[numberI].focus();
		});
		item.addEventListener('input', () => {
			if (item.value) {
				if (item.value.length >= 4) {
					item.value = item.value.substr(0, 4);
					numberI = numberI < 3 ? numberI + 1 : numberI;
					card.numbers[numberI].focus();
				}
			} else {
				item.value = '';
			}
		});
	});

	card.numberWrap.onkeyup = e => {
		if (e.key === 'Backspace') {
			if (numberI > 0) {
				if (card.numbers[numberI].value.length < 5 && card.numbers[numberI].value.length > 0) {
					card.numbers[numberI].value.slice(0, -1);
				}

				if (card.numbers[numberI].value.length < 1) {
					card.numbers[numberI].value = '';
					numberI--;
					card.numbers[numberI].focus();
				}
			}
		}
	};

	// expire Date
	card.expire.addEventListener('input', () => {
		let expireValue = '';
		const reg = /^(\d{0,2})\/?(\d{0,2})$/;
		const value = card.expire.value.substr(0, 5);
		if (reg.test(value)) {
			card.expire.value = value;
			expireValue = value;
			card.expire.classList.remove('invalid');
		} else {
			card.expire.value = expireValue;
			card.expire.classList.add('invalid');
		}
	});

	// cvv code

	card.cvv.addEventListener('input', () => {
		if (card.cvv.value) {
			if (card.cvv.value.length >= 3) {
				card.cvv.value = card.cvv.value.substr(0, 3);
				card.cvv.classList.remove('invalid');
			}
		} else {
			card.cvv.value = '';
			card.cvv.classList.add('invalid');
		}
	});
};

export default initCardValidation;
