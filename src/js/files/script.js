// Подключение функционала "Чертогов Фрилансера"
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

const header = document.querySelector('header.header');
const headerHeight =
	(-parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) *
		16) /
	2;
const sections = document.querySelectorAll('section._dark');

const config = {
	root: null,
	rootMargin: `${headerHeight}px 0px 0px 0px`,
	threshold: 0.9,
};

let observer = new IntersectionObserver(function (entries) {
	entries.forEach(entry => {
		observerCallback(entry);
	});
}, config);
console.log(observer);

function observerCallback(entry) {
	if (entry.isIntersecting) {
		header.classList.add('header--light');
	} else {
		header.classList.remove('header--light');
	}
}

sections.forEach(item => {
	observer.observe(item);
});
