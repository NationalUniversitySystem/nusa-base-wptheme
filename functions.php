<?php
/**
 * NUSA functions and definitions
 *
 * @package nusa
 */

/**
 * Require and initiate our classes.
 */
require get_template_directory() . '/inc/class-nusa-theme-setup.php';
require get_template_directory() . '/inc/class-nusa-widgets.php';
NUSA_Theme_Setup::singleton();
NUSA_Widgets::singleton();

add_action( 'after_setup_theme', [ 'NUSA_Theme_Setup', 'theme_setup' ] );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';
