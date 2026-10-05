(function () {
  var root = document.documentElement;

  // Dark-mode toggle. The inline script in <head> sets the initial theme;
  // this flips it on click and remembers the choice.
  var themeBtn = document.querySelector(".theme-fab");
  if (themeBtn) {
    var syncTheme = function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    };
    syncTheme();
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncTheme();
    });
  }

  // Mobile menu. On small screens the CSS hides the sidebar .card
  // unless it has the class "open".
  var navBtn = document.querySelector(".nav-toggle");
  var card = document.querySelector(".card");
  if (navBtn && card) {
    navBtn.addEventListener("click", function () {
      var open = card.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
      navBtn.textContent = open ? "CLOSE" : "MENU";
    });
  }

  // Fade-in on scroll. The CSS keeps .reveal sections invisible
  // until they get the class "is-visible".
  var sections = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    sections.forEach(function (el) { observer.observe(el); });
  }
})();
