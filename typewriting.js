(function($){

	/* ---------------------------------- *\
					打 字 機
	\* ---------------------------------- */

	var currentNumber = 0;
	var setting;

	var inHtmlTag;

	$.fn.typewriting = function( input_string, options, callback_func ) {

		// Get the height of cursor should be
		this.text('A');
		var cursorHeight = this.height();
		this.text('');

		// Store setting and function from user
		setting = $.extend({
			typing_interval	: 150,
			blink_interval	: '0.7s',
			cursor_color	: 'black',
			inputString 	: '',
			callback 		: function(){},
		}, options);

		// Handle inputString ---required
		if( input_string ) {
			if( typeof input_string == 'string' ) {
				setting.inputString = input_string;
			}
			else {
				throw new Error(`${input_string} is not a string`);
			}
		}
		else {
			throw new Error('Missing argument: String');
		}

		// Handle callback
		if( callback_func ) {
			if( typeof callback_func == 'function' ) {
				setting.callback = callback_func;
			}
			else {
				throw new Error(`${callback_func} is not a function`);
			}
		}

		// Add cursor style in HEAD
		$('head').append( `<style type='text/css'>@-webkit-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@-moz-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}.typingCursor::after{content:'';width:10px;height:${cursorHeight}px;margin-left:5px;display:inline-block;vertical-align:bottom;background-color:${setting.cursor_color};-webkit-animation:blink ${setting.blink_interval} infinite;-moz-animation:blink ${setting.blink_interval} infinite;animation:blink ${setting.blink_interval} infinite}</style>` );

		_typingGo( this.addClass('typingCursor') );

	};

	$.fn.rewrite = function( input_string, callback_func ) {

		// Store setting and function from user
		currentNumber = 0;
		setting.inputString = input_string;
		setting.callback = callback_func;

		_typingGo( this );

	}

	function _typingGo( target ) {

		if( currentNumber <= setting.inputString.length ) {

			var thisText = _getText();
			var inHtmlTag = false;

			if( thisText.slice(-1) == '<' ) {
				inHtmlTag = true;
			}
			else if( thisText.slice(-1) == '>' ) {
				inHtmlTag = false;
			}

			target.html( thisText );

			if( inHtmlTag )
				_typingGo( target );
			else {
				setTimeout( function(){
					_typingGo( target );
				}, setting.typing_interval);
			}

		}
		else {
			setting.callback.call(this);
		}
	}

	function _getText() {
		return setting.inputString.slice( 0, ++currentNumber );
	}

}(jQuery));

