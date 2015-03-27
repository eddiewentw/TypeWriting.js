(function($){

	/* ---------------------------------- *\
					打 字 機
	\* ---------------------------------- */

	var classModel = '<style type="text/css"> @-webkit-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } </style>';
	var inputString = "";
	var currentNumber = 1;
	var setting;
	var inHtmlTag;
	var target;

	$.fn.typewriting = function( input_string, options, callback_func ) {

		$('head').append( classModel );

		inputString = input_string;
		target = this;

		setting = $.extend({
			typing_interval: 150
		}, options);

		typingGo();

	};

	function typingGo() {

		if( currentNumber <= inputString.length ) {

			var thisText = getText();

			if( thisText.slice(-1) == "<" ) inHtmlTag = true;
			if( thisText.slice(-1) == ">" ) inHtmlTag = false;

			target.html( thisText );

			if( inHtmlTag )
				typingGo();
			else
				setTimeout( function(){
					typingGo();
				}, setting.typing_interval);

		}

	}

	function getText() {

		var returnString = inputString.slice( 0, currentNumber );
		currentNumber++;
		return returnString

	}

}(jQuery));

