<h2>TypeWriting.js</h2>

[DEMO page](http://eddiewen-taiwan.github.io/typewriting/)

```javascript

$('.string').typewriting( "Text here", {
	"typing_interval": 300,
	"blink_interval": "1.5s"
	"cursor_color": "white"
}, function() {
	console.log( "Do this function after typing" );
});

```

```javascript

$('.string').rewrite( "Another text here", function() {
	console.log( "Ya" );
});

```
