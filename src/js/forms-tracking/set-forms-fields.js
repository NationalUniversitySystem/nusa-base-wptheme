/* eslint-disable complexity */
import { getCookie, getParameterByName, setInputValue } from '../theme/functions';
// Setup all process trackers.
( function() {
	const utmParams = [
		'utm_source',
		'utm_medium',
		'utm_term',
		'utm_content',
		'utm_campaign',
		'track',
	];

	const cookieParamSet = [
		'gclid',
		'_ga',
	];

	const cookieCheck = [
		'initial_referrer',
		'referring_domain',
		'initial_landing_page',
	];

	const forms = document.querySelectorAll( 'form' );

	forms.forEach( form => {
		// Set values for each input, giving cookies that are set priority over the parameters.
		// UTM parameters (cookie is stored with an appended "1").
		utmParams.forEach( utmName => {
			const utmCookie = getCookie( utmName + '1' );
			const utmParam  = getParameterByName( utmName );
			const utmValue  = utmCookie || utmParam;

			if ( '' !== utmValue ) {
				setInputValue( '.' + utmName, utmValue, form );
			}
		} );

		cookieParamSet.forEach( cookieParamName => {
			const cookieValue = getCookie( cookieParamName );
			const paramValue  = getParameterByName( cookieParamName );
			const inputValue  = cookieValue || paramValue;

			if ( '' !== inputValue ) {
				setInputValue( '.' + cookieParamName, inputValue, form );
			}
		} );

		// These values do not need parameter checked.
		cookieCheck.forEach( cookieName => {
			const cookieValue = getCookie( cookieName );

			if ( '' !== cookieValue ) {
				setInputValue( '.' + cookieName, cookieValue, form );
			}
		} );
	} );
} )();
