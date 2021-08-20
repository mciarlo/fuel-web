/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

/**
 * Modified for text animation and loading content on refresh above viewport
 */
;(function($) {
  $.fn.unveil = function(threshold, callback) {
    var $w = $(window),
        triggerPoint = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina ? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");

      if (source) {
          this.setAttribute("src", source);
      }

      if (typeof callback === "function") callback.call(this);
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);

        var windowTop = $w.scrollTop(),
            windowBottom = windowTop + $w.height(),
            imageTop = $e.offset().top,
            imageBottom = imageTop + $e.height();

        return (imageTop <= windowBottom + triggerPoint);
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil load.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
