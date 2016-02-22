(function($){

	/* ---------------------------------- *\
					打 字 機
	\* ---------------------------------- */

	var _currentNumber = 0;
	var settings;

	var _inHTMLTag = false;

	$.fn.typewriting = function( input_string, options, callback_func ) {

		// Get the height of cursor should be
		this.text('A');
		const cursorHeight = this.height();
		this.text('');

		// Store setting and function from user
		settings = $.extend({
			typing_interval	: 150,
			blink_interval	: '0.7s',
			cursor_color	: 'black',
			inputString 	: '',
			init_callback	: function(){},
			rewrite_callback: function(){},
			task			: 'unready',
		}, options);

		// Handle inputString ---required
		if( input_string ) {
			if( typeof input_string == 'string' )
				settings.inputString = input_string;
			else
				throw new Error(`${input_string} is not a string`);
		}
		else
			throw new Error('Missing argument: String');

		// Handle callback
		if( callback_func ) {
			if( typeof callback_func == 'function' )
				settings.init_callback = callback_func;
			else
				throw new Error(`${callback_func} is not a function`);
		} else
			settings.init_callback = function(){};

		// Add cursor style in HEAD
		$('head').append( `<style type='text/css'>@-webkit-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@-moz-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}.typingCursor::after{content:'';width:10px;height:${cursorHeight}px;margin-left:5px;display:inline-block;vertical-align:bottom;background-color:${settings.cursor_color};-webkit-animation:blink ${settings.blink_interval} infinite;-moz-animation:blink ${settings.blink_interval} infinite;animation:blink ${settings.blink_interval} infinite}</style>` );

		settings.task = 'typing';
		_typingGo( this.addClass('typingCursor'), 'init' );

	};

	$.fn.rewrite = function( input_string, callback_func ) {

		// Handle inputString ---required
		if( input_string ) {
			if( typeof input_string == 'string' )
				settings.inputString = input_string;
			else
				throw new Error(`${input_string} is not a string`);
		}
		else
			throw new Error('Missing argument: String');

		// Handle callback
		if( callback_func ) {
			if( typeof callback_func == 'function' )
				settings.rewrite_callback = callback_func;
			else
				throw new Error(`${callback_func} is not a function`);
		}
		else
			settings.rewrite_callback = function(){};

		if( settings.task == 'typing' ) {
			console.warn( 'Last task is not finished yet.' );
		}

		settings.task = 'typing';
		_typingGo( this, 'rewrite' );

	}

	function _typingGo( target, _from ) {

		if( _currentNumber <= settings.inputString.length ) {

			const thisText = _getText();

			if( thisText.slice(-1) == '<' ) {
				_inHTMLTag = true;
			}
			else if( thisText.slice(-1) == '>' ) {
				_inHTMLTag = false;
			}

			target.html( thisText );

			if( _inHTMLTag )
				_typingGo( target, _from );
			else {
				setTimeout( function() {
					_typingGo( target, _from );
				}, settings.typing_interval);
			}

		}
		else {
			settings.task = 'ready';
			_currentNumber = 0;
			if( _from == 'init' )
				settings.init_callback.call(this);
			else
				settings.rewrite_callback.call(this);
		}
	}

	function _getText() {
		return settings.inputString.slice( 0, ++_currentNumber );
	}

}(jQuery));

