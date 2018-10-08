import $ from 'jquery';
import Numbered from 'input.numbered';
import modal from '../modal';

class Input {
	init() {
		$('input[data-mask]').each(this.initNumbered);

		$('.js-form')
			.each((i, form) => modal.beforeShow(form, this.initForm.bind(this)))
			.on('submit', this.handleSubmit.bind(this));
		$('.js-form input').on('focus blur change input', this.validateField.bind(this));
	}

	initForm(form) {
		const $form = $(form).removeClass('submit-success submit-error');
		form.reset();
		const valid = {};
		$form.find('input').each(function (i, elem) {
			valid[elem.name] = this.isValid(elem);
		}.bind(this));
		this.updateValidFields($form, valid);
	}

	handleSubmit(e) {
		e.preventDefault();
		const $el = $(e.target);
		if ($el.hasClass('submitting')) {
			return;
		}

		const data = $el
			.addClass('submitting')
			.serializeArray()
			.reduce((acc, {name, value}) => ({...acc, [name]: value}), {});

		const options = {
			type: $el.attr('method') || 'GET',
			url: $el.attr('action'),
			data
		};

		$.ajax(options)
			.always(this.onSubmit.bind($el));
	}

	onSubmit(data, status, error) {
		const $form = this;
		$form.removeClass('submitting');
		if (status === 'success') {
			$form.addClass('submit-success');
		}else {
			$form.addClass('submit-error').attr('data-error', error);
		}
	}

	updateValidFields($form, fields = {}) {
		const data = {
			...($form.data('validFields') || {}),
			...fields
		};
		const valid = Object.keys(data).reduce((acc, key) => acc && data[key], true);
		$form
			.data('validFields', data)
			.toggleClass('invalid', !valid)
			.find('*[type="submit"]')
			.prop('disabled', !valid);
	}

	validateField(e) {
		const $form = $(e.target).parents('.js-form');
		const valid = {
			[e.target.name]: this.isValid(e.target)
		};
		this.updateValidFields($form, valid);
	}

	isValid(elem) {
		const $el = $(elem);
		let isValid = elem.checkValidity();
		if ($el.data('numbered')) {
			const validMask = $el.data('numbered').validate();
			isValid = $el.prop('required') ? validMask === 1 : validMask !== -1;
		}
		return isValid;
	}

	initNumbered() {
		const $el = $(this);
		const attrs = ['mask', 'numbered', 'empty', 'placeholder'];
		const options = attrs.reduce((acc, attr) => $el.attr(`data-${attr}`) ? ({
			...acc,
			[attr]: $el.attr(`data-${attr}`)
		}) : acc, {});

		const numbered = new Numbered($el, options);
		$el.data('numbered', numbered);
	}
}

export default new Input();
