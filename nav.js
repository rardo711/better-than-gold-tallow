(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".mobile-nav");
  if (!toggle || !nav) return;

  var scrim = document.createElement("div");
  scrim.className = "nav-scrim";
  scrim.setAttribute("aria-hidden", "true");
  document.body.appendChild(scrim);

  function setOpen(open) {
    nav.classList.toggle("open", open);
    scrim.classList.toggle("show", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  scrim.addEventListener("click", function () {
    setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) setOpen(false);
  });
})();
