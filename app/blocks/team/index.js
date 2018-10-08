import $ from 'jquery';
import 'slick-carousel';

class Team {
	init() {
		this.isCarousel = false;
		this.switchWidth = 0;
		$('.js-team-person').each((i, item) => { this.switchWidth += $(item).outerWidth(true); });
		$('body').on('change', 'input[name="person"]', this.handleChangeItem.bind(this));
		this.initCarousel();
		$(window).resize(this.initCarousel.bind(this));
	}

	initCarousel() {
		if (this.isCarousel || !this.isNeedSlick()) {
			return;
		}
		const initialSlide = Number($('input[name="person"]:checked').val()) || 0;
		$('.js-team-carousel')
			.addClass('with-carousel')
			.on('afterChange', this.afterChangeSlide.bind(this))
			.on('destroy', this.onUnslick.bind(this))
			.slick({
				arrows: false,
				dots: false,
				slidesToShow: 1,
				centerPadding: '100px',
				centerMode: true,
				initialSlide,
				swipeToSlide: true,
				infinite: false,
				mobileFirst: true,
				responsive: [
					{
						breakpoint: this.switchWidth,
						settings: 'unslick'
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 3,
							centerPadding: '100px'
						}
					},
					{
						breakpoint: 400,
						settings: {
							slidesToShow: 3,
							centerPadding: '40px'
						}
					}
				]
			});
		this.isCarousel = true;
	}

	handleChangeItem(e) {
		const value = Number(e.target.value);
		if (this.isCarousel) {
			$('.js-team-carousel').slick('slickGoTo', value);
		}
	}

	afterChangeSlide(e, slick, slide) {
		if (!this.isCarousel) {
			return;
		}
		$(`input[name="person"][value="${slide}"]`).prop('checked', true);
	}

	onUnslick() {
		this.isCarousel = false;
		$('.js-team-carousel').removeClass('with-carousel');
	}

	isNeedSlick() {
		const $elem = $('.js-team-carousel');
		return $elem.width() < this.switchWidth;
	}
}

export default new Team();
