(function () {
  /*global $*/
  // --------------------------------------------------------------------------
  // UI Extras
  // --------------------------------------------------------------------------
  // Populate offcanvas menu if Jasny detected.
  var $nav = $("#nav");
  if ($nav.offcanvas) {
    var $navContent = $(".navmenu-nav");

    // Convert headings to menu items.
    $("h2,h3").each(function () {
      var $heading = $(this);

      $("<li><a /></li>")
        .clone().appendTo($navContent)
        .addClass("nav-item nav-item-" + $heading.prop("tagName"))
        .find("> a")
          .attr("href", "#" + $heading.prop("id"))
          .text($heading.text());
    });

    // Close menu on any click.
    $("#nav, #home, li.nav-item > a").click(function () {
      $nav.offcanvas("hide");
    });

  } else {
    // Hide the nav wrapper if no offcanvas nav available.
    $(".nav-wrapper").hide();
  }

  // Add highlighting.
  if (window.hljs) {
    $("pre code").each(function (i, block) {
      var cls = $(block).attr("class");

      // Highlight all `lang-*` classed blocks.
      if (cls && cls.indexOf("lang") === 0) {
        window.hljs.highlightBlock(block);
      }
    });
  }
})();
