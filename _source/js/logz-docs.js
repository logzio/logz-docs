$( function() {
  // Show/hide animations for left-side TOC. Also animates caret icon.
  $('ul.toc-child > li.toc-active').find('ul.toc-grandchild').show().addClass('show').siblings('span.toc-heading').find('span.collapse-button').addClass('show');
  $('ul.toc-grandchild > li.toc-active').parent('ul.toc-grandchild').show().addClass('show').siblings('span.toc-heading').find('span.collapse-button').addClass('show');

  $('ul.toc-child').find('li.has-child > span.toc-heading').on('click', function() {
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
  $('table').tablesorter({ sortList: [[0,0]] });
});

$(function() {
  $('.branching-container').easytabs({
    animate: false,
    updateHash: false
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

// filter categories on a shipping page
$(function() {
  $('.filter-btn').click(function() {
    var value = $(this).data('filter');
    if (value == 'all') {
      $('.filter').show();
    } else {
      $('.filter').hide();
      $('.filter').filter('.'+value).show();
    }
    // add `active` class to clicked button, remove from other buttons
    $(this).addClass('filter-active').siblings().removeClass('filter-active');
  });

// reset on tab click
$('.branching-tabs > li > a').click(function() {
  $('.branching-tabs li  a').removeClass('visit');
  $(this).addClass('visit');

  if($(this).hasClass('visit')){
    $('.filter').show();
    $('.filter-btn[data-filter="all"').addClass('filter-active').siblings().removeClass('filter-active');
  }
});

});