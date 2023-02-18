// Подключение функционала "Чертогов Фрилансера"
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

const header = document.querySelector('header.header');
const headerHeight =
	(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) * 16) /
	2;
const sections = Array.from(document.querySelectorAll('section._dark')).map(item => [
	item.offsetTop,
	item.offsetTop + item.offsetHeight,
]);

const viewHeight = window.innerHeight;
const changeHeader = function () {
	let scrolled = window.scrollY + headerHeight;
	for (let i = 0; i < sections.length; i++) {
		if (scrolled >= sections[i][0] && scrolled <= sections[i][1]) {
			header.classList.contains('header--light') || header.classList.add('header--light');
			break;
		} else if (
			(i == sections.length - 1 && scrolled <= sections[i][0]) ||
			scrolled >= sections[i][1]
		) {
			header.classList.contains('header--light') && header.classList.remove('header--light');
		}
	}
};
window.addEventListener('scroll', changeHeader);

const topButton = document.querySelector('button[data-top]');
topButton.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
});
