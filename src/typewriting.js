/*!
 * TypeWriting.js
 *
 * Copyright © 2015 Eddie Wen | MIT license
 * https://github.com/EddieWen-Taiwan/TypeWriting.js
 */

(function(root, factory) {
	'use strict';
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	root.TypeWriting = factory()
}(this, function() {
	'use strict';

	var _currentNumber = 0,
	_inHTMLTag = false,

	defaults = {
		targetElement	: null,
		inputString 	: '',
		typing_interval	: 150,
		blink_interval	: '0.7s',
		cursor_color	: 'black',
		tw_callback		: function(){},
		task			: 'unready',
	},

	_typingGo = function() {

		if( _currentNumber < defaults.inputString.length ) {

			var thisText = _getText();

			if( thisText.slice(-1) == '<' ) {
				_inHTMLTag = true;
			}
			else if( thisText.slice(-1) == '>' ) {
				_inHTMLTag = false;
			}

			defaults.targetElement.innerHTML = thisText;

			if( _inHTMLTag )
				_typingGo();
			else {
				setTimeout( function() {
					_typingGo();
				}, defaults.typing_interval);
			}

		}
		else {
			defaults.task = 'ready';
			_currentNumber = 0;
			defaults.tw_callback.call();
		}

	},

	_getText = function() {
		return defaults.inputString.slice( 0, ++_currentNumber );
	},

	_cleanCallback = function() {
		defaults.tw_callback = function(){};
	},

	// Utility method to extend defaults with user options
	extendDefaults = function(source, properties) {
		var property;
		for( property in properties ) {
			if( properties.hasOwnProperty(property) ) {
				source[property] = properties[property];
			}
		}
		return source;
	};

	/**
	 * TypeWriting constructor
	 */
	var TypeWriting = function(options, callback_func) {

		if( options && typeof options === "object" ) {
			defaults = extendDefaults(defaults, options);
		}

		/**
		 * check value from user
		 * the string will be put in target later
		 */
		if( options.inputString ) {
			if( typeof options.inputString !== 'string' )
				throw new Error(options.inputString+' is not a string');
		}
		else
			throw new Error('Missing argument: inputString');

		/**
		 * callback function
		 */
		if( callback_func ) {
			if( typeof callback_func === 'function' )
				defaults.tw_callback = callback_func;
			else {
				console.error(callback_func+' is not a function');
				_cleanCallback();
			}
		}
		else
			_cleanCallback();

		/**
		 * Calculate proper size of cursor
		 * by inserting a new inline-element with `I`
		 */
		var calcDiv = document.createElement('div');
			calcDiv.style.display = 'inline-block';
			calcDiv.innerHTML = 'I';
		defaults.targetElement.appendChild(calcDiv);
		var cursorHeight = calcDiv.offsetHeight;
		var cursorWidth = calcDiv.offsetWidth;
		defaults.targetElement.removeChild(calcDiv);

		// prepare cursor style
		var cssStyle = '@-webkit-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@-moz-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}.typingCursor::after{content:\'\';width:'+cursorWidth+'px;height:'+cursorHeight+'px;margin-left:5px;display:inline-block;vertical-align:bottom;background-color:'+defaults.cursor_color+';-webkit-animation:blink '+defaults.blink_interval+' infinite;-moz-animation:blink '+defaults.blink_interval+' infinite;animation:blink '+defaults.blink_interval+' infinite}';
		var styleNode = document.createElement('style');
			styleNode.type = 'text/css';
		if( styleNode.styleSheet )
			styleNode.styleSheet.cssText = cssStyle;
		else
			styleNode.appendChild(document.createTextNode(cssStyle));
		// add CSS style in HEAD
		document.head.appendChild(styleNode);

		defaults.targetElement.className += ' typingCursor';
		defaults.task = 'typing';
		_typingGo();

	};

	/**
	 * public TypeWriting API :
	 */
	TypeWriting.prototype = {

		/**
		 * change the text on the same target
		 */
		rewrite: function(input_string, callback_func) {

			if( defaults.task == 'typing' ) {
				console.warn( 'Last task is not finished yet.' );
				setTimeout( function() {
					this.rewrite( input_string, callback_func );
				}.bind(this), defaults.typing_interval );
			}
			else {
				/**
				 * check value
				 * the string will be put in target later
				 */
				if( input_string ) {
					if( typeof input_string == 'string' )
						defaults.inputString = input_string;
					else
						throw new Error(input_string+' is not a string');
				}
				else
					throw new Error('Missing argument: inputString');

				/**
				 * callback function
				 */
				if( callback_func ) {
					if( typeof callback_func == 'function' )
						defaults.tw_callback = callback_func;
					else {
						console.error(callback_func+' is not a function');
						_cleanCallback();
					}
				}
				else
					_cleanCallback();

				defaults.task = 'typing';
				_typingGo();
			}

		}

	};

	return TypeWriting;

}));
