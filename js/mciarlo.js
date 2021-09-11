$(function () {
	var $window = $(window),
		SCROLL_DEBOUNCE_MS = 10,
		SCROLL_ANIMATION_DURATION = 1200,
		$body = $("body"),
		$burgerIcon = $("#hamburger-icon"),
		$howItWorks = $(".scroll-container:first"),
		$storyContainer = $("#story-container"),
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
		$("img.theme_preview").removeClass("active");
		$("img." + targetClass).addClass("active");
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
		var windowCenter = $window.scrollTop() + ($window.outerHeight() / 2);
		var centerPoint = ($window.outerHeight() - $storyContainer.outerHeight()) / 2
		var howItWorksShouldStick = $howItWorks.position().top - centerPoint <= $window.scrollTop();

		$storyContainer[howItWorksShouldStick ? "addClass" : "removeClass"]("sticky");
		console.log($(".guided-setup:first").position().top);
		console.log(windowCenter);

		if ($(".guided-setup:first").position().top <= windowCenter) {
				$(".user-stats li").removeClass("will-animate");
		}
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
