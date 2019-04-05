/* global getCookie, getParameterByName, setInputValue, MobileDetect */
/* eslint-disable complexity */
// Setup all process trackers
( function() {
	var sourceCookie   = getCookie( 'utm_source1' );
	var mediumCookie   = getCookie( 'utm_medium1' );
	var termCookie     = getCookie( 'utm_term1' );
	var contentCookie  = getCookie( 'utm_content1' );
	var campaignCookie = getCookie( 'utm_campaign1' );
	var trackCookie    = getCookie( 'track1' );

	var sourceParam   = getParameterByName( 'utm_source' );
	var mediumParam   = getParameterByName( 'utm_medium' );
	var termParam     = getParameterByName( 'utm_term' );
	var contentParam  = getParameterByName( 'utm_content' );
	var campaignParam = getParameterByName( 'utm_campaign' );
	var trackParam    = getParameterByName( 'track' );

	var domainMatchUrlCookie = getCookie( 'referringDomain' );
	var landingPageCookie    = getCookie( 'initialLandingPage' );

	/**
	 * Reworked to make sense from file provided by previous Dev team
	 * Checks and sets the field inputs' values based on either the cookie set, or the parameter as fallback (Recommendations to make sure server side cookies don't fail)
	 */
	var forms = document.querySelectorAll( 'form' );

	for ( var i = 0; i < forms.length; i++ ) {

		var theForm = forms[ i ];

		// Set values for each input, giving cookies that are set priority over the parameters.
		if ( '' !== sourceCookie || '' !== sourceParam ) {
			var sourceValue = sourceCookie || sourceParam;
			setInputValue( '.utm_source', sourceValue, theForm );
		}

		if ( '' !== mediumCookie || '' !== mediumParam ) {
			var mediumValue = mediumCookie || mediumParam;
			setInputValue( '.utm_medium', mediumValue, theForm );
		}

		if ( '' !== termCookie || '' !== termParam ) {
			var termValue = termCookie || termParam;
			setInputValue( '.utm_term', termValue, theForm );
		}

		if ( '' !== contentCookie || '' !== contentParam ) {
			var contentValue = contentCookie || contentParam;
			setInputValue( '.utm_content', contentValue, theForm );
		}

		if ( '' !== campaignCookie || '' !== campaignParam ) {
			var campaignValue = campaignCookie || campaignParam;
			setInputValue( '.utm_campaign', campaignValue, theForm );
		}

		if ( '' !== trackCookie || '' !== trackParam ) {
			var trackValue = trackCookie || trackParam;
			setInputValue( '.track', trackValue, theForm );
		}

		// No need to check the parameters for these
		if ( '' !== domainMatchUrlCookie ) {
			setInputValue( '.referring_domain', domainMatchUrlCookie, theForm );
		}

		if ( '' !== landingPageCookie ) {
			setInputValue( '.landing_page', landingPageCookie, theForm );
		}

		// Determine our device type and track it
		if ( 'undefined' !== typeof MobileDetect ) {
			var mobileDetect = new MobileDetect( window.navigator.userAgent );
			var deviceType   = mobileDetect.phone() || ( mobileDetect.tablet() || 'desktop' );

			setInputValue( '.device_type', deviceType, theForm );
		}

	}
} )();
