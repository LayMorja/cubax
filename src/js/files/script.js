// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

//* Jquery ====================================================================================================

// Main Page
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

// All pages
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

// Inner pages
$('.projects__slider').slick({
	slidesToShow: 2.8,
	slidesToScroll: 1,
	prevArrow: '.projects__slider-prev',
	nextArrow: '.projects__slider-next',
	loop: true,
	responsive: [
		{
			breakpoint: 1366,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				variableWidth: true,
			},
		},
	],
});

document.addEventListener('DOMContentLoaded', () => {
	if (window.innerWidth <= 639.98) {
		$('.variants__list').css('display', 'block');
		$('.variants__list').slick({
			loop: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: false,
			nextArrow: '.variants__next',
		});
	}
});

//* Vanilla JS ====================================================================================================

// Header color on scroll
const header = document.querySelector('header.header');
const headerHeight =
	(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) * 16) /
	2;
let sections = Array.from(document.querySelectorAll('section._dark')).map(item => [
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
window.addEventListener('resize', () => {
	sections = Array.from(document.querySelectorAll('section._dark')).map(item => [
		item.offsetTop,
		item.offsetTop + item.offsetHeight,
	]);
});
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
