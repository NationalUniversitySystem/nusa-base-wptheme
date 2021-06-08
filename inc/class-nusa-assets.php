<?php

/**
 * Set up all our own theme's assets
 *
 * @package nusa
 */

/**
 * NUSA_Assets class
 */
class NUSA_Assets {
	/**
	 * Instance of this class
	 *
	 * @var boolean
	 */
	public static $instance = false;

	/**
	 * Critical CSS string to inline
	 *
	 * @var string
	 */
	private $critical_css = '';

	/**
	 * Using construct function to add any actions and filters
	 */
	public function __construct() {
		$this->get_critical_css();

		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ], 99 );
		add_action( 'script_loader_tag', [ $this, 'do_script_loader_tag' ], 10, 3 );
		add_action( 'style_loader_tag', [ $this, 'do_style_loader_tag' ], 10, 4 );
		add_action( 'css_do_concat', [ $this, 'exclude_critical_css_concat' ], 10, 2 );
		add_action( 'wp_head', [ $this, 'inline_critical_css' ], -1 );
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
	 * Get the critical CSS as soon as possible so that other logic
	 * can be handled without fetching it multiple times.
	 *
	 * @return void
	 */
	private function get_critical_css() {
		$file_source           = get_template_directory() . '/assets/css/critical.min.css';
		$critical_css_mod_time = filemtime( $file_source );
		$mod_time_transient    = get_transient( 'critical_css_mod_time' );
		$critical_css          = get_transient( 'critical_css' );

		if ( ( empty( $critical_css ) || $critical_css_mod_time !== $mod_time_transient ) && file_exists( $file_source ) ) {
			$critical_css = file_get_contents( $file_source );  // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown

			if ( ! empty( $critical_css ) ) {
				// Strip the comments and source map.
				$critical_css = preg_replace( '#/\\*.*?\\*/#s', '', $critical_css );

				// Add full path to urls.
				$critical_css = str_replace( 'url(../../images', 'url(' . get_template_directory_uri() . '/images', $critical_css );

				set_transient( 'critical_css_mod_time', $critical_css_mod_time );
				set_transient( 'critical_css', $critical_css );
			}
		}

		if ( ! empty( $critical_css ) ) {
			$this->critical_css = $critical_css;
		}
	}

	/**
	 * Enqueue Admin Assets
	 *
	 * Enqueues the necessary css and js files when the WordPress admin is loaded.
	 */
	public function enqueue_admin_assets() {
		wp_enqueue_style(
			'nusa',
			get_stylesheet_directory_uri() . '/assets/css/wp-admin.min.css',
			[],
			filemtime( get_template_directory() . '/assets/css/wp-admin.min.css' )
		);

		wp_enqueue_script(
			'nusa',
			get_stylesheet_directory_uri() . '/assets/js/wp-admin.min.js',
			[ 'jquery', 'media-upload' ],
			filemtime( get_template_directory() . '/assets/js/wp-admin.min.js' ),
			true
		);
	}

	/**
	 * Enqueue Assets
	 *
	 * Enqueues the necessary css and js files when the theme is loaded.
	 */
	public function enqueue_assets() {
		$theme_path = get_template_directory();
		$theme_uri  = get_stylesheet_directory_uri();

		if ( ! $this->critical_css ) {
			wp_enqueue_style(
				'nusa-critical',
				$theme_uri . '/assets/css/critical.min.css',
				[],
				filemtime( $theme_path . '/assets/css/critical.min.css' )
			);
		}

		wp_enqueue_style(
			'nusa',
			$theme_uri . '/assets/css/theme.min.css',
			[],
			filemtime( $theme_path . '/assets/css/theme.min.css' )
		);

		$script_dependencies = [
			'jquery',
			'vendor-scripts',
		];
		if ( wp_script_is( 'polyfill-service', 'registered' ) ) {
			$script_dependencies[] = 'polyfill-service';
		}

		wp_enqueue_script(
			'vendor-scripts',
			$theme_uri . '/assets/js/vendor.min.js',
			[ 'jquery' ],
			filemtime( $theme_path . '/assets/js/vendor.min.js' ),
			true
		);

		wp_enqueue_script(
			'nusa',
			$theme_uri . '/assets/js/theme.min.js',
			$script_dependencies,
			filemtime( $theme_path . '/assets/js/theme.min.js' ),
			true
		);
	}

	/**
	 * Do Style Loader Tag
	 * - For organization purposes, this only handles the theme style tags.
	 *   Each plugin should handle their own style tags loading.
	 *
	 * Allows enqueued style tags to be manipulated, like optimizing the load of the files.
	 *
	 * @param string $tag    The link tag for the enqueued style.
	 * @param string $handle The style's registered handle.
	 * @param string $href   The stylesheet's source URL.
	 * @param string $media  The stylesheet's media attribute.
	 * @return string
	 */
	public function do_style_loader_tag( $tag, $handle, $href, $media ) {
		$async_styles = [
			'nusa',
		];

		if ( in_array( $handle, $async_styles, true ) ) {
			$tag = str_replace( ' media', " onload='this.media=\"all\"' media", $tag );
		}

		return $tag;
	}

	/**
	 * Do Script Loader Tag
	 * - For organization purposes, this only handles the theme scripts.
	 *   Each plugin should handle their own scripts loading.
	 *
	 * Allows enqueued scripts to be loaded asynchronously, thus preventing the
	 * page from being blocked by js calls.
	 *
	 * @param  string $tag    The <script> tag for the enqueued script.
	 * @param  string $handle The script's registered handle.
	 * @param  string $src    The script's source URL.
	 *
	 * @return string The formatted HTML script tag of the given enqueued script.
	 */
	public function do_script_loader_tag( $tag, $handle, $src ) {
		// The handles of the enqueued scripts we want to async.
		$async_scripts = [];
		if ( in_array( $handle, $async_scripts, true ) ) {
			return str_replace( ' src', ' async="async" src', $tag );
		}

		// The handles of the enqueued scripts we want to defer.
		$defer_scripts = [
			'nusa',
			'wp-embed',
		];
		if ( in_array( $handle, $defer_scripts, true ) ) {
			return str_replace( ' src', ' defer="defer" src', $tag );
		}

		return $tag;
	}

	/**
	 * Disable VIP CSS file concatenation for theme's critical css
	 *
	 * @param boolean $do_concat Whether or not to concatenate the file.
	 * @param string  $handle    Handle of the registered script.
	 *
	 * @return boolean
	 */
	public function exclude_critical_css_concat( $do_concat, $handle ) {
		$excluded_concat_css = [
			'nusa',
			'nusa-critical',
		];
		if ( ! is_admin() && in_array( $handle, $excluded_concat_css, true ) ) {
			return false;
		}

		return $do_concat;
	}

	/**
	 * Inline the CSS from the critical css file
	 *
	 * @return void
	 */
	public function inline_critical_css() {
		if ( $this->critical_css ) {
			echo '<style>' . "\n\t\t";
			echo '/* STYLE HERE FOR GOOGLE BEST PRACTICES */' . "\n\t\t";
			echo $this->critical_css . "\n\t\t"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo '</style>' . "\n";
		}
	}
}
