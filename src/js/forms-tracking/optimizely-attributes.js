import { getCookie, getParameterByName } from '../theme/functions';

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
		'track',
	];

	const trackingObject = {};

	utmParams.forEach( utmName => {
		const utmCookie = getCookie( utmName + '1' );
		const utmParam  = getParameterByName( utmName );
		const utmValue  = utmCookie || utmParam;

		trackingObject[ utmName ] = utmValue;
	} );

	w.optimizely.push( {
		type: 'user',
		attributes: trackingObject,
	} );
} )( window );
