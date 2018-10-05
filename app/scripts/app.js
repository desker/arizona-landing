import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import portfolio from '../blocks/portfolio';

$(() => {
	svg4everybody();
	portfolio.init();
});
