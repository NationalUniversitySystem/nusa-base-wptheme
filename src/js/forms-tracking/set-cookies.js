/* global getDomain, getCookie, getParameterByName */
/* eslint-disable complexity */
// Setup all process trackers
( function() {
	var cookieDomain = getDomain();

	// When a user first arrives to the site, track how and where they landed on the site.
	var initialReferrerCookie = getCookie( 'initial_referrer' );
	var landingPageCookie     = getCookie( 'initial_landing_page' );

	// Make sure this was not a direct visit or the referrer is not from the same URL.
	if ( '' === initialReferrerCookie && '' !== document.referrer && -1 === document.referrer.indexOf( location.protocol + '//' + location.host ) ) {
		initialReferrerCookie = document.referrer;
		document.cookie = 'initial_referrer=' + initialReferrerCookie + '; path=/; Domain=' + cookieDomain;
	}

	if ( '' === landingPageCookie ) {
		document.cookie = 'initial_landing_page=' + location.host + location.pathname + '; path=/; Domain=' + cookieDomain;
	}

	var domainRegEx = /^(http|https):\/\/([a-zA-Z0-9\-\.]|)+(bing|yahoo|google|duckduckgo|ask|aol|startpage|excite|lycos)+\.([a-z][a-z][a-z])((\s|\/)([^\r\n]*))?$/ig; // eslint-disable-line no-useless-escape
	var domainMatch = domainRegEx.test( initialReferrerCookie );

	// If the visitor landing on the site from one of the domain we want to capture,
	// set a cookie for the referrer's domain.
	if ( domainMatch ) {
		var domainMatchUrlCookie = getCookie( 'referringDomain' );
		if ( '' === domainMatchUrlCookie ) {
			document.cookie = 'referringDomain=' + initialReferrerCookie.match( domainRegEx ) + '; path=/; Domain=' + cookieDomain;
		}
	}

	// Set the gclid cookie.
	const gclidCookie = getCookie( 'gclid' );
	const gclidParam  = getParameterByName( 'gclid' );
	if ( '' === gclidCookie && '' !== gclidParam ) {
		var gclidDate = new Date();
		gclidDate.setTime( gclidDate.getTime() + ( 90 * 24 * 60 * 60 * 1000 ) );
		var gclidExpires = '' + gclidDate.toGMTString();
		document.cookie = 'gclid=' + gclidParam + '; expires=' + gclidExpires + ';path=/';
	}

	/**
	 * The big show
	 */
	var source   = getParameterByName( 'utm_source' );
	var medium   = getParameterByName( 'utm_medium' );
	var term     = getParameterByName( 'utm_term' );
	var content  = getParameterByName( 'utm_content' );
	var campaign = getParameterByName( 'utm_campaign' );
	var track    = getParameterByName( 'track' );

	var exDate = new Date();
	exDate.setDate( exDate.getDate() + 30 );
	var expirationTime = exDate.toUTCString();

	if ( source !== '' || medium !== '' || term !== '' || content !== '' || campaign !== '' || track !== '' ) {
		document.cookie = 'utm_source1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_medium1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_term1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_content1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_campaign1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'track1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;

		if ( source !== '' ) {
			document.cookie = 'utm_source1=' + source + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		}
		if ( medium !== '' ) {
			document.cookie = 'utm_medium1=' + medium + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		}
		if ( term !== '' ) {
			document.cookie = 'utm_term1=' + term + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		}
		if ( content !== '' ) {
			document.cookie = 'utm_content1=' + content + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		}
		if ( campaign !== '' ) {
			document.cookie = 'utm_campaign1=' + campaign + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		}
		if ( track !== '' ) {
			document.cookie = 'track1=' + track + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		}

	} else if ( domainMatch === true ) {
		document.cookie = 'utm_source1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_medium1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_term1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_content1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'utm_campaign1=; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'track1=OrganicSearch; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		document.cookie = 'organicCookie=OrganicSearch; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;

	} else {
		var cSource1   = getCookie( 'utm_source1' );
		var cMedium1   = getCookie( 'utm_medium1' );
		var cTerm1     = getCookie( 'utm_term1' );
		var cContent1  = getCookie( 'utm_content1' );
		var cCampaign1 = getCookie( 'utm_campaign1' );
		var cTrack1    = getCookie( 'track1' );

		if ( cSource1 !== '' || cMedium1 !== '' || cTerm1 !== '' || cContent1 !== '' || cCampaign1 !== '' || cTrack1 !== '' ) {
			document.cookie = 'utm_source1=' + cSource1 + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_medium1=' + cMedium1 + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_term1=' + cTerm1 + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_content1=' + cContent1 + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'utm_campaign1=' + cCampaign1 + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
			document.cookie = 'track1=' + cTrack1 + '; expires=' + expirationTime + '; path=/; Domain=' + cookieDomain;
		}
	}
} )();
