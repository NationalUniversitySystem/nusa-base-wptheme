<?php
/**
 * Set up all our Widgets and their functionality here
 *
 * @package nusa
 */

/**
 * NUSA_Widgets class
 */
class NUSA_Widgets {
	/**
	 * Instance of this class
	 *
	 * @var boolean
	 */
	public static $instance = false;

	/**
	 * Using construct function to add any actions and filters
	 */
	public function __construct() {
		add_action( 'widgets_init', [ $this, 'register_sidebars' ] );
		add_action( 'widgets_init', [ $this, 'register_widgets' ] );
		add_action( 'admin_enqueue_scripts', function() {
			wp_enqueue_media();
		} );
	}

	/**
	 * Singleton
	 *
	 * Returns a single instance of this class.
	 */
	public static function singleton() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Register Sidebars
	 *
	 * Adds the sidebars used by this theme to WordPress.
	 */
	public function register_sidebars() {
		register_sidebar( [
			'name'          => __( 'Sidebar', 'nusa' ),
			'id'            => 'sidebar-1',
			'description'   => __( 'Add widgets here.', 'nusa' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		] );
	}

	/**
	 * Register Widgets
	 *
	 * Adds this theme's custom widgets to the WordPress admin.
	 * Make sure to require the file holding the widget class first.
	 */
	public function register_widgets() {
	}
}
