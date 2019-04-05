/* global getDomain, getCookie, getParameterByName */
/* eslint-disable complexity */
// Setup all process trackers
( function() {
	var cookieDomain = getDomain();

	// Set initial referrer
	var initialReferrerCookie = getCookie( 'initialReferrer' );

	if ( '' === initialReferrerCookie && '' !== document.referrer ) {
		initialReferrerCookie = document.referrer;
		document.cookie = 'initialReferrer=' + initialReferrerCookie + '; path=/; Domain=' + cookieDomain;
	}

	var domainRegEx = /^(http|https):\/\/([a-zA-Z0-9\-\.]|)+(bing|yahoo|google|duckduckgo|ask|aol|startpage|excite|lycos)+\.([a-z][a-z][a-z])((\s|\/)([^\r\n]*))?$/ig; // eslint-disable-line no-useless-escape
	var domainMatch = domainRegEx.test( initialReferrerCookie );

	// If we came in from one of the domain we want to capture,
	// set a cookie for the original landing page and the referrer.
	if ( domainMatch ) {
		var domainMatchUrlCookie = getCookie( 'referringDomain' );
		if ( '' === domainMatchUrlCookie ) {
			document.cookie = 'referringDomain=' + initialReferrerCookie.match( domainRegEx ) + '; path=/; Domain=' + cookieDomain;
		}

		var landingPageCookie = getCookie( 'initialLandingPage' );
		if ( '' === landingPageCookie ) {
			document.cookie = 'initialLandingPage=' + location.href + '; path=/; Domain=' + cookieDomain;
		}
	}

	var source   = getParameterByName( 'utm_source' );
	var medium   = getParameterByName( 'utm_medium' );
	var term     = getParameterByName( 'utm_term' );
	var content  = getParameterByName( 'utm_content' );
	var campaign = getParameterByName( 'utm_campaign' );
	var track    = getParameterByName( 'track' );

	var exDate = new Date();
	exDate.setDate( exDate.getDate() + 30 );
	var ending2 = exDate.toUTCString();

	if ( source !== '' || medium !== '' || term !== '' || content !== '' || campaign !== '' || track !== '' ) {
		document.cookie = 'utm_source1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_medium1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_term1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_content1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_campaign1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'track1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;

		if ( source !== '' ) {
			document.cookie = 'utm_source1=' + source + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		}
		if ( medium !== '' ) {
			document.cookie = 'utm_medium1=' + medium + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		}
		if ( term !== '' ) {
			document.cookie = 'utm_term1=' + term + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		}
		if ( content !== '' ) {
			document.cookie = 'utm_content1=' + content + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		}
		if ( campaign !== '' ) {
			document.cookie = 'utm_campaign1=' + campaign + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		}
		if ( track !== '' ) {
			document.cookie = 'track1=' + track + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		}

	} else if ( domainMatch === true ) {
		// console.log('organic');
		document.cookie = 'utm_source1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_medium1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_term1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_content1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_campaign1=; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'track1=OrganicSearch; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'organicCookie=OrganicSearch; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;

	} else {
		var cSource1   = getCookie( 'utm_source1' );
		var cMedium1   = getCookie( 'utm_medium1' );
		var cTerm1     = getCookie( 'utm_term1' );
		var cContent1  = getCookie( 'utm_content1' );
		var cCampaign1 = getCookie( 'utm_campaign1' );
		var cTrack1    = getCookie( 'track1' );

		if ( cSource1 !== '' || cMedium1 !== '' || cTerm1 !== '' || cContent1 !== '' || cCampaign1 !== '' || cTrack1 !== '' ) {
			document.cookie = 'utm_source1=' + cSource1 + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_medium1=' + cMedium1 + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_term1=' + cTerm1 + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_content1=' + cContent1 + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_campaign1=' + cCampaign1 + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'track1=' + cTrack1 + '; expires=' + ending2 + '; path=/; Domain=' + cookieDomain;
		}
	}
} )();
