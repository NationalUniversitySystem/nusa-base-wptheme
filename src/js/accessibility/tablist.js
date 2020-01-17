import ally from 'ally.js';

( ( d ) => {

	/*
	*
	* TAB-ABLE TABLIST CONTENT
	*
	*/

	// Get all navigation tabs.
	const navTabs = d.querySelectorAll( '.nav-tabs .nav-item' );
	// Run through and set up an event listener for all of them.
	navTabs.forEach( navTab => {
		navTab.addEventListener( 'keydown', event => {

			// Get the ID of the corresponding tab content from the navigation tab.
			const tabContentId      = navTab.getAttribute( 'href' );
			// Get the full selector of the corresponding tab content.
			const tabContent        = d.querySelector( tabContentId + '.tab-pane' );
			// Get all focusable elements within the corresponding tab content as an array.
			const focusableChildren = ally.query.focusable( {
				context: tabContent,
				includeContext: true,
				strategy: 'quick',
			} );
			// Set the first focusable element inside tab content as a var.
			const firstFocusableChild = focusableChildren[0];
			// Set the last focusable element inside tab content as a var.
			const lastFocusableChild  = focusableChildren.slice(-1)[0];

			// If we're on the navigation tab, it has focusable children, and we press TAB.
			if ( '' !== focusableChildren && event.which === 9 && ! event.shiftKey && navTab.classList.contains( 'active' ) ) {
				event.preventDefault();
				// Set focus to the first focusable element inside the tab content.
				firstFocusableChild.focus();
			}

			// Once we're inside of the tab content, loop through each of the focusable elements
			// and setup eventListeners for each of them.
			  focusableChildren.forEach( focusableChild => {
				focusableChild.addEventListener( 'keydown', event => {
					// Get the direct sibling of the current navigation tab.
					const nextTab = d.querySelector( 'a[href="' + tabContentId + '"].nav-item' ).nextElementSibling;

					// If the navigation tab HAS a sibling.
					if ( null !== nextTab ) {
						// Get its ID.
						const nextTabId = nextTab.id;

						// If we are on the last focusable element and hit TAB.
						if ( event.target === lastFocusableChild && event.which === 9 ) {
							event.preventDefault();
							// Set focus to the navigation tab directly after the current one.
							d.getElementById( nextTabId ).focus();
						}
					}

					// If we're inside the tab content, on the first focusable element and hit SHIFT + TAB,
					// go back to the corresponding navigation tab.
					if ( event.target === firstFocusableChild && event.which === 9 && event.shiftKey ) {
						event.preventDefault();
						d.querySelector( 'a[href="' + tabContentId + '"].nav-item' ).focus();
					}

				});
			  } );

		} );
	} )

} )( document );
