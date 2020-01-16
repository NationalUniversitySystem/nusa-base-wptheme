<?php
/**
 * The template for displaying all single posts
 *
 * @package nusa
 */

get_header();
?>

	<main id="main" class="site-main">

	<?php
	while ( have_posts() ) :
		the_post();

		get_template_part( 'template-parts/content/content', get_post_type() );

		the_post_navigation();

	endwhile; // End of the loop.
	?>

	</main><!-- #main -->

<?php
get_sidebar();
get_footer();
