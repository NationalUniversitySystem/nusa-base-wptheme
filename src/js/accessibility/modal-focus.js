/**
* TAB-ABLE BS4 MODAL
*/
( d => {
	d.addEventListener( 'keydown', event => {
		// SETUP INITIAL FOCUS INSIDE MODAL AFTER MODAL IS LAUNCHED.

		// Get the ID of the modal being opened.
		const modalTarget = event.target.dataset.target;

		// If the button we've hit enter on has a data-target
		if ( undefined !== modalTarget && event.which === 13 ) {
			// Set the top close button inside the modal as a var.
			const modalTopClose = d.querySelector( modalTarget + ' .modal-header .close' );

			// setTimeout so it doesn't fire immediately and get hijacked by browser.
			setTimeout( () => {
				modalTopClose.focus();
			}, 5 );
		}

		// CONTROL THE FOCUS TRAPPING AFTER MODAL IS LAUNCHED.

		// If we're focused on the close button in the footer AND we press TAB.
		if ( event.target.matches( '.modal-footer button' ) && event.which === 9 ) {
			// Get the modal ID.
			const modalId = event.target.closest( '.modal' ).id;

			// setTimeout so it doesn't fire immediately and get hijacked by browser.
			setTimeout( () => {
				// Focus back on the top close button.
				d.querySelector( '#' + modalId + ' .modal-header .close' ).focus();
			}, 5 );
		}

		// If we're focused on the close button in the header AND we press SHIFT + TAB.
		if ( event.target.matches( '.modal-header button' ) && event.which === 9 && event.shiftKey ) {
			// Get the modal ID.
			const modalId = event.target.closest( '.modal' ).id;

			// setTimeout so it doesn't fire immediately and get hijacked by browser.
			setTimeout( () => {
				// Focus back on the top close button.
				d.querySelector( '#' + modalId + ' .modal-footer button' ).focus();
			}, 5 );
		}
	} );
} )( document );
