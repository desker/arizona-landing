import $ from 'jquery';

class Header {
	init() {
		$('body').on('click', '.js-header-nav', this.handleClick);
	}

	handleClick(e) {
		e.preventDefault();
		const $el = $(e.target);
		const id = $el.attr('href');
		const $target = $(id);
		if (!$target.length) {
			return;
		}
		const top = $target.offset().top;
		$('html, body').animate({scrollTop: top}, 600, function () {
			window.location.hash = id.substr(1);
		});
	}
}

export default new Header();
