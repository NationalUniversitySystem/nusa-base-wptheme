<?php
/**
 * Template part for displaying the entry/post footer
 *
 * @package nusa
 */

// Hide category and tag text for pages.
if ( 'post' === get_post_type() ) {
	/* translators: used between list items, there is a space after the comma */
	$categories_list = get_the_category_list( esc_html__( ', ', 'nusa' ) );
	if ( $categories_list ) {
		/* translators: 1: list of categories. */
		printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'nusa' ) . '</span>', $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/* translators: used between list items, there is a space after the comma */
	$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'nusa' ) );
	if ( $tags_list ) {
		/* translators: 1: list of tags. */
		printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'nusa' ) . '</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

edit_post_link(
	sprintf(
		wp_kses(
			/* translators: %s: Name of current post. Only visible to screen readers */
			__( 'Edit <span class="screen-reader-text">%s</span>', 'nusa' ),
			[
				'span' => [
					'class' => [],
				],
			]
		),
		get_the_title()
	),
	'<span class="edit-link">',
	'</span>'
);
