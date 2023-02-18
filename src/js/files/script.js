// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

if (!isMobile.any()) {
	$('._tilt').tilt({ scale: 1.05, speed: 1000, perspective: 800 });
}

$('.preview__big-slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.preview__mini-slider',
});
$('.preview__mini-slider').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	asNavFor: '.preview__big-slider',
	focusOnSelect: true,
	arrows: false,
});

const header = document.querySelector('header.header');
const headerHeight =
	(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) * 16) /
	2;
const sections = Array.from(document.querySelectorAll('section._dark')).map(item => [
	item.offsetTop,
	item.offsetTop + item.offsetHeight,
]);

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

const topButton = document.querySelectorAll('button[data-top]');
topButton.forEach(button => {
	button.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	});
});
