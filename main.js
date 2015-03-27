$(document).ready( function(){
	setTimeout( function(){
		$('.terminal').typewriting( "Hello World", {
			"typing_interval": 200,
			"blink_interval": "1s",
			"cursor_color": "#00fd55"
		}, function() {
			console.log( "END" );
		});
	}, 1000);
});

