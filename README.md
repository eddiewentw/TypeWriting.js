<h2>TypeWriting.js</h2>

If you want to make the typeing effect, this is what you need.

[DEMO page](http://eddiewen-taiwan.github.io/typewriting.js/)

******************************

<h4>First Function - typewriting()</h4>

Put the text as first parameter.

With second parameter, you can set some options.

<ul>
	<li>typing_interval: the interval between each text</li>
	<li>blink_interval: the interval of the cursor blinks</li>
	<li>cursor_color: the color of the cursor</li>
</ul>

Third parameter is the function after typing effect.

```javascript

$('.string').typewriting( "Text here", {
	"typing_interval": 300,
	"blink_interval": "1.5s"
	"cursor_color": "white"
}, function() {
	console.log( "End." );
});

```

<h4>Second Function - rewrite()</h4>

You could use this function to do the same effect but different text at same element.

```javascript

$('.string').rewrite( "Another text here", function() {
	console.log( "End, 2." );
});

```
