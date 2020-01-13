/* global setInputValue */
/**
 * Fetch the optimizely info we want to track and place it into our forms to track,
 * if the appropriate fields exist.
 */
( function( w ) {
	// Check if optimizely is even present.
	if ( 'undefined' === typeof w.optimizely ) {
		return;
	}

	const activeCampaignStates = w.optimizely.get( 'state' ).getCampaignStates( {
		'isActive': true
	} );

	const activeCampaigns = [];

	for ( let campaignId in activeCampaignStates ) {
		let theCampaign = activeCampaignStates[ campaignId ];

		activeCampaigns.push( theCampaign.experiment.id + '|' + theCampaign.variation.id );
	}

	const forms = document.querySelectorAll( 'form' );

	if ( activeCampaigns.length > 0 && forms.length ) {
		// Truncate the string since the systems we'll be sending this to have a character limit.
		const optimizelyTrackString = activeCampaigns.join( ',' ).substring( 0, 255 );

		for ( let formIndex = 0; formIndex < forms.length; formIndex++ ) {
			const theForm = forms[ formIndex ];

			setInputValue( '.track_optimizely', optimizelyTrackString, theForm );
		}
	}
} )( window );
