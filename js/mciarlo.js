$(function () {
	var $window = $(window),
		SCROLL_DEBOUNCE_MS = 10,
		SCROLL_ANIMATION_DURATION = 1200,
		$body = $("body"),
		$storyContainer = $("#story-container"),
		preventDefaultFormAction = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
		};

	var timeout;
	function sendURL(anchor) {
		clearTimeout(timeout)
		window.location = $(anchor).attr("href")
	}

	var isElementInViewport = function (el) {
		var rect = el.getBoundingClientRect();

    	return (rect.bottom > 0 && rect.bottom < window.innerWidth) ||
        	(rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.top > 0);
	},
	handleJSAbilities = function () {.15
		$body.removeClass("no-js");
	};

	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: SCROLL_DEBOUNCE_MS
	},
  onScroll = function () {
	},
	onResize = function () {
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

	onResize();
	handleJSAbilities();

	var countDownDate = new Date("Sep 28, 2021 12:00:00").getTime();
	var updateCountDown = function () {
		var now = new Date().getTime();
		var distance = countDownDate - now;

		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById("countdown-days").innerHTML = days;
		document.getElementById("countdown-hours").innerHTML = hours;
		document.getElementById("countdown-minutes").innerHTML = minutes;
		document.getElementById("countdown-seconds").innerHTML = seconds;

		return distance;
	};

	updateCountDown();

	var timer = setInterval(function() {
		var distance = updateCountDown();

	  if (distance < 0) {
	    clearInterval(timer);
	  }
	}, 1000);

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
