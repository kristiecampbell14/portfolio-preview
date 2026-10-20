/* Story hero built from layers: CSS gradient, placed clay marks, and the
   device as its own transparent PNG. */
(function () {
  const slug = new URLSearchParams(location.search).get("id") || "job-explorer";

  const MARKS = [
    ["s2a", "hex-offwhite"], ["s2b", "hex-vibrant"], ["s2c", "dot-coral-rm"],
    ["s2d", "tri-mint-rm"], ["s2e", "dot-coral-rm"], ["s2f", "hex-vibrant"],
    ["s2g", "tri-mint-rm"], ["s2h", "hex-offwhite"], ["s2i", "dot-coral-rm"]
  ];

  function build() {
    const hero = document.querySelector(".story-hero");
    const intro = document.querySelector(".story-hero__intro");
    const facts = document.querySelector(".story-facts");
    const art = document.querySelector(".story-hero__art");
    if (!hero || !intro) return false;

    document.body.classList.add("shero2-page");

    const blade = document.createElement("section");
    blade.className = "shero2";
    blade.innerHTML =
      '<div class="shero2__shapes" aria-hidden="true">' +
        MARKS.map(([c, f]) => '<img class="' + c + '" src="assets/clay/' + f + '.webp" alt="" loading="lazy" decoding="async">').join("") +
      '</div>' +
      '<div class="shero2__band" aria-hidden="true"></div>' +
      // preloaded in the head, so by the time this element exists the bytes
      // are already in cache rather than only now being requested
      '<img class="shero2__device" src="assets/clay/dev-' + slug + '.webp" alt="" aria-hidden="true" fetchpriority="high" decoding="async">' +
      '<div class="shero2__inner container"><div class="shero2__copy"></div></div>';
    blade.querySelector(".shero2__copy").appendChild(intro);

    hero.replaceWith(blade);

    if (facts) {
      const row = document.createElement("div");
      row.className = "shero2-facts container";
      row.appendChild(facts);
      blade.after(row);
    }
    if (art) art.remove();

    const headerH = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue("--header-h")) || 72;
    const onScroll = () => {
      document.body.classList.toggle("is-past-hero",
        window.scrollY > blade.offsetHeight - headerH);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return true;
  }

  if (!build()) {
    let n = 0;
    const t = setInterval(() => { if (build() || ++n > 200) clearInterval(t); }, 25);
  }
})();
