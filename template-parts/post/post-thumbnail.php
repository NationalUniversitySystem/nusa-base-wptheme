<?php
/**
 * Template part for displaying the post thumbanil
 *
 * @package nusa
 */

if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
	return;
}

if ( is_singular() ) :
	?>

	<div class="post-thumbnail">
		<?php the_post_thumbnail(); ?>
	</div><!-- .post-thumbnail -->

<?php else : ?>

	<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
		<?php
		the_post_thumbnail( 'post-thumbnail', [
			'alt' => the_title_attribute( [
				'echo' => false,
			] ),
		] );
		?>
	</a>

	<?php
endif; // End is_singular().
