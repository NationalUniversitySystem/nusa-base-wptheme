(function(w, d){
	var b = d.getElementsByTagName('body')[0];
	var s = d.createElement('script');
	var v = !('IntersectionObserver' in w) ? '8.17.0' : '10.19.0';
	s.async = true;
	s.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@' + v + '/dist/lazyload.min.js';
	w.lazyLoadOptions = {
		elements_selector: '.lazy-load'
	};
	b.appendChild(s);
}(window, document));
