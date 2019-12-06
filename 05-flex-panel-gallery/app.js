(function() {
  const panels = document.querySelectorAll(".panel");

  function toggle() {
    this.classList.toggle("open");
  }

  function toggleActive(e) {
    // Safari propertyName is just flex when grow
    if (e.propertyName.includes("flex")) {
      this.classList.toggle("open-active");
    }
  }

  panels.forEach(panel => panel.addEventListener("click", toggle));
  panels.forEach(panel =>
    panel.addEventListener("transitionend", toggleActive)
  );
})();
