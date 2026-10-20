# Portfolio preview

A throwaway copy of [kristiecampbell14/Portfolio](https://github.com/kristiecampbell14/Portfolio),
published on its own so work in progress can be shared for feedback without
touching the live site. The live site is still
`https://kristiecampbell14.github.io/Portfolio/` and is unaffected by anything here.

Preview: **https://kristiecampbell14.github.io/portfolio-preview/**

## What is different from the live site

| | |
| --- | --- |
| **Work section** | The flat carousel is replaced by the 3D clay space: each story sits on a clay device in a deep green room (`js/workspace.js`, three.js in `js/vendor/`). It falls back to the carousel with no WebGL. |
| **Story hero** | Rebuilt as layers instead of one baked image: a CSS gradient, placed clay marks, and the device as its own transparent PNG (`css/story-hero2.css`, `js/story-hero2.js`, art in `assets/clay/`). |
| **Resume snapshot** | Section removed, along with its two nav entries. The timeline block in `js/main.js` now waits on its markup being on the page. |
| **Password** | Off. `window.__kcUnlocked = true` is set before `js/gate.js`, so every link opens straight into the work. |
| **Analytics** | Not loaded, so feedback visits stay out of the live Clarity numbers. |
| **Search** | Both pages carry `noindex`. |

Nothing else diverges: all the content still comes from `js/content.js`.

## Updating it

The build is assembled from the Portfolio working tree, so the way to change
anything is to change it there and copy the files across again, reapplying the
six differences above. Push to `main` and GitHub Pages redeploys in about a
minute; assets are cached for ten, so a change can take that long to show.
