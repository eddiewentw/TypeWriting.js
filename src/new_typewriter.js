(function() {
	
	this.TypeWriter = function( options, callback_func ) {

		// global variables
		this._currentNumber = 0;
		this._inHTMLTag = false;

		var settings = {
			targetElement	: null,
			typing_interval	: 150,
			blink_interval	: '0.7s',
			cursor_color	: 'black',
			inputString 	: '',
			tw_callback		: function(){},
			task			: 'unready',
		}
		if( options && typeof options === "object" ) {
			this.settings = extendDefaults(settings, options);
		}

		// check inputString ---required
		if( options.inputString ) {
			if( typeof options.inputString !== 'string' )
				throw new Error(`${options.inputString} is not a string`);
		}
		else
			throw new Error('Missing argument: String');

		// check callback
		if( callback_func ) {
			if( typeof callback_func === 'function' )
				this.settings.tw_callback = callback_func;
			else {
				console.error(`${callback_func} is not a function`);
				_cleanCallback.call(this);
			}
		} else
			_cleanCallback.call(this);

		// get the height of cursor should be
		const cursorHeight = this.settings.targetElement.offsetHeight;
		const cursorWidth = parseInt(cursorHeight/3);

		// prepare cursor style
		const head = document.head;
		const cssStyle = `@-webkit-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@-moz-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}.typingCursor::after{content:'';width:${cursorWidth}px;height:${cursorHeight}px;margin-left:5px;display:inline-block;vertical-align:bottom;background-color:${settings.cursor_color};-webkit-animation:blink ${settings.blink_interval} infinite;-moz-animation:blink ${settings.blink_interval} infinite;animation:blink ${settings.blink_interval} infinite}`;
		var styleNode = document.createElement('style');
			styleNode.type = 'text/css';
		if( styleNode.styleSheet )
			styleNode.styleSheet.cssText = cssStyle;
		else
			styleNode.appendChild(document.createTextNode(cssStyle));
		// add CSS style in HEAD
		head.appendChild(styleNode);

		this.settings.targetElement.className += 'typingCursor';
		this.settings.task = 'typing';
		_typingGo.call(this);

	}

	TypeWriter.prototype.rewrite = function( input_string, callback_func ) {

		if( this.settings.task == 'typing' ) {
			console.warn( 'Last task is not finished yet.' );
			setTimeout( function() {
				this.rewrite( input_string, callback_func );
			}.bind(this), this.settings.typing_interval );
		}
		else {
			// Handle inputString ---required
			if( input_string ) {
				if( typeof input_string == 'string' )
					this.settings.inputString = input_string;
				else
					console.error(`${input_string} is not a string`);
			}
			else
				throw new Error('Missing argument: String');

			// Handle callback
			if( callback_func ) {
				if( typeof callback_func == 'function' )
					this.settings.tw_callback = callback_func;
				else {
					throw new Error(`${callback_func} is not a function`);
					_cleanCallback.call(this);
				}
			}
			else
				_cleanCallback.call(this);

			this.settings.task = 'typing';
			_typingGo.call(this);
		}

	}

	function _typingGo() {

		if( this._currentNumber < this.settings.inputString.length ) {

			const thisText = _getText.call(this);

			if( thisText.slice(-1) == '<' ) {
				this._inHTMLTag = true;
			}
			else if( thisText.slice(-1) == '>' ) {
				this._inHTMLTag = false;
			}

			this.settings.targetElement.innerHTML = thisText;

			if( this._inHTMLTag )
				_typingGo.call(this);
			else {
				setTimeout( function() {
					_typingGo.call(this);
				}.bind(this), this.settings.typing_interval);
			}

		}
		else {
			this.settings.task = 'ready';
			this._currentNumber = 0;
			this.settings.tw_callback.call(this);
		}

	}

	function _getText() {
		return this.settings.inputString.slice( 0, ++this._currentNumber );
	}

	function _cleanCallback() {
		this.settings.tw_callback = function(){};
	}

	// Utility method to extend defaults with user options
	function extendDefaults(source, properties) {
		var property;
		for( property in properties ) {
			if( properties.hasOwnProperty(property) ) {
				source[property] = properties[property];
			}
		}
		return source;
	}

}());