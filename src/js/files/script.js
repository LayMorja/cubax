// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

//* Jquery ====================================================================================================
if (!isMobile.any()) {
	$('._tilt').tilt({ scale: 1.05, speed: 1000, perspective: 800 });
}

$('.preview__big-slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	asNavFor: '.preview__mini-slider',
	centerMode: true,
});
$('.preview__mini-slider').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	asNavFor: '.preview__big-slider',
	focusOnSelect: true,
	arrows: false,
});

$('[data-fancy]').fancybox();

const sliderSelector = '.preview__big-slider .slick-slide:not(.slick-cloned)';
$().fancybox({
	selector: sliderSelector,
	backFocus: false,
	afterShow: function (instance, current) {
		current.opts.$orig
			.closest('.slick-initialized')
			.slick('slickGoTo', parseInt(current.index), true);
	},
});

//* Vanilla JS ====================================================================================================

// Header color on scroll
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

// Button "go-to-top"
const topButtons = document?.querySelectorAll('button[data-top]');
if (topButtons.length) {
	topButtons.forEach(button => {
		button.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		});
	});
}

// Butotn "scroll-to-next"
const scrollButton = document.querySelector('[data-bottom]');
if (scrollButton) {
	const section = document.querySelectorAll('section')[1];
	scrollButton.addEventListener('click', () => {
		window.scrollTo({
			top: section.offsetTop,
			left: 0,
			behavior: 'smooth',
		});
	});
}
