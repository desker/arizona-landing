import $ from 'jquery';
import 'slick-carousel';

class Portfolio {
	init() {
		$('.js-portfolio-carousel').slick({
			arrows: false,
			dots: true,
			dotsClass: 'portfolio__nav',
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	}
}

export default new Portfolio();
