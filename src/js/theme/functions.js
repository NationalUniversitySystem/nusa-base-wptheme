/* eslint-disable no-unused-vars */
/**
 * Gets the parameter from the URL
 *
 * @param {string} parameterName Name of the parameter we are trying to fetch.
 */
export const getParameterByName = function( parameterName ) {
	parameterName = parameterName.replace( /[[]/, '\\[' ).replace( /[\]]/, '\\]' );

	const regex   = new RegExp( '[\\?&]' + parameterName + '=([^&#]*)' );
	const results = regex.exec( location.search );

	return results === null ? '' : decodeURIComponent( results[ 1 ].replace( /\+/g, ' ' ) );
};

export const getCookie = function( cookieName ) {
	const name        = cookieName + '=';
	const cookieArray = document.cookie.split( ';' );

	for ( let i = 0; i < cookieArray.length; i++ ) {
		let c = cookieArray[ i ];
		while ( c.charAt( 0 ) === ' ' ) {
			c = c.substring( 1 );
		}
		if ( c.indexOf( name ) === 0 ) {
			return c.substring( name.length, c.length );
		}
	}
	return '';
};

export const getDomain = function() {
	const hostName = location.host;
	let domain = hostName;

	if ( hostName !== null ) {
		const parts = hostName.split( '.' ).reverse();

		if ( parts !== null && parts.length > 1 ) {
			domain = '.' + parts[ 1 ] + '.' + parts[ 0 ];
		}
	}

	return domain;
};

/**
 * Set the value of an input element
 *
 * @param {string} inputSelector Input you want to set a value for (or parent of input).
 * @param {string} inputValue Value we are setting for the in put.
 * @param {HTMLElement} inputParent The parent of the input in order to narrow the selection (should probably be a form dom element).
 */
export const setInputValue = function( inputSelector, inputValue, inputParent ) {
	if ( 'undefined' === typeof inputParent ) {
		inputParent = document;
	}

	// Check the input selector exists.
	let element = inputParent.querySelector( inputSelector );

	// Make sure there is only one of the inputSelector and there was a value to set.
	if ( null === element || 'undefined' === typeof inputValue || '' === inputValue ) {
		return;
	} else if ( element.length > 1 ) {
		element = element[ 0 ];
	}

	// Make sure the input selector is an actual INPUT tag type, if not, use it to find it inside itself.
	if ( element.tagName !== 'INPUT' ) { // tagName always returns the tag name in capital letters.
		element = element.querySelector( 'input' );
	}

	// Set the value.
	element.value = inputValue;
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Credit to: https://davidwalsh.name/javascript-debounce-function
export const debounce = function( func, wait, immediate ) {
	let timeout;
	return function() {
		const context = this;
		const args = arguments;
		const later = function() {
			timeout = null;
			if ( ! immediate ) {
				func.apply( context, args );
			}
		};
		const callNow = immediate && ! timeout;
		clearTimeout( timeout );
		timeout = setTimeout( later, wait );
		if ( callNow ) {
			func.apply( context, args );
		}
	};
};

/**
 * Get a specific class based on a comma separated string
 *
 * @param {string} classPartial Partial class name to search classList for
 * @param {string} classList String of classes
 */
export const getClass = function( classPartial, classList ) {
	// Incase an array is passed in.
	if ( 'string' === typeof classList ) {
		classList = classList.split( ' ' );
	}

	let theClass = '';

	classList.forEach( singleClass => {
		if ( singleClass.includes( classPartial ) ) {
			theClass = singleClass;
		}
	} );

	return theClass;
};
