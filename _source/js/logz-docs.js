// Auto-populate .feature-box divs. These are the "available in Pro, Enterprise, Community" graphics
$('div.feature-box').ready(function() {
  $('div.feature-box.enterprise').append('<span class="available-in">Available in</span><span class="community">Community</span><span class="pro">Pro</span><span class="enterprise yes">Enterprise</span>');
  $('div.feature-box.pro').append('<span class="available-in">Available in</span><span class="community">Community</span><span class="pro yes">Pro</span><span class="enterprise yes">Enterprise</span>');
  $('div.feature-box.community').append('<span class="available-in">Available in</span><span class="community yes">Community</span><span class="pro yes">Pro</span><span class="enterprise yes">Enterprise</span>');
});


// Auto-structure .info-box divs
$('div.info-box').ready( function() {
  $('div.info-box').wrapInner('<p></p>');
});

// Show/hide animations for left-side TOC. Also animates caret icon.
$('nav.all-pages-toc').ready( function() {
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
$("table").ready( function() {
  $("table").tablesorter({ sortList: [[0,0]] });
});
