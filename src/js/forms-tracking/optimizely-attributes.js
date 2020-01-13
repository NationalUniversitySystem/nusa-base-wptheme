/* global getCookie, getParameterByName */

/**
 * Push our UTM parameters to optimizely for tracking and data analysis.
 */
( function( w ) {
	w.optimizely = window.optimizely || [];

	const utmParams = [
		'utm_source',
		'utm_medium',
		'utm_term',
		'utm_content',
		'utm_campaign',
		'track'
	];

	let trackingObject = {};

	utmParams.forEach( ( utmName ) => {
		let utmCookie = getCookie( utmName + '1' );
		let utmParam  = getParameterByName( utmName );
		let utmValue  = utmCookie || utmParam;

		trackingObject[ utmName ] = utmValue;
	} );

	w.optimizely.push( {
		'type': 'user',
		'attributes': trackingObject
	} );
} )( window );
