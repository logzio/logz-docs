// Auto-structure .info-box divs
$( function() {
  $('div.info-box').wrapInner('<p></p>');
});

// Show/hide animations for left-side TOC. Also animates caret icon.
$( function() {
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
$( function() {
  $('table').tablesorter({ sortList: [[0,0]] });
});

// accordion
$( function() {
  $( '.accordion' ).accordion({
    active: false,
    collapsible: true,
    heightStyle: 'content',
    icons: { 'header': 'ui-icon-caret-1-e', 'activeHeader': 'ui-icon-caret-1-s' }
  });
} );

// accordion test to expand the section you're writing. comment this out when you're done writing.
// $( function() { $('.accordion').accordion({ active: 3 }) });

$( function() {
  $('#toc-collapse-btn').click( function() {
    $('.toc-container').toggleClass('toc-visibility');
  });
});