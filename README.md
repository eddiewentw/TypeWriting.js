## TypeWriting.js

[![npm version](https://badge.fury.io/js/typewriting.svg)](https://badge.fury.io/js/typewriting)

![https://unsplash.com/photos/E0Spm6XXn2Y](cover.jpg)

If you want to make the typing effect, this is what you need.

[TypeWriting DEMO](http://github.eddiewen.me/TypeWriting.js/)

_Note: TypeWriting.js doesn't depend on jQuery since version 1.2. If you want to keep the old version, please check another branch - [jQuery-v1.1.3](https://github.com/EddieWen-Taiwan/TypeWriting.js/tree/jQuery-v1.1.3)._

----
### Installation

Just clone or download the zip of this repository

or via [npm](https://www.npmjs.com/package/typewriting):

~~~bash
$ yarn add typewriting

# $ npm install --save typewriting
~~~

### Setup

~~~html
<!-- just typewriting.js or .min.js -->
<script src='path/to/typewriting.min.js'></script>
~~~

or

~~~javascript
// import in your .js file
import TypeWriting from 'typewriting';
~~~

----

### `TypeWriting()`

* __targetElement__: _HTML element_ `required`  
Your element
* __inputString__: _String_ `required`  
Your text
* __typingInterval__: _Int_  
Interval between each character
* __blinkInterval__: _String_  
Interval of the cursor blinks
* __cursorColor__: _String_  
Color of the cursor

I use the height of targetElement to set the cursor height. You could use its line-height to control cursor height.

Second parameter is the function after typing effect.

~~~javascript
const typeWriting = new TypeWriting({
	targetElement   : document.getElementsByClassName('terminal')[0],
	inputString     : 'Hello, world.',
	typingInterval  : 130,
	blinkInterval   : '1s',
	cursorColor     : '#00fd55',
}, () => console.log('END'));
~~~

### `rewrite()`

You could use this function to do the same effect but different text at same element.

~~~javascript
typeWriting.rewrite('Welcome to TypeWriting.js', () => {
	console.log('Rewrite() is finished');
});
~~~
