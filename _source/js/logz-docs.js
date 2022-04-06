// Add anchors on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function(event) {
  anchors.add();
});

$( function() {
  // Show/hide animations for left-side TOC. Also animates caret icon.
  $('ul.toc-child > li.toc-active')
    .find('ul.toc-grandchild')
    .show()
    .addClass('show')
    .siblings('span.toc-heading')
    .find('span.collapse-button')
    .addClass('show');
  $('ul.toc-grandchild > li.toc-active')
    .parent('ul.toc-grandchild')
    .show()
    .addClass('show')
    .siblings('span.toc-heading')
    .find('span.collapse-button')
    .addClass('show');

  $('ul.toc-child')
    .find('li.has-child > span.toc-heading')
    .on('click', function() {
      let submenu = $(this).siblings('ul.toc-grandchild');
      let caret = $(submenu).siblings('span.toc-heading').find('span.collapse-button');

      if (submenu.hasClass('show') == true) {
        submenu.slideUp().removeClass('show');
        caret.removeClass('show');
      } else {
        submenu.slideDown().addClass('show');
        caret.addClass('show');
      }
  });
});

// tablesorter
$(function() {
  $('.sortable table').tablesorter({ sortList: [[0,0]] });
});

$(function() {
  $('.branching-tabs-container').easytabs({
    animate: false,
    updateHash: true
  });
});

// toc collapse button for smaller screens
$(function() {
  $('#toc-collapse-btn').click( function() {
    $('.toc-container').toggleClass('toc-visibility');
  });
});

// add copy button to all <pre> blocks
$(function() {
  $('pre').parent().parent().prepend('<div class="copy-btn"><i class="fas fa-copy"></i></div>');

  // clipboard js
  new ClipboardJS('.copy-btn', {
    target: function(trigger) {
      return trigger.nextElementSibling;
    }
  });

  // change copy icon to "Copied!" for 1s after click
  $('.copy-btn').click( function() {
    $(this).addClass('copied');
    setTimeout(function () {
      $('.copied').removeClass('copied');
    }, 1500);
  });
});

// filter page based on url param
$(function() {
  $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return 'all';
    }
    return decodeURI(results[1]) || 0;
  }

  if ($.urlParam('filter')) {
    var thisFilter = $.urlParam('filter');
    pageFilter(thisFilter);
  }
})

// filter page on click
$(function() {
  $('.filter-btn').click(function() {
    pageFilter($(this).data('filter'));
  });

  // reset on tab click
  $('.branching-tabs > li > a').click(function() {
    $('.branching-tabs li  a').removeClass('visit');
    $(this).addClass('visit');

    if($(this).hasClass('visit')){
      $('.filter').show();
      $('.filter-btn[data-filter="all"]').addClass('filter-active').siblings().removeClass('filter-active');
    }
  });

});

// page filtering behavior
function pageFilter(filter) {
  var value = filter;
  console.log(value);
  if (value == 'all') {
    $('.filter').show();
  } else {
    $('.filter').hide();
    $('.filter').filter('.'+value).show();
  }
  // add `active` class to clicked button, remove from other buttons
  $('.filter-btn[data-filter="'+value+'"]').addClass('filter-active').siblings().removeClass('filter-active');
  return;
}

// scroll to <summary> when clicked
$(function() {
  $('summary').on('click', function() {
    $(this).toggleClass('open');
    if ($(this).hasClass('open')) { // if element is closed
      $(this).parent().siblings('details').removeAttr('open').children('summary').removeClass('open'); // close siblings
      var thisPos = $(this).position(); // get position
      var scrollTo = thisPos.top - 100; // set position, minus offset
      scroll.animateScroll(scrollTo); // scroll to this summary tag
    }
  });
});

$(document).ready(function() {
  let sideMenuElements = document.querySelectorAll('.branching-container .branching-tabs li a')
  for (var i = 0; i < sideMenuElements.length; i++) {
    sideMenuElements[i].addEventListener('click', function(event) {
        
        event.preventDefault();
        
        let scrollAnchor = this.getAttribute('href')
        let scrollPoint = document.querySelector(scrollAnchor).offsetTop - 28;
  
        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);
  
    return false;
    });
  }
});




$(window).scroll(function() {
  var windscroll = $(window).scrollTop();
  if (windscroll >= 100) {
      $('nav').addClass('fixed');
      $('.wrapper section').each(function(i) {
          if ($(this).position().top <= windscroll - 20) {
              $('nav a.active').removeClass('active');
              $('nav a').eq(i).addClass('active');
          }
      });

  } else {

      $('nav').removeClass('fixed');
      $('nav a.active').removeClass('active');
      $('nav a:first').addClass('active');
  }

}).scroll();
