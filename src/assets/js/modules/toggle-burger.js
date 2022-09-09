const burgerBtn = document.querySelector('.header__menu-toggle');
const navBlock = document.querySelector('.header');
const navList = document.querySelector('.header__menu');
const breakpointLg = window.matchMedia('(min-width:1200px)');

const openMenu = () => {
	burgerBtn.ariaPressed = 'true';
	navBlock.classList.add('header--opened');
	window.disableBodyScroll(navList);
	burgerBtn.classList.add('no-pointer');
	setTimeout(() => {
		burgerBtn.classList.remove('no-pointer');
	}, 1000);
};

const closeMenu = () => {
	burgerBtn.ariaPressed = 'false';
	navBlock.classList.remove('header--opened');
	window.enableBodyScroll(navList);
	burgerBtn.classList.add('no-pointer');
	setTimeout(() => {
		burgerBtn.classList.remove('no-pointer');
	}, 1200);
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
