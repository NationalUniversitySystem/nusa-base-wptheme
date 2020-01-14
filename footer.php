<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package nusa
 */

?>

		</div><!-- #content -->

		<footer class="site-footer">
			<div class="site-footer__navigation">
				<nav class="footer-navigation" role="navigation" aria-label="Footer Navigation - <?php echo esc_attr( wp_get_nav_menu_name( 'primary-footer' ) ); ?>">
					<?php
					wp_nav_menu( [
						'theme_location' => 'primary-footer',
						'container'      => false,
						'fallback_cb'    => false,
					] );
					?>
				</nav>
			</div>
			<div class="site-footer__copyright">
				<p><?php printf( '&copy; Copyright %s %s. All Rights Reserved.', esc_html( date( 'Y' ) ), esc_html( get_bloginfo( 'name' ) ) ); ?></p>
			</div>
		</footer>
	</div><!-- #page -->

	<?php wp_footer(); ?>

</body>
</html>
