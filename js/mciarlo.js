$(function () {
	var $window = $(window),
		SCROLL_DEBOUNCE_MS = 10,
		SCROLL_ANIMATION_DURATION = 1200,
		$body = $("body"),
		$burgerIcon = $("#hamburger-icon"),
		$howItWorks = $(".scroll-container:first"),
		$textContent = $(".text-content:first"),
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

	var handleDashboardPreset = function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		var $target = $(ev.target);
		$(".dashboard-presets a").removeClass("active");
		$target.addClass("active");

		var targetClass = $target.attr("data-attr-class");
		$("img.dashboard-preset").removeClass("active");
		$("img." + targetClass).addClass("active");
	};

	$(".dashboard-presets a").click(function (ev) {
		handleDashboardPreset(ev);
	});

	$(".dashboard-presets a").hover(function (ev) {
		handleDashboardPreset(ev);
	});

	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: SCROLL_DEBOUNCE_MS
	},
	updateIntro = function () {
		if ($howItWorks.length == 0) {
			return;
		}

		$("#loading-bar")[$window.scrollTop() > 30 ? "addClass" : "removeClass"]("hidden");

		var windowBottomY = $window.scrollTop() + $window.outerHeight();
		var viewportHeight = $window.outerHeight();
		var scrollContainerHeight = $howItWorks.outerHeight();
		var scrollContainerThreshold = $howItWorks.position().top + (scrollContainerHeight * .7);

		if ($(".guided-setup:first").position().top + (viewportHeight / 4) <= windowBottomY) {
				$(".user-stats li").removeClass("will-animate");
		}

		var iPhoneHeight = $(".sticky-container .iphone").outerHeight();
		var scrollDistanceFromLockingStoryText = $window.scrollTop() - $textContent.position().top;

		if (scrollDistanceFromLockingStoryText > - viewportHeight) {
			var percent = -1 * ((scrollDistanceFromLockingStoryText / iPhoneHeight) * 100);

			$(".mask-container").css("height", percent + "%");

		} else {
			$(".mask-container").css("height", "100%");
		}

		$(".callouts")[windowBottomY >= scrollContainerThreshold ? "addClass" : "removeClass"]("active");
	},
  onScroll = function () {
		updateIntro();
	},
	onResize = function () {
		updateIntro();
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

	$(".user-stats li").addClass("will-animate");

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
