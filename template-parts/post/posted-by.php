<?php
/**
 * Template part for displaying author markup
 *
 * @package nusa
 */

$byline = sprintf(
	/* translators: %s: post author. */
	esc_html_x( 'by %s', 'post author', 'nusa' ),
	'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
);

echo '<span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

