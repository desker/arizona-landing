import $ from 'jquery';

class Modal {
	init() {
		$('body').on('click', '.js-show-modal', this.handleClickShow.bind(this));
		$('body').on('click', '.js-hide-modal', this.handleClickHide.bind(this));
	}

	showModal(id) {
		const $modal = $(`.js-modal${id}`);
		($modal.data('beforeShow') || []).map(item => typeof item.cb === 'function' && item.cb(item.elem, $modal));
		$modal.show({
			done() {
				$modal.addClass('modal_visible');
			}
		});
	}

	hideModal($modal) {
		$modal.removeClass('modal_visible');
		setTimeout(function () {
			$modal.hide();
		}, 300);
	}

	handleClickShow(e) {
		e.preventDefault();
		const id = $(e.currentTarget).attr('href');
		this.showModal(id);
	}

	handleClickHide(e) {
		e.preventDefault();
		const $modal = $(e.currentTarget).parents('.js-modal');
		this.hideModal($modal);
	}

	beforeShow(elem, cb) {
		const $el = $(elem);
		const $modal = $el.hasClass('js-modal') ? $el : $el.parents('.js-modal');
		if (!$modal.length) {
			return;
		}
		$modal.data('beforeShow', ($modal.data('beforeShow') || []).concat({cb, elem}));
	}
}

export default new Modal();
