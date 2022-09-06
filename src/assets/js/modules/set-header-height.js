// Модуль отвечает за определение высоты шапки

const setHeaderHeight = () => {
	const header = document.querySelector('.header');
	if (!header) {
		return;
	}

	const calcHeaderHeight = () => {
		const headerHeight = Math.ceil(header.getBoundingClientRect().height);
		document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
	};

	calcHeaderHeight();

	window.addEventListener('resize', () => {
		calcHeaderHeight();
	});
};

export default setHeaderHeight;
