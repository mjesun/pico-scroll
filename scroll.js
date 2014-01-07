function Scroll(element) {
	var main = element.querySelector('.js-scroll-main');
	var bar = element.querySelector('.js-scroll-bar');
	var handler = element.querySelector('.js-scroll-bar-handler');
	var resizeMain = element.querySelector('.js-scroll-resize-main');
	var resizeContent = element.querySelector('.js-scroll-resize-content');

	// Create custom events tight to the current instance.
	this._calculate = this._bind(this._calculate);
	this._scroll = this._bind(this._scroll);
	this._mouseDown = this._bind(this._mouseDown);
	this._mouseMove = this._bind(this._mouseMove);
	this._mouseUp = this._bind(this._mouseUp);

	// Cache references.
	this._main = main;
	this._bar = bar;
	this._handler = handler;

	// Calculate.
	this._calculate();

	// Resize events.
	if (resizeMain && resizeContent) {
		resizeMain.contentWindow['onresize'] = this._calculate;
		resizeContent.contentWindow['onresize'] = this._calculate;
	}

	// Common events.
	this._addEvent(handler, 'mousedown', this._mouseDown);
	this._addEvent(main, 'scroll', this._scroll);
}


Scroll.prototype = {
	_main: null,

	_bar: null,

	_handler: null,

	_diff: 0,

	_yStart: 0,

	_positionStart: 0,


	calculate: function() {
		this._calculate();
	},


	_bind: function(method) {
		var that = this;

		return function() {
			return method.apply(that, arguments);
		};
	},


	_addEvent: function(element, eventName, handler) {
		if (element.addEventListener) {
			element.addEventListener(eventName, handler);
		} else if (element.attachEvent) {
			element.attachEvent('on' + eventName, handler);
		}
	},


	_removeEvent: function(element, eventName, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(eventName, handler);
		} else if (element.detachEvent) {
			element.detachEvent('on' + eventName, handler);
		}
	},


	_calculate: function() {
		var barHeight = this._bar.offsetHeight;
		var scrollWidth = this._main.offsetWidth - this._main.clientWidth;
		var scrollHeight = this._main.scrollHeight;
		var scrollVisibleHeight = this._main.offsetHeight;
		var handlerHeight = Math.round(scrollVisibleHeight * barHeight / scrollHeight);

		this._main.style.marginRight = -scrollWidth + 'px';
		this._handler.style.height = handlerHeight + 'px';
		this._diff = (barHeight - handlerHeight) / (scrollHeight - scrollVisibleHeight);

		this._scroll();
	},


	_scroll: function() {
		this._handler.style.top = this._main.scrollTop * this._diff + 'px';
	},


	_mouseDown: function(evt) {
		this._addEvent(document, 'mousemove', this._mouseMove);
		this._addEvent(document, 'mouseup', this._mouseUp);
		this._addEvent(document, 'selectstart', this._preventDefault);

		this._yStart = evt.clientY;
		this._positionStart = this._main.scrollTop;
	},


	_mouseMove: function(evt) {
		this._main.scrollTop = this._positionStart + (evt.clientY - this._yStart) / this._diff;
	},


	_mouseUp: function() {
		this._removeEvent(document, 'mousemove', this._mouseMove);
		this._removeEvent(document, 'mouseup', this._mouseUp);
		this._removeEvent(document, 'selectstart', this._preventDefault);
	},


	_preventDefault: function(evt) {
		evt.preventDefault? evt.preventDefault() : evt.returnValue = false;
	}
};
