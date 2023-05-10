document.addEventListener("DOMContentLoaded", function() {
    function generateTOC(tabContent, tocContainer) {
      const headings = tabContent.find('h1, h2, h3, h4, h5, h6');
      let tocList = '';
  
      headings.each((index, heading) => {
        const anchorId = `${tabContent.attr('id')}-heading-${index}`;
        $(heading).attr('id', anchorId);
  
        tocList += `<li><a href="#${anchorId}">${heading.innerText}</a></li>`;
      });
  
      tocContainer.html(`<ul>${tocList}</ul>`);
    }
  
    function switchTab(e) {
      e.preventDefault();
  
      const targetTabId = $(this).attr('href').slice(1);
      const allTabs = $('.tab-content');
      const allBranchingTabs = $('.branching-tabs');
  
      allTabs.hide();
      allBranchingTabs.removeClass('active');
  
      $(`#${targetTabId}`).show();
      $(this).addClass('active');
    }
  
    $(document).ready(function() {
      const tabContents = $('.tab-content');
      tabContents.each(function() {
        const tocContainer = $(this).find('.toc-container');
        generateTOC($(this), tocContainer);
      });
  
      const branchingTabs = $('.branching-tabs');
      branchingTabs.on('click', switchTab);
  
      // Show the first tab as the default active tab
      const firstTabId = branchingTabs.first().attr('href').slice(1);
      $(`#${firstTabId}`).show();
      branchingTabs.first().addClass('active');
    });
  });
  