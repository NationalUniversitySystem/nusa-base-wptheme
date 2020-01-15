import { getClass } from './functions';

( ( d ) => {

	/*
	*
	* TAB-ABLE SUB MENUS ( MAIN MENU )
	*
	*/

	// Get all top-level anchors.
	const childNavLinks = d.querySelectorAll( '.main-navigation ul > li > a' );

	// If they exist.
	if ( childNavLinks ) {

		// Run through each of them.
		childNavLinks.forEach( childNavLink => {

			// Set them up with a focus eventListener.
			childNavLink.addEventListener( 'focus', () => {

				// Get the class generated by WP when an li has children.
				const subMenuClass = getClass( 'menu-item-has-children', childNavLink.parentNode.classList );

				// Hide all child-menus by default.
				d.querySelectorAll( '.sub-menu' ).forEach( subMenu => {

					// If the child-menu has no children in focus, hide it.
					if ( subMenu.contains( document.activeElement ) === false ) {
						subMenu.style.display = '';
					}

				} );

				// If the parent li of the current anchor being focus has children.
				if ( 'menu-item-has-children' === subMenuClass ) {

					// Find the closest parent child-menu.
					const siblingSubMenu = childNavLink.parentNode.querySelector( '.sub-menu' );
					// Set it to display.

					siblingSubMenu.style.display = 'block';
				}

			} );
		} );
	}

	/*
	*
	* TAB-ABLE BS4 MODAL
	*
	*/

	d.addEventListener( 'keydown', event => {

		// SETUP INITIAL FOCUS INSIDE MODAL AFTER MODAL IS LAUNCHED.

		// Get the ID of the modal being opened.
		const modalTarget = event.target.dataset.target;

		// If the button we've hit enter on has a data-target
		if ( undefined !== modalTarget && event.which === 13 ) {

			// Set the top close button inside the modal as a var.
			const modalTopClose = document.querySelector( modalTarget + ' .modal-header .close' );

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
				document.querySelector( '#' + modalId + ' .modal-header .close' ).focus();
			}, 5 );
		}

		// If we're focused on the close button in the header AND we press SHIFT + TAB.
		if ( event.target.matches( '.modal-header button' ) && event.which === 9 && event.shiftKey ) {

			// Get the modal ID.
			const modalId = event.target.closest( '.modal' ).id;

			// setTimeout so it doesn't fire immediately and get hijacked by browser.
			setTimeout( () => {

				// Focus back on the top close button.
				document.querySelector( '#' + modalId + ' .modal-footer button' ).focus();
			}, 5 );
		}

	} );

} )( document );
