## TYPEWRITING.js

If you want to make the typeing effect, this is what you need.

[TypeWriting DEMO](http://eddiewen-taiwan.github.io/typewriting.js/)

----

####typewriting()

Put the text as first parameter.

With second parameter, you can set some options.


* typing_interval: the interval between each text
* blink_interval: the interval of the cursor blinks
* cursor_color: the color of the cursor

Third parameter is the function after typing effect.

~~~javascript
$('.string').typewriting( "Text here", {
	"typing_interval": 300,
	"blink_interval": "1.5s"
	"cursor_color": "white"
}, function() {
	console.log( "End." );
});

~~~

####rewrite()

You could use this function to do the same effect but different text at same element.

~~~javascript
$('.string').rewrite( "Another text here", function() {
	console.log( "End, 2." );
});

~~~
