// This script controls behavior of left menu. This is the TOC for the entire docs site. Contains 2 levels of hierarchy.

$(document).ready( function() {
  // on page load, hide child ul unless this item or child is .active-page
  $('.active-page').parent('ul.child').show();
  $('.active-page').children('ul.child').show();

  // toggle submenu when parent caret is clicked
  $('.menu-icon').click(function() {
    $(this).parent().children('ul.child').slideToggle();
  });

  });
