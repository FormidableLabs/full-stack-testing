(function () {
  /*global $*/
  // Remove the README header.
  $("h2#full-stack-testing-").remove();

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
})();
