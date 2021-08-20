$(function () {
	var $window = $(window),
		SCROLL_DEBOUNCE_MS = 50,
		SCROLL_ANIMATION_DURATION = 1200,
		$body = $("body"),
		$burgerIcon = $("#hamburger-icon"),
		$heroLeft = $(".hero-left"),
		$heroRight = $(".hero-right"),
		HERO_LEFT_DISTANCE = 80,
		HERO_RIGHT_DISTANCE = 160,
		downloadButtons = $(".app-store-badge"),
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		};

	var timeout;

	function sendURL(anchor) {
		clearTimeout(timeout)
		window.location = $(anchor).attr("href")
	}

	if (downloadButtons.length > 0) {
		downloadButtons.each(function (idx, el) {
			el.addEventListener("click", function(e){
			e.preventDefault();
			var anchor = e.currentTarget;

			// Creates a timeout to call `submitForm` after one second.
			timeout = setTimeout(function () {
				sendURL(anchor)
			}, 2000);

			var downloadType =
			gtag('event', 'download', {
			  'event_category' : 'download',
			  'event_label' : $(anchor).attr("data-attr-type"),
			  'hitCallback' : sendURL(anchor)
			});
		});
		});
	}

	var isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	},
	handleJSAbilities = function () {.15
		$body.removeClass("no-js");
	};

	$burgerIcon.click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		$burgerIcon.toggleClass("active");
		$("nav").toggleClass("active");
	});

	$(".faq li > a").click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		$(ev.target).toggleClass("active");
		$(ev.target).parent().toggleClass("active");
	});

	$(".theme-selector a").click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		var $target = $(ev.target);
		$(".theme-selector a").removeClass("selected");
		$target.addClass("selected");

		var targetClass = $target.attr("data-attr-class");
		$("img.theme_preview").hide();
		$("img." + targetClass).show();
	});

	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: SCROLL_DEBOUNCE_MS
	},
	updateHeros = function () {
		if ($heroLeft.length == 0) {
			return;
		}

		var heroBottom = $heroLeft.offset().top + $heroLeft.outerHeight();
		if (heroBottom < $window.scrollTop()) {
			return;
		}

		var percentOfViewportHeight = Math.min(1, $window.scrollTop() / $window.outerHeight(), 1);
		var translateLeft = -HERO_LEFT_DISTANCE * percentOfViewportHeight;
		var translateRight = -HERO_RIGHT_DISTANCE * percentOfViewportHeight;
		$heroLeft.css("transform", "translate3d(0px, " + translateLeft + "px, 0)");
		$heroRight.css("transform", "translate3d(0px, " + translateRight + "px, 0)");
	}
  onScroll = function () {
		updateHeros();
	},
	onResize = function () {
		updateHeros();
	};

	$window.resize(function () {
		onResize();
	});

	$window.scroll(function () {
		if (scrollHandling.allow) {
			onScroll();
			scrollHandling.allow = false;
			setTimeout(scrollHandling.reallow, scrollHandling.delay);
		}
	});

	$(".jump-link").click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		var $target = $(ev.target);
		var targetID = $target.attr("data-attr-id");
		var scrollTop = $("#" + targetID).offset().top;
		$("html, body").animate({scrollTop: scrollTop}, SCROLL_ANIMATION_DURATION);
	});

	onResize();
	handleJSAbilities();

	if ($('img.lazy-load').length > 0) {
		// Lazy load major image assets
	  $("img.lazy-load").unveil(200, function() {
			var $image = $(this);
	  	$image.on("load", function() {
	    	$image.removeClass('invisible');
	  	});
		});
	}
});
