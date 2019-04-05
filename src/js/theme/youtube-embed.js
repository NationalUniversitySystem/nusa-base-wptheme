( function() {
	var ytVids = document.querySelectorAll( '.youtube-embed' );

	ytVids.forEach( function( ytVid ) {

		// Make sure the data attribute is present
		if ( ! ytVid.dataset.ytid ) {
			return;
		}

		// Get image URLs from ID
		var imageSources = [
			'https://img.youtube.com/vi/' + ytVid.dataset.ytid + '/maxresdefault.jpg',
			'https://img.youtube.com/vi/' + ytVid.dataset.ytid + '/hqdefault.jpg',
			'https://img.youtube.com/vi/' + ytVid.dataset.ytid + '/sddefault.jpg'
		];

		// Build out markup that will be inserted into yt-embed div
		var thumbnail       = document.createElement( 'div' );
		var thumbnailImage  = document.createElement( 'div' );
		var thumbnailButton = document.createElement( 'div' );

		thumbnail.className = 'thumbnail';
		thumbnailImage.className = 'thumbnail__image';
		thumbnailButton.className = 'thumbnail__button';

		// Create image to load
		var imageToLoad      = 0;
		var downloadingImage = new Image();

		// onload event has to be defined/attached to the new image before we set the src
		downloadingImage.onload = function() {

			// Check if YT returned it's 404 image, and if it did try to load the HQ option
			if ( this.naturalHeight <= 90 ) {
				imageToLoad++;
			}

			thumbnailImage.style.backgroundImage = 'url("' + imageSources[ imageToLoad ] + '")';
			thumbnail.insertBefore( thumbnailButton, thumbnail.firstChild );
			thumbnail.insertBefore( thumbnailImage, thumbnail.firstChild );
			ytVid.insertBefore( thumbnail, ytVid.firstChild );
		};

		downloadingImage.src = imageSources[ imageToLoad ];

		ytVid.addEventListener( 'click', function() {
			var iframe = document.createElement( 'iframe' );

			iframe.setAttribute( 'height', '100%' );
			iframe.setAttribute( 'width', '100%' );
			iframe.setAttribute( 'frameborder', '0' );
			iframe.setAttribute( 'allowfullscreen', '' );
			iframe.setAttribute( 'allow', 'autoplay; encrypted-media' );
			iframe.setAttribute( 'src', 'https://www.youtube.com/embed/' + this.dataset.ytid + '?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1' );

			this.innerHTML = '';
			this.appendChild( iframe );
		} );
	} );
} )();
