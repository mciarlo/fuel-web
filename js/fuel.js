$(function () {
	var $window = $(window),
		MAX_PHONE_TRANSLATION_OFFSET = 100,
		MIN_WINDOW_WIDTH_FOR_PARALLAX = 1024,
		$body = $("body"),
		$sectionZero = $(".page-top"),
		$sectionOne = $("div.dashboard-container"),
		$sectionTwo = $("section.weekly-review"),
		$sectionThree = $("section.food-library"),
		$sectionFour = $("section.repeat-use"),
		$sectionFive = $("section.integrations"),
		$sectionSix = $("section.sharing"),
		sectionOneTop = 0,
		sectionTwoTop = 0,
		sectionThreeTop = 0,
		sectionFourTop = 0,
		sectionFiveTop = 0,
		sectionSixTop = 0,
		windowHeight = 0,
		phoneTranslationDistance = 0,
		windowWidth = $window.outerWidth(),
		windowHeight = $window.outerHeight(),
		$trendPhone01 = $("#trend-01"),
		$trendPhone02 = $("#trend-02"),
		$trendPhone03 = $("#trend-03"),
		$trendPhone04 = $("#trend-04"),
		scrollTop = 0,
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
	handleJSAbilities = function () {
		$body.removeClass("no-js");
	};

	$(".faq li > a").click(function (ev) {
		ev.preventDefault();
		ev.stopPropagation();

		$(ev.target).toggleClass("active");
		$(ev.target).parent().toggleClass("active");
	});

	var updatePanels = function () {
		if ($sectionOne.length == 0) {
			return;
		}

		$sectionZero.removeClass("sticky");
		$sectionOne.removeClass("sticky");
		$sectionTwo.removeClass("sticky");
		$sectionThree.removeClass("sticky");
		$sectionFour.removeClass("sticky");
		$sectionFive.removeClass("sticky");
		$sectionSix.removeClass("sticky");

		if (scrollTop > sectionOneTop && scrollTop < sectionTwoTop) {
			$sectionZero.addClass("sticky");
		}

		else if (scrollTop > sectionTwoTop && scrollTop < sectionThreeTop) {
			$sectionOne.addClass("sticky");
		}

		else if (scrollTop > sectionThreeTop && scrollTop < sectionFourTop) {
			$sectionTwo.addClass("sticky");
		}

		else if (scrollTop > sectionFourTop && scrollTop < sectionFiveTop) {
			$sectionThree.addClass("sticky");
		}

		else if (scrollTop > sectionFiveTop && scrollTop < sectionSixTop) {
			$sectionFour.addClass("sticky");
		}

		else if (scrollTop > sectionSixTop) {
			$sectionFive.addClass("sticky");
		}
	},
	updatePhone = function (phoneEL) {
		if (!isLargeViewport()) {
			return;
		}

		var phoneDistanceFromTop = phoneEL.parent().offset().top - scrollTop,
		phoneTranslationDistance = $trendPhone01.outerHeight() / 3,
		percentFromTop = phoneDistanceFromTop / windowHeight;
		percentFromTop = percentFromTop > 1.0 ? 1.0 : percentFromTop;
		percentFromTop = percentFromTop < 0 ? 0 : percentFromTop;
		phoneOffset1 = percentFromTop * -phoneTranslationDistance;
		phoneEL.css("transform", "translate3d(0," + phoneOffset1 + "px,0)");
	},
	updateOffsets = function () {
		if ($sectionOne.length == 0) {
			return;
		}

		sectionOneTop = $sectionOne.offset().top - windowHeight;
		sectionTwoTop = $sectionTwo.offset().top - windowHeight;
		sectionThreeTop = $sectionThree.offset().top - windowHeight;
		sectionFourTop = $sectionFour.offset().top - windowHeight;
		sectionFiveTop = $sectionFive.offset().top - windowHeight;
		sectionSixTop = $sectionSix.offset().top - windowHeight;

		updatePhone($trendPhone01);
		updatePhone($trendPhone02);
		updatePhone($trendPhone03);
		updatePhone($trendPhone04);
	},
	isLargeViewport = function () {
		return windowWidth >= MIN_WINDOW_WIDTH_FOR_PARALLAX;
	},
  onScroll = function () {
		scrollTop = $window.scrollTop();
		updateOffsets();
		updatePanels();
	},
	onResize = function () {
		windowHeight = $window.outerHeight();
		windowWidth = $window.outerWidth();

		updateOffsets();
		updatePanels();
	};

	$window.resize(function () {
		onResize();
		updateOffsets();
	});

	$window.scroll(function () {
		onScroll();
	});

	onResize();
	handleJSAbilities();

	if ($('img.lazy-load').length > 0) {
		$('img.lazy-load').addClass("invisible");

		$("img.lazy-load").unveil(200, function() {
			var $image = $(this);
	  	$image.on("load", function() {
	    	$image.removeClass('invisible');
	  	});
		});
	}
});
