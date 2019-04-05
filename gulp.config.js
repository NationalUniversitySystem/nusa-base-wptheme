/**
 * WPGulp Configuration File
 *
 * 1. Edit the variables as per project requirements.
 * 2. Everything else is in the gulpfile to keep it consistent across our projects.
 */

// Define the default project configuration.
let projectConfig = {
	// Local project URL of your already running WordPress site. Could be something like wpgulp.local or localhost:3000 depending upon your local WordPress setup.
	projectURL: 'nusa.loc',

	// Browsers you care about for autoprefixing. Browserlist https://github.com/ai/browserslist
	// The following list is set as per WordPress requirements.
	// TODO: switch browserlist to npx browserslist-ga data.
	BROWSERS_LIST: [
		'last 2 version',
		'> 1%',
		'ie >= 11',
		'last 1 Android versions',
		'last 1 ChromeAndroid versions',
		'last 2 Chrome versions',
		'last 2 Firefox versions',
		'last 2 Safari versions',
		'last 2 iOS versions',
		'last 2 Edge versions',
		'last 2 Opera versions'
	]
};

/**
 * Check for local project config and overwrite it
 *
 * Create a file that exports your local configuration as an object to use a custom projectUrl and/or browsers list (if you really must).
 */
import fs from 'fs';

if ( fs.existsSync( './gulp.config.local.js' ) ) {
	const localConfig = require( './gulp.config.local.js' );

	projectConfig = { ...projectConfig, ...localConfig };
}

module.exports = projectConfig;
