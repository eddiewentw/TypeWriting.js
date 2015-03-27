(function($){

	/* ---------------------------------- *\
					打 字 機
	\* ---------------------------------- */

	var classModel = '<style type="text/css"> @-webkit-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } </style>';
	var inputString = "";
	var currentNumber = 1;
	var setting;

	$.fn.typewriting = function( input_string, options, callback_func ) {

		$('head').append( classModel );

		inputString = input_string;

		setting = $.extend({
			typing_interval: 150
		}, options);

		// while( currentNumber <= inputString.length ) {

		// 	var this

		// }

	};

	function typingGo() {

		

		setTimeout( function(){
			typingGo();
		}, setting.typing_interval);

	}

	function getText( string ) {

		var returnString = string.slice( 0, currentNumber );
		currentNumber++;
		return returnString

	}

}(jQuery));

