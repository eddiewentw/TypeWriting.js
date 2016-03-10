## TypeWriting.js

If you want to make the typeing effect, this is what you need.

[TypeWriting DEMO](http://github.eddiewen.me/TypeWriting.js/)

_Note: TypeWriting.js doesn't depend on jQuery since version 1.2. If you want to keep the old version, please check another branch - [jQuery-v1.1.3](https://github.com/EddieWen-Taiwan/TypeWriting.js/tree/jQuery-v1.1.3)._

----
### Installation

Just clone or download the zip of this repository

or via [npm](https://www.npmjs.com/package/typewriting):

~~~shell
npm install --save typewriting
~~~

### Setup

~~~html
<!-- just typewriting.js or .min.js -->
<script type="text/javascript" src="path/to/typewriting.min.js"></script>
~~~

I use the height of targetElement to set the cursor height. You could use its line-height to control cursor height. 

----

### `Init`

~~Put the text you want as first parameter.  
With second parameter, you can set some options.~~

* typing_interval: the interval between each character
* blink_interval: the interval of the cursor blinks
* cursor_color: the color of the cursor

Third parameter is the function after typing effect.

~~~javascript
const typewriter = new TypeWriting({
	targetElement	: document.getElementsByClassName('terminal')[0],
	inputString		: 'Hello, world.',
	typing_interval	: 130,
	blink_interval	: '1s',
	cursor_color	: '#00fd55',
}, function() {
	console.log("END");
});
~~~

### `rewrite()`

You could use this function to do the same effect but different text at same element.

~~~javascript
typewriter.rewrite( "This is TypeWriting.js", function() {
	console.log("Rewrite is finished");
});
~~~
