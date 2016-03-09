(function() {
	
	this.TypeWriter = function() {

		this._currentNumber = 0;
		this._inHTMLTag = false;

		var defaults = {
			typing_interval	: 150,
			blink_interval	: '0.7s',
			cursor_color	: 'black',
			inputString 	: '',
			tw_callback		: function(){},
			task			: 'unready',
		}
		if( arguments[0] && typeof arguments[0] === "object" ) {
			this.options = extendDefaults(defaults, arguments[0]);
		}

	}

	TypeWriter.prototype.rewrite = function() {
		console.log(defaults);
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