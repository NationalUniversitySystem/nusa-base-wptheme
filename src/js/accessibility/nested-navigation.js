/**
 * TAB-ABLE SUB MENUS ( MAIN MENU )
 */
import { getClass } from '../theme/functions';

( d => {
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
} )( document );
