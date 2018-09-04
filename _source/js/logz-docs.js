$( function() {
// Auto-structure .info-box divs
$('div.info-box').wrapInner('<p></p>');

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

// tablesorter
$('table').tablesorter({ sortList: [[0,0]] });

// accordion
$( '.accordion' ).accordion({
  active: false,
  collapsible: true,
  heightStyle: 'content',
  icons: false
});

$('.branching-container').easytabs({
  animate: false,
  updateHash: true
});


// toc collapse button for smaller screens
$('#toc-collapse-btn').click( function() {
  $('.toc-container').toggleClass('toc-visibility');
});

// add copy button to all <pre> blocks
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
  }, 1000);
});


});