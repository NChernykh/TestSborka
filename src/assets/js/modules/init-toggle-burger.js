const burgerBtn = document.querySelector('[aria-pressed]');
const breakpointLg = window.matchMedia('(min-width:1200px)');

const openMenu = () => {
	burgerBtn.ariaPressed = 'true';
	document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
	burgerBtn.ariaPressed = 'false';
	document.body.removeAttribute('style');
};

const closeMenuOnResize = () => {
	closeMenu();
};

const initBurgerAction = () => {
	if (burgerBtn) {
		breakpointLg.addListener(closeMenuOnResize);
		burgerBtn.addEventListener('click', () => {
			if (burgerBtn.ariaPressed === 'true') {
				closeMenu();
			} else {
				openMenu();
			}
		});
	}
};

export default initBurgerAction;
