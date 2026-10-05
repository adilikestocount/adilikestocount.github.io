// Dark-mode toggle for the .theme-fab button.
// The inline script in <head> sets the initial theme; this handles clicks.
(function () {
  var btn = document.querySelector(".theme-fab");
  if (!btn) return;
  var root = document.documentElement;

  function sync() {
    var isDark = root.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
  }
  sync();

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });
})();
