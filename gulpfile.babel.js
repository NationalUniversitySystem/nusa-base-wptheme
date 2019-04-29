/**
 * Gulpfile.
 *
 * Gulp with WordPress.
 *
 * Implements:
 *      1. Live reloads browser with BrowserSync.
 *      2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *         CSS minification, and Merge Media Queries.
 *      3. JS: Concatenates & uglifies Vendor and Custom JS files.
 *      4. Watches files for changes in CSS or JS.
 *      5. Watches files for changes in PHP.
 *      6. Corrects the line endings.
 *      7. InjectCSS instead of browser page reload.
 *
 * Modded from https://github.com/ahmadawais/WPGulp
 */

/**
 * Load WPGulp Configuration.
 */
import config from './gulp.config.js';

/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
import { dest, parallel, src, series, watch } from 'gulp';

// CSS related plugins.
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';

// JS related plugins.
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import include from 'gulp-include';
import uglify from 'gulp-uglify';

// Utility related plugins.
import browserSync from 'browser-sync';
import lineec from 'gulp-line-ending-corrector';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';

const server = browserSync.create();

/**
 * Custom Error Handler.
 *
 * @param Mixed error
 */
const errorHandler = error => {
	notify.onError( {
		title: 'Gulp error in ' + error.plugin,
		message: error.toString(),
		sound: false
	} )( error );
};

/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {Mixed} done Done.
 */
const browsersync = done => {
	server.init( {
		proxy: config.projectURL,
		open: false,
		injectChanges: true,
		watchEvents: [ 'change', 'add', 'unlink', 'addDir', 'unlinkDir' ]
	} );
	done();
};

// Helper function to allow browser reload with Gulp 4.
const reload = done => {
	server.reload();
	done();
};

/**
 * Task: `sassLinter`.
 * This task does the following:
 *    1. Gets all our scss files
 *    2. Lints theme files to keep code up to standards and consistent
 */
export const sassLinter = () => {
	return src( 'src/scss/**/*.scss' )
		.pipe( plumber( { errorHandler: errorHandler } ) )
		.pipe( sassLint() )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
};
sassLinter.description = 'Lint through all our SASS/SCSS files so our code is consistent across files.';

/**
 * Task: `css`.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates *.min.css
 *    7. Injects CSS or reloads the browser via server
 */
export const css = ( done ) => {
	src( 'src/scss/wp-*.scss', { sourcemaps: true } )
		.pipe( plumber( errorHandler ) )
		.pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( dest( './assets/css', { sourcemaps: '.' } ) );

	src( [
			'src/scss/*.scss',
			'!src/scss/wp-*.scss'
		], { sourcemaps: true } )
		.pipe( plumber( errorHandler ) )
		.pipe( sass( { outputStyle: 'expanded' } ).on( 'error', sass.logError ) )
		.pipe( autoprefixer( {
			cascade: false,
			browsers: config.BROWSERS_LIST
		} ) )
		.pipe( cleanCSS( {
			level: {
				2: {
					all: false,
					mergeIntoShorthands: true,
					mergeMedia: true
				}
			}
		} ) )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( dest( './assets/css', { sourcemaps: '.' } ) )
		.pipe( server.stream( {
			match: '**/*.css' // Sourcemap is in stream so match for actual CSS files
		} ) );

	done();
};
css.description = 'Compiles Sass, Autoprefixes it and Minifies CSS.';

/**
 * Task: `sassLinter`.
 * This task does the following:
 *    1. Gets all our theme files
 *    2. Lints theme files to keep code up to standards and consistent
 */
export const jsLint = () => {
	return src( [
			'./src/js/**/*.js',
			'!src/js/vendor/**'
		] )
		.pipe( eslint() )
		.pipe( eslint.format() );
};
jsLint.description = 'JS linter task to keep our code consistent.';

/**
 * Task: `js`.
 *
 * This task does the following:
 *     1. Gets the source folder for JS files
 *     2. Concatenates all the files and generates *.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates *.min.js
 */
export const js = () => {
	return src( 'src/js/*.js', {
			sourcemaps: true
		} )
		.pipe( plumber( errorHandler ) )
		.pipe( include( {
			includePaths: [
				__dirname + '/src/js',
				__dirname + '/node_modules'
			]
		} ) )
		.pipe( babel() ) // config is in .babelrc file
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
		.pipe( dest( './assets/js', { sourcemaps: '.' } ) )
		.pipe( server.reload( {
			match: '**/*.js', // Sourcemap is in stream so match for actual JS files
			stream: true
		} ) );
};
js.description = 'Run all JS compression and sourcemap work.';

export const styles  = series( sassLinter, css );
export const scripts = series( jsLint, js );
export const build   = parallel( styles, scripts );

/**
 * Watch Tasks.
 */
export const dev = series( build, browsersync, () => {
	watch( './**/*.php', reload ); // Reload on PHP file changes.
	watch( './src/scss/**/*.scss', styles ); // Reload on SCSS file changes.
	watch( './src/js/**/*.js', scripts ); // Reload on JS file changes.
} );
dev.description = 'Watches for file changes and runs specific tasks.';

export default dev;
