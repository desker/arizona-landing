import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import modal from '../blocks/modal';
import header from '../blocks/header';
import input from '../blocks/input';
import portfolio from '../blocks/portfolio';
import searchQueries from '../blocks/search-queries';
import team from '../blocks/team';

$(() => {
	svg4everybody();
	header.init();
	portfolio.init();
	searchQueries.init();
	team.init();

	modal.init();
	input.init();
	$('input[name=nav]').change(function (e) {
		const value = e.target.value;
		$('.js-layer-icon').attr('data-icon-checked', value);
	});

	$('.js-work-expand').on('click', function () {
		$('.work-stages__stage').addClass('visible');
	});
});
