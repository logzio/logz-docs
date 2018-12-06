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

// tablesorter
$('table').tablesorter({ sortList: [[0,0]] });

// accordion
$( '.accordion' ).accordion({
  active: 0,
  collapsible: false,
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
  }, 1500);
});

// sort categories on a shipping page
var allCards = $('.mini-cards'),
  cards = allCards.children('a');

  cards.sort(function(a,b){
    var an = $(a).data('source'),
      bn = $(b).data('source');
    if(an > bn) {
      return 1;
    }
    if(an < bn) {
      return -1;
    }
    return 0;
  });
  cards.detach().appendTo(allCards);


// filter categories on a shipping page
$('.filter-btn').click(function() {
  var value = $(this).data('filter');
  if (value == 'all') {
    $('.filter').show('1000');
  } else {
    $('.filter').not('.'+value).hide('1000');
    $('.filter').filter('.'+value).show('1000');
  }
// add `active` class to clicked button, remove from other buttons
  $(this).addClass('filter-active').siblings().removeClass('filter-active');
});

});