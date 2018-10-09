import $ from 'jquery';
import 'slick-carousel';

class SearchQueries {
	init() {
		$('.js-select-query').on('click', function () {
			$(this).removeClass('flash');
		});
		$('.js-select-query').change(this.handleChange);
	}

	handleChange(e) {
		const value = e.target.value;
		const id = `#${value}`;
		const selectedClass = 'searchQueries__image-outer_selected';
		$('.js-query-image').not(id).removeClass(selectedClass);
		$(id).addClass(selectedClass);
	}
}

export default new SearchQueries();
