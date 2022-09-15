import { gsap } from 'gsap';
import setHeaderHeight from './modules/set-header-height';
import initCardValidation from './modules/init-card-validation';
import initBurgerAction from './modules/init-toggle-burger';
import initBasketWork from './modules/init-basket-work';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

global.gsap = gsap;

gsap.defaults({
	overwrite: 'auto',
});

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
			setHeaderHeight();
			initCardValidation();
			initBurgerAction();
			initBasketWork();
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
