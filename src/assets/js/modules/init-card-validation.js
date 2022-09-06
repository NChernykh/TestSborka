// модуль отвечает за валидацию полей оплаты картой

const initCardValidation = () => {
	const card = {
		numberWrap: document.querySelector('.payment-form__card-number'),
		numbers: document.querySelectorAll('.payment-form__card-number input'),
		holder: document.querySelector('#cardHolder'),
		expire: document.querySelector('#expireDate'),
	};
	let numberI = 0;

	// cardHolder
	card.holder.addEventListener('input', e => {
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
		item.addEventListener('focus', e => {
			e.preventDefault();
			card.numbers[numberI].focus();
		});
		item.addEventListener('input', e => {
			if (/\d/.test(item.value)) {
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
};

export default initCardValidation;
