// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

jQuery.fn.extend({
  parentToAnimate: function (newParent, duration) {
    duration = duration || 'slow';

    var $element = $(this);

    newParent = $(newParent);
    var oldOffset = $element.offset();
    $(this).appendTo(newParent);
    var newOffset = $element.offset();

    var temp = $element.clone().appendTo('body');

    temp.css({
      'opacity': '0',
      'position': 'absolute',
      'left': oldOffset.left,
      'top': oldOffset.top,
      'zIndex': 1000,

    });

    $element.hide();

    temp.animate({
      'top': newOffset.top,
      'left': newOffset.left,
      'opacity': '0.5',
      'transition': 'all 2s ease-out'
    }, duration, function () {
      $element.show();
      temp.remove();
    });
  }




});
