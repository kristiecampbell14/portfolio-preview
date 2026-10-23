/* Renders a product story from SITE.stories using ?id=<slug>.
   Each block in story.blocks maps to one layout below. See js/content.js. */
(function () {
  const S = window.SITE;
  const e = window.escapeHTML;
  const root = document.querySelector("[data-story]");
  const id = new URLSearchParams(location.search).get("id");
  const stories = S.stories || [];
  const index = stories.findIndex((s) => s.slug === id);
  const story = stories[index];

  /* blank-line-separated text becomes paragraphs; **text** is bold. The
     markers are matched after escaping, so they can't smuggle in markup. */
  const inline = (t) => e(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const paras = (text, cls) =>
    String(text || "")
      .split(/\n\s*\n/)
      .filter((t) => t.trim())
      .map((t) => `<p${cls ? ` class="${cls}"` : ""}>${inline(t.trim())}</p>`)
      .join("");

  /* "01 · Discover" keeps its dot in coral, the way .eyebrow styles a span */
  const labelHTML = (text, cls) =>
    `<p class="${cls}">${String(text).split(" · ").map(e).join('<span aria-hidden="true">·</span>')}</p>`;

  /* cap a screenshot's display width so it never blows past its own resolution */
  const cap = (w) => (w ? ` style="--imgw:${Math.round(w * 1.6)}px"` : "");

  function img(b, eager) {
    if (!b.image) return "";
    const dims = b.w && b.h ? ` width="${b.w}" height="${b.h}"` : "";
    return `<img src="${e(b.image)}" alt="${e(b.alt || "")}"${dims} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />`;
  }

  /* basic geometric shapes from the brand's shape language, cycled along a line */
  const SHAPES = [
    '<polygon points="12,1.5 21,6.75 21,17.25 12,22.5 3,17.25 3,6.75" />',   // hexagon
    '<circle cx="12" cy="12" r="10" />',                                      // circle
    '<polygon points="12,3.2 21.6,20.4 2.4,20.4" />',                         // triangle
    '<rect x="2.5" y="2.5" width="19" height="19" rx="3" />',                 // square
    '<polygon points="12,1.5 22.5,12 12,22.5 1.5,12" />'                      // diamond
  ];
  const shapeSVG = (i, cls) =>
    `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${SHAPES[i % SHAPES.length]}</svg>`;

  /* a screen recording: plays itself once on first view, then replays on click */
  function film(b) {
    const dims = b.w && b.h ? ` width="${b.w}" height="${b.h}"` : "";
    const ratio = b.w && b.h ? ` style="--ratio:${b.w} / ${b.h}"` : "";
    return `<div class="plate plate--film" data-film${ratio}>
      <video class="plate__film" src="${e(b.video)}"${dims} muted playsinline preload="metadata"
        aria-label="${e(b.alt || "")}"></video>
      <button type="button" class="film__replay" data-film-replay>
        <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="8.5,5 19,12 8.5,19" /></svg>
        <span class="film__replay-text">Play</span>
      </button>
    </div>`;
  }

  /* a screenshot, optionally clipped when it is very tall (dashboards) */
  function plate(b, eager) {
    if (b.video) return film(b);
    if (!b.image) return "";
    const inner = `<div class="plate__shot">${img(b, eager)}</div>`;
    if (!b.tall) return `<div class="plate${b.bare ? " plate--bare" : ""}">${inner}</div>`;
    return `<div class="plate plate--tall">
      ${inner}
      <a class="plate__open" href="${e(b.image)}" target="_blank" rel="noopener">
        Open full screenshot <span aria-hidden="true">↗</span>
      </a>
    </div>`;
  }

  const caption = (b) => (b.caption ? `<figcaption class="story-caption">${e(b.caption)}</figcaption>` : "");

  const calloutList = (items) =>
    !items || !items.length
      ? ""
      : `<ul class="callouts">${items.map((c) => `<li>${e(c)}</li>`).join("")}</ul>`;

  /* a row of artifacts, or the same row as a sideways carousel */
  function galleryHTML(b) {
    return `${b.carousel ? `<div class="carousel" data-carousel>
          <div class="carousel__nav">
            <button type="button" class="carousel__btn" data-carousel-prev aria-label="Previous">←</button>
            <button type="button" class="carousel__btn" data-carousel-next aria-label="Next">→</button>
          </div>` : ""}
        <div class="gallery ${b.carousel ? "gallery--carousel" : `gallery--${b.cols || 2}`}"${b.carousel ? ' tabindex="0" aria-label="Scrollable gallery"' : ""}>
          ${(b.items || [])
            .map(
              (it) => `<figure class="gallery__item">
                ${plate(it)}
                ${caption(it)}
              </figure>`
            )
            .join("")}
        </div>
        ${b.carousel ? "</div>" : ""}`;
  }

  /* ------------------------------------------------------------------
     CHAPTERS: the pieces a `chapter` block's `flow` is made of
     ------------------------------------------------------------------ */

  /* stands in for a screenshot that hasn't been dropped into the repo yet */
  const pendingPlate = (it) => `<div class="plate plate--pending"${it.w && it.h ? ` style="aspect-ratio:${it.w} / ${it.h}"` : ""}>
      <p><strong>${e(it.pending)}</strong><span>${e(it.image || "")}</span></p>
    </div>`;

  /* drawn rather than screenshotted, for ideas that never shipped */
  const DIAGRAMS = {
    "learning-feed": () => {
      const card = (tag, like) =>
        `<div class="concept__card${like ? " is-like" : ""}"><i></i><i></i>${tag ? `<span>${e(tag)}</span>` : ""}</div>`;
      return `<div class="concept" role="img" aria-label="Unbuilt concept: the jobs a student opened, scrolled through and clicked Apply Now on lead the feed to surface more jobs like them.">
        <p class="concept__tag">Unbuilt concept</p>
        <div class="concept__col">
          <p class="concept__head">What a student engaged with</p>
          ${card("Opened")}${card("Scrolled through")}${card("Clicked Apply Now")}
        </div>
        <svg class="concept__arrow" viewBox="0 0 48 24" aria-hidden="true"><path d="M2 12h40M32 4l10 8-10 8" /></svg>
        <div class="concept__col">
          <p class="concept__head">What the feed shows next</p>
          ${card("More like these", true)}${card("", true)}${card("", true)}${card("")}
        </div>
      </div>`;
    },

    /* real screens as nodes, with labelled arrows for where information
       flows between them; `edges[i]` sits between `nodes[i]` and `nodes[i + 1]` */
    connections: (it) => {
      const arrow = (dir) =>
        `<svg class="links__arrow${dir === "left" ? " links__arrow--back" : ""}" viewBox="0 0 48 16" aria-hidden="true"><path d="M2 8h42M36 2l8 6-8 6" /></svg>`;
      const node = (n) => `<div class="links__node${n.hub ? " links__node--hub" : ""}">
          <div class="links__shot"><img src="${e(n.src)}" alt="" width="${n.w}" height="${n.h}" loading="lazy" decoding="async" /></div>
          <p class="links__label">${e(n.label)}</p>
        </div>`;
      const edge = (labels) => `<div class="links__edge">
          ${labels.map((l) => `<p>${arrow(l.dir)}<span>${e(l.text)}</span></p>`).join("")}
        </div>`;
      const parts = [];
      (it.nodes || []).forEach((n, i) => {
        parts.push(node(n));
        if (it.edges && it.edges[i]) parts.push(edge(it.edges[i]));
      });
      return `<div class="links" role="img" aria-label="${e(it.alt || "")}">${parts.join("")}</div>`;
    }
  };

  /* One screenshot that opens the way the product does: the bar, a panel
     that unfolds under it, and the content it pushes down. Built from two
     real states sliced at the same lines, so nothing in between is drawn. */
  /* A pill switch with a "Try it" arrow beside it. Without the arrow a
     switch reads as a label, not something to press. */
  const tryControls = (label, buttons) => `<div class="fig-controls">
        <div class="fig-switch" role="group" aria-label="${e(label)}">${buttons}</div>
        <p class="try-hint" aria-hidden="true">
          <svg viewBox="0 0 40 24"><path d="M37 19C27 22 14 19 6 8" /><path d="M5 7l1.5 7.5M5 7l7.5 1.5" /></svg>
          Try it
        </p>
      </div>`;

  function unfoldPlate(u) {
    const im = (s, cls) =>
      `<img${cls ? ` class="${cls}"` : ""} src="${e(s.src)}" alt="${e(s.alt || "")}" width="${u.w}" height="${s.h}" loading="lazy" decoding="async" />`;
    return `${tryControls(
        "AI summary",
        `<button type="button" aria-pressed="true" data-unfold-to="closed">Collapsed</button>
         <button type="button" aria-pressed="false" data-unfold-to="open">Expanded</button>`
      )}
      <div class="plate unfold__plate">
        <div class="unfold__bar" data-unfold-bar>
          ${im(u.barClosed, "unfold__bar-closed")}
          ${im(u.barOpen, "unfold__bar-open")}
        </div>
        <div class="unfold__panel" aria-hidden="true"><div>${im(u.panel)}</div></div>
        <div class="unfold__rest">${im(u.rest)}</div>
      </div>`;
  }

  /* A real question and its real answers. The rows of the question screenshot
     are buttons placed over it (positions in the screenshot's own pixels),
     and picking one, there or on the switch, shows the follow-up that
     choice got. The first option starts selected, so the answer is never
     empty. */
  function pickerHTML(p) {
    const q = p.prompt;
    const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;
    const first = p.options[0];
    const rows = p.options
      .map(
        (o, i) => `<button type="button" class="pick__row" data-pick="${i}" aria-pressed="${i === 0}"
          data-dot-x="${pct(o.dot[0], q.w)}" data-dot-y="${pct(o.dot[1], q.h)}" data-caption="${e(o.caption)}"
          style="top:${pct(o.row[0], q.h)};height:${pct(o.row[1] - o.row[0], q.h)}">
          <span class="sr-only">${e(o.statement)}</span>
        </button>`
      )
      .join("");
    const answers = p.options
      .map(
        (o, i) => `<img class="${i === 0 ? "is-active" : ""}" src="${e(o.src)}" alt="${e(o.alt)}"
          width="${p.answerW}" height="${p.answerH}" loading="lazy" decoding="async"${i === 0 ? "" : ' aria-hidden="true"'} />`
      )
      .join("");
    return `<div class="pick" data-pick-root
        style="--dot-x:${pct(first.dot[0], q.w)};--dot-y:${pct(first.dot[1], q.h)}">
      <figure class="chapter__fig pick__question">
        ${p.label ? `<p class="chapter__fig-label">${e(p.label)}</p>` : ""}
        <div class="plate pick__plate">
          <img src="${e(q.src)}" alt="${e(q.alt)}" width="${q.w}" height="${q.h}" loading="lazy" decoding="async" />
          <span class="pick__dot" aria-hidden="true"></span>
          ${rows}
        </div>
        ${p.caption ? `<figcaption class="story-caption">${e(p.caption)}</figcaption>` : ""}
      </figure>
      <figure class="chapter__fig pick__answer">
        ${p.answerLabel ? `<p class="chapter__fig-label">${e(p.answerLabel)}</p>` : ""}
        ${tryControls(
          p.switchLabel || "Choose a statement",
          p.options
            .map((o, i) => `<button type="button" aria-pressed="${i === 0}" data-pick="${i}">${e(o.name)}</button>`)
            .join("")
        )}
        <div class="plate pick__stack">${answers}</div>
        <figcaption class="story-caption" data-pick-caption aria-live="polite">${e(first.caption)}</figcaption>
      </figure>
    </div>`;
  }

  function chapterFigure(it) {
    const art = it.pending ? pendingPlate(it) : it.diagram ? DIAGRAMS[it.diagram](it) : it.unfold ? unfoldPlate(it.unfold) : plate(it);
    /* `maxw` keeps a supporting artifact smaller than its own resolution allows */
    const size = it.maxw ? ` style="--imgw:${Math.round(it.maxw)}px"` : cap(it.w);
    return `<figure class="chapter__fig${it.strip ? " chapter__fig--strip" : ""}"${it.unfold ? " data-unfold" : ""}${size}>
      ${it.tag ? `<p class="fig-tag">${e(it.tag)}</p>` : ""}
      ${it.label ? `<p class="chapter__fig-label">${e(it.label)}</p>` : ""}
      ${art}
      ${it.notes ? `<ul class="fig-notes">${it.notes.map((n) => `<li>${e(n)}</li>`).join("")}</ul>` : ""}
      ${caption(it)}
    </figure>`;
  }

  /* a string is copy; anything else is a pulled-out stance, media, a stat
     pair or a carousel. Media is `wide` (both columns) or `inset` (under the
     copy). */
  function chapterFlow(f) {
    if (typeof f === "string") return `<div class="chapter__text">${paras(f)}</div>`;
    if (f.pull)
      return `<div class="chapter__pull">
        ${f.label ? `<p class="eyebrow">${e(f.label)}</p>` : ""}
        <p class="chapter__pull-quote">${inline(f.pull)}</p>
        ${paras(f.body)}
      </div>`;
    if (f.stats)
      return `<div class="chapter__stats">
        ${f.label ? `<p class="eyebrow">${e(f.label)}</p>` : ""}
        <div class="chapter__stat-row">
          ${f.stats.map((s) => `<div class="chapter__stat"><strong>${e(s.value)}</strong><span>${e(s.label)}</span></div>`).join("")}
        </div>
        ${paras(f.body)}
      </div>`;
    if (f.carousel) return `<div class="chapter__media chapter__media--wide">${galleryHTML(f)}</div>`;
    if (f.picker) return `<div class="chapter__media chapter__media--wide">${pickerHTML(f.picker)}</div>`;
    const items = f.items || [f];
    const ratio = f.ratio ? ` chapter__media--${e(f.ratio)}` : "";
    /* `stack` puts the items one under another, at one shared width */
    const count = f.stack ? "stack" : `${items.length}up`;
    return `<div class="chapter__media chapter__media--${e(f.width || "wide")} chapter__media--${count}${ratio}">
      ${items.map(chapterFigure).join("")}
    </div>`;
  }

  /* ------------------------------------------------------------------
     BLOCKS
     ------------------------------------------------------------------ */
  const BLOCKS = {
    figure: (b) => `
      <figure class="story-block story-figure story-figure--${e(b.width || "wide")} reveal"${cap(b.w)}>
        ${plate(b)}
        ${caption(b)}
      </figure>`,

    split: (b) => `
      <section class="story-block story-split story-split--${e(b.ratio || "40-60")}${b.flip ? " is-flipped" : ""} reveal">
        <div class="story-split__copy">
          ${b.heading ? `<h2 class="story-h2">${e(b.heading)}</h2>` : ""}
          ${b.subhead ? `<p class="story-subhead">${e(b.subhead)}</p>` : ""}
          ${paras(b.body)}
        </div>
        <figure class="story-split__art"${cap(b.w)}>
          ${plate(b)}
          ${caption(b)}
        </figure>
      </section>`,

    statement: (b) => `
      <section class="story-block story-statement reveal">
        ${b.heading ? `<h2 class="story-h2">${e(b.heading)}</h2>` : ""}
        ${b.quote ? `<p class="story-pull">${e(b.quote)}</p>` : ""}
        <div class="story-statement__body">${paras(b.body)}</div>
      </section>`,

    timeline: (b) => `
      <section class="story-block story-evolution reveal">
        ${b.heading ? `<h2 class="story-eyebrow-h">${e(b.heading)}</h2>` : ""}
        <ol class="evo">
          ${(b.nodes || [])
            .map(
              (n, i) => `<li class="evo__node">
                ${shapeSVG(i, "evo__dot")}
                <span class="evo__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
                <span class="evo__label">${e(n)}</span>
              </li>`
            )
            .join("")}
        </ol>
      </section>`,

    steps: (b) => `
      <section class="story-block story-steps reveal">
        ${b.heading ? `<h2 class="story-eyebrow-h">${e(b.heading)}</h2>` : ""}
        <ol class="steps">
          ${(b.items || [])
            .map(
              (s) => `<li class="step">
                <p class="step__label">${e(s.label)}</p>
                <p class="step__body">${e(s.body)}</p>
              </li>`
            )
            .join("")}
        </ol>
      </section>`,

    metrics: (b) => `
      <section class="story-block story-metrics reveal">
        <div class="metric-strip${b.rule === false ? " metric-strip--flush" : ""}">
          ${(b.items || [])
            .map(
              (m) => `<div class="metric">
                <strong>${e(m.value)}</strong>
                <span>${e(m.label)}</span>
              </div>`
            )
            .join("")}
        </div>
        ${b.note ? `<p class="story-note">${e(b.note)}</p>` : ""}
      </section>`,

    annotated: (b) => `
      <section class="story-block story-annotated${b.align === "center" ? " is-centered" : ""} reveal">
        ${b.heading ? `<h2 class="story-h2">${e(b.heading)}</h2>` : ""}
        ${b.body ? `<div class="story-annotated__lede">${paras(b.body)}</div>` : ""}
        ${
          b.image || b.video
            ? `<figure class="story-annotated__art"${cap(b.w)}>
                 ${plate(b)}
                 ${caption(b)}
               </figure>`
            : ""
        }
        ${calloutList(b.callouts)}
        ${b.kicker ? `<p class="story-kicker">${e(b.kicker)}</p>` : ""}
      </section>`,

    gallery: (b) => `
      <section class="story-block story-gallery reveal">
        ${b.heading ? `<h2 class="story-h2">${e(b.heading)}</h2>` : ""}
        ${b.body ? `<div class="story-gallery__lede">${paras(b.body)}</div>` : ""}
        ${galleryHTML(b)}
      </section>`,

    /* one section of a chaptered case study: a label, a heading that says what
       I did, then copy and media in the order `flow` lists them */
    chapter: (b) => `
      <section class="story-block chapter reveal"${b.id ? ` id="${e(b.id)}"` : ""}>
        <header class="chapter__head">
          ${b.label ? labelHTML(b.label, "eyebrow chapter__label") : ""}
          <h2 class="story-h2">${e(b.heading)}</h2>
        </header>
        ${(b.flow || []).map(chapterFlow).join("")}
      </section>`,

    cards: (b) => `
      <section class="story-block story-cards reveal">
        ${b.heading ? `<h2 class="story-h2">${e(b.heading)}</h2>` : ""}
        <div class="decisions">
          ${(b.items || [])
            .map(
              (c, i) => `<article class="decision">
                <span class="decision__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
                <h3>${e(c.title)}</h3>
                <p>${e(c.body)}</p>
              </article>`
            )
            .join("")}
        </div>
      </section>`,

    impact: (b) => `
      <section class="story-impact"${b.id ? ` id="${e(b.id)}"` : ""}>
        <div class="container">
          ${labelHTML(b.label || "Impact", "eyebrow")}
          ${b.heading ? `<h2 class="story-impact__h reveal">${e(b.heading)}</h2>` : ""}
          <div class="impact-primary reveal">
            <strong>${e(b.primary.value)}</strong>
            <span>${e(b.primary.label)}</span>
          </div>
          ${
            (b.secondary || []).length
              ? `<div class="impact-secondary">
                   ${b.secondary
                     .map(
                       (m) => `<div class="impact-sec reveal">
                         <strong>${e(m.value)}</strong>
                         <span>${e(m.label)}</span>
                       </div>`
                     )
                     .join("")}
                 </div>`
              : ""
          }
          ${b.body ? `<div class="impact-body reveal">${paras(b.body)}</div>` : ""}
        </div>
      </section>`,

    closing: (b) => `
      <section class="story-block story-closing reveal">
        ${b.heading ? `<h2 class="story-h2">${e(b.heading)}</h2>` : ""}
        ${paras(b.body)}
        ${b.end ? `<p class="story-end">${e(b.end)}</p>` : ""}
      </section>`,

    prose: (b) => `
      <section class="story-block story-prose${b.align === "center" ? " is-centered" : ""} reveal">
        ${b.heading ? `<h2 class="story-h2">${e(b.heading)}</h2>` : ""}
        ${paras(b.body)}
      </section>`,

    /* same markup as the homepage recommendations, so it inherits their styling */
    quote: (b) => `
      <section class="story-block story-quote reveal">
        ${b.heading ? `<h2 class="story-eyebrow-h">${e(b.heading)}</h2>` : ""}
        <figure class="quote">
          <blockquote>${e(b.quote)}</blockquote>
          <figcaption>
            ${b.initials ? `<span class="avatar" aria-hidden="true">${e(b.initials)}</span>` : ""}
            <span><cite>${e(b.name)}</cite>${b.title ? `<span class="who">${e(b.title)}</span>` : ""}</span>
          </figcaption>
        </figure>
      </section>`
  };

  /* ------------------------------------------------------------------
     GATE / NOT FOUND
     ------------------------------------------------------------------ */
  function renderGate() {
    root.innerHTML = `
      <section class="project-gate">
        <form class="gate__card" data-gate-form>
          <svg class="gate__icon" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5" /><rect x="36" y="48" width="28" height="22" rx="3" /><path d="M42 48v-7a8 8 0 0 1 16 0v7" /></svg>
          <h1 style="font-size:24px;margin-bottom:10px">This product story is password protected</h1>
          <p>Enter the password to continue.</p>
          <div class="gate__row">
            <label class="sr-only" for="pw">Password</label>
            <div class="gate__pw-wrap">
              <input id="pw" type="password" autocomplete="current-password" placeholder="Password" required autofocus data-clarity-mask="true" />
              <button type="button" class="gate__pw-toggle" data-pw-toggle aria-label="Show password" aria-pressed="false">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path class="eye-shape" d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                  <circle class="eye-shape" cx="12" cy="12" r="3" />
                  <line class="eye-slash" x1="3" y1="3" x2="21" y2="21" />
                </svg>
              </button>
            </div>
            <button class="btn btn--primary" type="submit">Unlock</button>
          </div>
          <p class="gate__error" role="alert"></p>
        </form>
      </section>`;
    const form = root.querySelector("form");
    window.wirePasswordToggle(form);
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const input = form.querySelector("input");
      if (await window.Gate.tryUnlock(input.value)) {
        render();
      } else {
        form.querySelector(".gate__error").textContent = "That password didn't work. Try again?";
        form.classList.remove("shake");
        void form.offsetWidth;
        form.classList.add("shake");
        input.select();
      }
    });
  }

  function renderNotFound() {
    root.innerHTML = `
      <section class="project-gate"><div class="not-found">
        <h1>Story not found</h1>
        <p>That product story doesn't exist, or its link has changed.</p>
        <a class="btn btn--primary" href="index.html#work">Back to work</a>
      </div></section>`;
  }

  /* ------------------------------------------------------------------
     STORY
     ------------------------------------------------------------------ */
  function factValue(v) {
    return Array.isArray(v)
      ? v.map((line) => `<span>${e(line)}</span>`).join("")
      : `<span>${e(v)}</span>`;
  }

  /* `next` is one { slug, bridge } or a list of two, each with a `label`, when
     the reader should choose (keep going in the same product, or switch company) */
  function nextStories(p) {
    const refs = Array.isArray(p.next) ? p.next : [p.next || {}];
    const fallback = stories[(index + 1) % stories.length];
    const picks = refs
      .map((ref) => ({ ref, s: stories.find((s) => s.slug === ref.slug) || (refs.length === 1 ? fallback : null) }))
      .filter((n) => n.s && n.s.slug !== p.slug);
    if (!picks.length) return "";

    const href = (n) => `story.html?id=${encodeURIComponent(n.s.slug)}`;
    const bridge = (n) => (n.ref.bridge ? `<p class="next-story__bridge">${e(n.ref.bridge)}</p>` : "");
    const title = (n) => `<h2>${e(n.s.title)} <span aria-hidden="true">→</span></h2>`;

    if (picks.length === 1) {
      const n = picks[0];
      return `<a class="next-story container" href="${href(n)}">
          <p class="eyebrow">Next story</p>
          ${bridge(n)}
          ${title(n)}
        </a>`;
    }

    /* the last word rides with the arrow, so a wrapping title never strands it */
    const pairTitle = (n) => {
      const words = n.s.title.split(" ");
      const last = words.pop();
      return `<h2>${e(words.join(" "))} <span class="next-story__end">${e(last)} <span aria-hidden="true">→</span></span></h2>`;
    };

    return `<nav class="next-stories container" aria-label="Next stories">
        <p class="eyebrow">Where to next</p>
        <div class="next-stories__grid">
          ${picks
            .map(
              (n) => `<a class="next-story next-story--pair" href="${href(n)}">
                ${n.ref.label ? `<p class="next-story__label">${e(n.ref.label)}</p>` : ""}
                ${bridge(n)}
                ${pairTitle(n)}
              </a>`
            )
            .join("")}
        </div>
      </nav>`;
  }

  /* `impact` is a full-bleed colour band, so it can't sit inside the padded
     body column. Blocks are emitted in runs: contained groups around it. */
  const FULL_BLEED = new Set(["impact"]);

  /* Blocks that share a `group` are wrapped together under that id, so one
     anchor in the section nav can cover several chapters. */
  function renderBody(blocks) {
    const out = [];
    let run = [];
    let group = null;
    let grouped = [];
    const closeGroup = () => {
      if (grouped.length) run.push(`<div class="chapter-group" id="${e(group)}">${grouped.join("")}</div>`);
      grouped = [];
      group = null;
    };
    const flush = () => {
      closeGroup();
      if (!run.length) return;
      out.push(`<div class="story-body container">${run.join("")}</div>`);
      run = [];
    };
    blocks.forEach((b) => {
      const html = BLOCKS[b.type] ? BLOCKS[b.type](b) : "";
      if (!html) return;
      if (FULL_BLEED.has(b.type)) {
        flush();
        out.push(html);
        return;
      }
      if (b.group !== group) closeGroup();
      if (b.group) {
        group = b.group;
        grouped.push(html);
      } else {
        run.push(html);
      }
    });
    flush();
    return out.join("");
  }

  /* Screen recordings play themselves once when they first scroll into view,
     then sit on their last frame until the viewer asks for another pass. */
  function wireFilms(scope) {
    scope.querySelectorAll("[data-film]").forEach((wrap) => {
      const video = wrap.querySelector("video");
      const replay = wrap.querySelector("[data-film-replay]");
      const label = wrap.querySelector(".film__replay-text");
      if (!video) return;

      /* if the browser refuses to autoplay, fall back to offering the button */
      const stall = () => {
        wrap.classList.remove("is-playing");
        wrap.classList.add("is-done");
      };

      const setLabel = (text, aria) => {
        if (label) label.textContent = text;
        if (replay) replay.setAttribute("aria-label", aria);
      };

      /* picks up where a pause left it; only a finished clip starts over */
      const play = () => {
        wrap.classList.add("is-playing");
        wrap.classList.remove("is-done");
        if (video.readyState > 0 && video.ended) video.currentTime = 0;
        const p = video.play();
        if (p && p.catch) p.catch(stall);
      };

      /* a click while it runs stops it, so nobody has to sit through it */
      const pause = () => {
        video.pause();
        wrap.classList.remove("is-playing");
        wrap.classList.add("is-done");
        setLabel("Play", "Play the dashboard walkthrough");
      };
      const toggle = () => (wrap.classList.contains("is-playing") ? pause() : play());

      video.addEventListener("ended", () => {
        wrap.classList.remove("is-playing");
        wrap.classList.add("is-done");
        setLabel("Replay", "Replay the dashboard walkthrough");
      });

      if (replay) replay.addEventListener("click", toggle);
      video.addEventListener("click", toggle);

      /* autoplay is only honoured muted, and only once the clip is on screen */
      if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        wrap.classList.add("is-done");
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            play();
          });
        },
        { threshold: 0.45 }
      );
      io.observe(wrap);
    });
  }

  /* An unfolding screenshot opens once when it scrolls into view, then the
     switch, or the bar in the screenshot itself, flips it either way. With
     reduced motion it waits to be asked and changes without the slide. */
  function wireUnfolds(scope) {
    scope.querySelectorAll("[data-unfold]").forEach((fig) => {
      const panel = fig.querySelector(".unfold__panel");
      const btns = [...fig.querySelectorAll("[data-unfold-to]")];
      let touched = false;
      const set = (open) => {
        fig.classList.toggle("is-open", open);
        panel.setAttribute("aria-hidden", String(!open));
        btns.forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.unfoldTo === "open") === open)));
      };
      btns.forEach((b) =>
        b.addEventListener("click", () => {
          touched = true;
          set(b.dataset.unfoldTo === "open");
        })
      );
      fig.querySelector("[data-unfold-bar]").addEventListener("click", () => {
        touched = true;
        set(!fig.classList.contains("is-open"));
      });

      if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      /* a beat first, so the closed state registers before it opens; once
         it has, the "try it" arrow nudges toward the switch. It only opens if
         it is still on screen by then: a nav jump that merely passes it would
         otherwise grow the page above wherever the jump lands. */
      let timer = 0;
      const io = new IntersectionObserver(
        (entries) => {
          const onScreen = entries.some((entry) => entry.isIntersecting);
          clearTimeout(timer);
          if (!onScreen) return;
          timer = setTimeout(() => {
            io.disconnect();
            if (touched) return;
            set(true);
            setTimeout(() => fig.classList.add("is-nudged"), 1000);
          }, 900);
        },
        { threshold: 0.6 }
      );
      io.observe(fig.querySelector(".unfold__plate"));
    });
  }

  /* Pickers: a row in the question or a button on the switch shows that
     answer. Nothing changes on its own, since a reader is mid-sentence;
     the arrow nudges once instead, when the pair comes into view. */
  function wirePickers(scope) {
    scope.querySelectorAll("[data-pick-root]").forEach((root) => {
      const rows = [...root.querySelectorAll(".pick__row")];
      const btns = [...root.querySelectorAll(".fig-switch [data-pick]")];
      const imgs = [...root.querySelectorAll(".pick__stack img")];
      const cap = root.querySelector("[data-pick-caption]");
      const select = (i) => {
        const row = rows[i];
        root.style.setProperty("--dot-x", row.dataset.dotX);
        root.style.setProperty("--dot-y", row.dataset.dotY);
        [...rows, ...btns].forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.pick === i)));
        imgs.forEach((im, k) => {
          im.classList.toggle("is-active", k === i);
          if (k === i) im.removeAttribute("aria-hidden");
          else im.setAttribute("aria-hidden", "true");
        });
        if (cap) cap.textContent = row.dataset.caption;
      };
      [...rows, ...btns].forEach((b) => b.addEventListener("click", () => select(+b.dataset.pick)));

      if (!("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          io.disconnect();
          setTimeout(() => root.classList.add("is-nudged"), 600);
        },
        { threshold: 0.5 }
      );
      io.observe(root.querySelector(".pick__answer"));
    });
  }

  /* carousels: arrow buttons scroll one card at a time; disabled at either end */
  function wireCarousels(scope) {
    scope.querySelectorAll("[data-carousel]").forEach((wrap) => {
      const track = wrap.querySelector(".gallery--carousel");
      const prev = wrap.querySelector("[data-carousel-prev]");
      const next = wrap.querySelector("[data-carousel-next]");
      if (!track) return;
      const step = () => {
        const item = track.querySelector(".gallery__item");
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
      };
      const sync = () => {
        const max = track.scrollWidth - track.clientWidth - 2;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= max;
      };
      prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
      track.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      sync();
    });
  }

  /* Chaptered stories put their sections in the bar and track them as you
     read. On narrow screens the list scrolls sideways, so the current one is
     kept in view. */
  function buildNav(p) {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const links = [
      { id: "overview", nav: "Overview" },
      ...(p.blocks || []).filter((b) => b.nav && (b.group || b.id)).map((b) => ({ id: b.group || b.id, nav: b.nav }))
    ];
    const nav = document.createElement("nav");
    nav.className = "story-nav";
    nav.setAttribute("aria-label", "Case study sections");
    nav.innerHTML = `<ul>${links.map((l) => `<li><a href="#${e(l.id)}">${e(l.nav)}</a></li>`).join("")}</ul>`;
    header.insertBefore(nav, header.querySelector(".close-link"));
    document.documentElement.classList.add("has-story-nav");
    window.wireNavSpy(nav, (a) => {
      if (!a || nav.scrollWidth <= nav.clientWidth) return;
      nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
    });
  }

  function render() {
    const p = story;
    document.title = `${p.title} · Kristie Campbell`;

    const facts = p.facts || [];
    const blocks = p.blocks || [];
    const chaptered = p.layout === "chapters";
    if (chaptered) document.body.classList.add("story-chapters");

    /* the hero image is the first block when it's a full-width figure, so it
       can render eagerly and sit tight under the intro */
    const heroFigure = blocks[0] && blocks[0].type === "figure" ? blocks[0] : null;
    const rest = heroFigure ? blocks.slice(1) : blocks;

    /* a chaptered story trades the facts list for two plain statements: what
       I did, and the one number worth remembering */
    const overview = (p.overview || []).length
      ? `<section class="story-overview container" aria-label="Overview">
           ${p.overview
             .map(
               (o) => `<div class="story-overview__item">
                 <p class="eyebrow">${e(o.label)}</p>
                 ${o.value ? `<p class="story-overview__value">${e(o.value)}</p>` : ""}
                 ${paras(o.body)}
               </div>`
             )
             .join("")}
         </section>`
      : "";

    root.innerHTML = `
      <article class="story">
        ${chaptered ? '<div id="overview">' : ""}
        <header class="story-hero container">
          <div class="story-hero__intro">
            ${p.eyebrow ? `<p class="eyebrow">${e(p.eyebrow)}</p>` : ""}
            <h1 class="story-title">${e(p.title)}</h1>
            ${p.headline ? `<p class="story-headline">${e(p.headline)}</p>` : ""}
            ${p.intro ? `<div class="story-lede">${paras(p.intro)}</div>` : ""}
          </div>
          ${
            facts.length
              ? `<dl class="story-facts">
                   ${facts
                     .map(
                       (f) => `<div><dt>${e(f.label)}</dt><dd>${factValue(f.value)}</dd></div>`
                     )
                     .join("")}
                 </dl>`
              : ""
          }
        </header>
        ${overview}
        ${chaptered ? "</div>" : ""}

        ${
          heroFigure
            ? `<figure class="story-hero__art container"${cap(heroFigure.w)}>
                 ${plate(heroFigure, true)}
                 ${caption(heroFigure)}
               </figure>`
            : ""
        }

        ${renderBody(rest)}

        ${nextStories(p)}
      </article>`;

    window.observeReveals(root);
    wireFilms(root);
    wireUnfolds(root);
    wirePickers(root);
    wireCarousels(root);
    if (chaptered) buildNav(p);
    window.scrollTo(0, 0);
  }

  if (!story) renderNotFound();
  else if (!window.Gate.isUnlocked()) renderGate();
  else render();
})();
