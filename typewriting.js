(function($){

	/* ---------------------------------- *\
					打 字 機
	\* ---------------------------------- */

	var classModel = '<style type="text/css"> @-webkit-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } </style>';

	$.fn.typewriting = function( input_string, options, callback_func ) {
;
		$('head').append( classModel );

		var setting = $.extend({
			typing_interval: 150
		}, options);

	};

	function keyIn( target, typingString ) {

		var typingStr = typingString.slice( 0, os_string_current ).replace( "A", "<br/>" );

		target.html( typingStr );
		os_string_current++;

		if( os_string_current <= typingString.length ) {
			setTimeout( function() {
				keyIn( target, typingString );
			}, typingInterval);
		}

	}

}(jQuery));

