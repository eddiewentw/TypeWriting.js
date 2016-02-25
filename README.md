## TypeWriting.js

If you want to make the typeing effect, this is what you need.

[TypeWriting DEMO](http://github.eddiewen.me/TypeWriting.js/)

----
### Installation

Just clone or download the zip of this repository

or via [npm](https://www.npmjs.com/package/typewriting):

~~~shell
npm install --save typewriting
~~~

### Setup

~~~html
<!-- jQuery -->
<script type="text/javascript" src="jquery.min.js"></script>
<!-- just typewriting.js or .min.js -->
<script type="text/javascript" src="path/to/typewriting.min.js"></script>
~~~

I use `$('.string').height` to set the cursor height. You could use its line-height to control cursor height. 

----

### `typewriting()`

Put the text you want as first parameter.  
With second parameter, you can set some options.

* typing_interval: the interval between each character
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

### `rewrite()`

You could use this function to do the same effect but different text at same element.

~~~javascript
$('.string').rewrite( "Another text here", function() {
	console.log( "End, 2." );
});
~~~
