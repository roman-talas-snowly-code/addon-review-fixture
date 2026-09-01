# Ground truth — seeded defects

Inventory of every defect deliberately seeded into this fixture. Two layers:

1. **Linter findings** — measured empirically by running
   `linter_review_tool/review.js` (branch `feature/linter-review-tool`,
   commit `3e2e677`) over `src/`. Deterministic; re-run to re-verify.
2. **AI-catalog findings** — seeds targeting the `st-addon-review` rules
   catalog (`catalog_version: 2026-07-28`, IDs A–J, P) that the deterministic
   linter intentionally does not gate on.

This file lives in the repo-skeleton commit (`main`, the merge-base of the
test PR), so the PR `feature/reviews-rocket → main` contains only the seeded
code, not this inventory.

## 1. Linter baseline (measured: 267 findings — 168 ❌ blockers, 99 ⚠️)

> **PR-gate view (verified E2E 2026-09-01, tool merged to `main`):** the CI
> reconcile step reports **264 findings — 167 ❌, 97 ⚠️** on PR #1. The delta
> of 3 vs. the raw linter output is the *documented* fingerprint collapse
> (the column is deliberately not part of a finding's identity, so same
> rule + same message on the same line merge into one comment): `eqeqeq` ×2
> on main.js:156 (−1 ❌) and `camelcase` ×2 on main.js:155 and :222 (−2 ⚠️).
> Delivery verified: REQUEST_CHANGES verdict, 100 inline comments (cap) in
> 4 chunks, full table in the run Summary.

| Rule | Count | Severity | Where (main anchors) |
|---|---|---|---|
| `no-var` | 65 | ❌ | main.js, old/main-backup.js |
| `no-implicit-globals` | 36 | ❌ | main.js (top-level vars/functions, script mode) |
| `prefer-template` | 31 | ⚠️ | all JS — HTML built by `+` concatenation |
| `eqeqeq` | 25 | ❌ | main.js, utils.js (`==` everywhere) |
| `camelcase` | 20 | ⚠️ | `settings_cache`, `badge_count`, `debounce_helper`, `wait_ms`… |
| `shoptet/no-czech-comments` | 12 | ⚠️ | main.js, main-backup.js (diacritics ě/š/č/ř/ž/ů) |
| `declaration-no-important` | 7 | ⚠️ | widget.css, theme-overrides.scss |
| `no-console` | 6 | ❌ | main.js, analytics.js |
| `html/deprecated-tag` | 5 | ⚠️ | promo.html: `<center>`, `<font>`, `<big>`, `<marquee>`, `<strike>` |
| `shoptet/no-redundant-checks` | 3 | ⚠️ | main.js `typeof shoptet/dataLayer` |
| `shoptet/no-pt-unit` | 3 | ⚠️ | widget.css `13pt`, scss `26pt`, print.css `10pt` **outside** `@media print` (the `11pt` inside print is a control — must NOT flag) |
| `shoptet/min-font-size` | 3 | ⚠️ | 9px/8px (widget.css), 10px (scss) |
| `shoptet/no-testid-selector` | 3 | ❌ | main.js, reviews.js, widget.css `[data-testid=…]` |
| `shoptet/no-core-overwrite` | 3 | ❌ | `shoptet.helpers.updateCartCount =`, `Object.assign(shoptet.config,…)`, `shoptet.initColorBox =` |
| `no-unused-vars` | 3 | ❌ | reviews.js unused imports (`formatPrice`, `stripHtml`, `render`) |
| `shoptet/max-z-index` | 2 | ⚠️ | widget.css 99999, 100000 |
| `radix` | 2 | ⚠️ | `parseInt` without radix (main.js, utils.js) |
| `valid-typeof` | 2 | ❌ | `'strnig'` (main.js), `'undefinde'` (reviews.js) |
| `no-redeclare` | 2 | ❌ | main.js `var config` twice |
| `no-dupe-keys` | 2 | ❌ | main.js `summary.total`, reviews.js `SORT_MODES.newest` |
| `max-depth` | 2 | ❌ | main.js `processReviewData` (5 levels) |
| `a11y/img-alt` | 2 | ❌ | promo.html `<img>` without `alt` |
| `shoptet/prefer-fetch` | 1 | ⚠️ | main.js `new XMLHttpRequest()` |
| `prefer-const` | 1 | ⚠️ | utils.js `let formatted` |
| `no-useless-concat` | 1 | ⚠️ | main.js `'badge' + '-link'` |
| `no-mixed-spaces-and-tabs` | 1 | ⚠️ | main.js `relayout` |
| `no-extend-native` | 1 | ⚠️ | main.js `String.prototype.rrStripDiacritics` |
| `no-duplicate-selectors` | 1 | ⚠️ | widget.css `.rr-badges` twice |
| `no-duplicate-at-import-rules` | 1 | ⚠️ | scss `@import 'widget.css'` twice |
| `max-statements` | 1 | ⚠️ | main.js `processReviewData` |
| `max-lines-per-function` | 1 | ⚠️ | main.js `processReviewData` (>50) |
| `max-lines` | 1 | ⚠️ | main.js (>400 code lines) |
| `complexity` | 1 | ⚠️ | main.js `processReviewData` |
| `use-isnan` | 1 | ❌ | main.js `average === NaN` |
| `shoptet/no-settimeout-hack` | 1 | ❌ | main.js `setTimeout(fn, 0)` |
| `shoptet/no-global-console` | 1 | ❌ | main.js `window.console.log` |
| `shoptet/es-module-required` | 1 | ❌ | main.js (fails module parse via dupe args, parses as script) |
| `no-unused-expressions` | 1 | ❌ | main.js `config.debug;` |
| `no-unreachable` | 1 | ❌ | main.js code after `return` |
| `no-script-url` | 1 | ❌ | main.js `link.href = 'javascript:void(0)'` |
| `no-param-reassign` | 1 | ❌ | utils.js `getCurrencySymbol` reassigns `code` |
| `no-implied-eval` | 1 | ❌ | main.js `setTimeout('rrInitAll()', 250)` |
| `no-global-assign` | 1 | ❌ | main.js `shoptet = {}` |
| `no-func-assign` | 1 | ❌ | main.js `initBadges = null` |
| `no-eval` | 1 | ❌ | main.js `getSetting` → `eval('config.' + key)` |
| `no-dupe-args` | 1 | ❌ | main.js `mergeReviews(list, list)` |
| `no-const-assign` | 1 | ❌ | reviews.js `API_URL` reassigned |
| `max-nested-callbacks` | 1 | ❌ | slider.js `bindThumbnails` (4 nested) |
| `color-no-invalid-hex` | 1 | ❌ | widget.css `#ffgg00` |
| `CssSyntaxError` | 1 | ❌ | broken.css (unclosed brace — fail-closed path) |

**Known deliberate linter false negatives** (design decisions of the tool,
useful as regression checks):

- `main.js` unused vars (`overlay`, `lastWidth`, `temp`) are **not** reported —
  the tool drops `no-unused-vars` for files without module syntax (script
  globals may be wired from HTML). The AI review must catch them (F2).
- `old/main-backup.js` and `modules/wishlist.js` get **no**
  `shoptet/es-module-required` — they parse fine as modules; the blocker fires
  only on files that *fail* the module parse. Their legacy/dead status is an
  AI finding (F2/G3).
- `reviews.js` `normalizeReview` mutates parameter **properties** — not
  flagged (`no-param-reassign` runs with `props: false`); AI-side A3.
- `dist/bundle.js` is skipped by the linter (`dist/**` ignore) — its findings
  (F5/G1) are CI/AI-side.

## 2. AI-catalog seeds (rules the linter does not decide)

### A — Security
- **A1 ❌** reviews.js `renderReviewList`/`renderSummary`: API review fields
  (`author`, `text`, `photoUrl`, `videoUrl`, `sourceUrl`) concatenated into
  `innerHTML` — untrusted source, cross-user surface.
- **A1 ❌** main.js `renderBadge` (+= into `innerHTML`), `buildTooltip`.
- **A1 ⚠️** utils.js `stripHtml`: "sanitizer" assigns untrusted input to a
  detached div's `innerHTML` (`<img onerror>` still fires).
- **A2 ❌** reviews.js `getProductCodeFromUrl`: `match(...)[1]` throws on any
  non-matching URL, breaking `init()`.
- **A2 ❌** main.js `getProductPrice`/`getProductCode`: unguarded
  `.textContent` on possibly-null query results in the init flow.
- **A3 ⚠️** reviews.js `normalizeReview` mutates its input (props).
- **A4 ❌** analytics.js hardcoded `API_KEY` (`rr_live_…` — fake value, but
  the pattern is what secret-scan/AI must flag).
- **A5 ⚠️** `target="_blank"` without `rel="noopener noreferrer"`:
  reviews.js source link, promo.html footer links.

### B — Shoptet integration
- **B1 ❌** main.js `detectLanguage` (html lang + sniffing the cart-button
  text "Košík"), `detectPageType` (body-class switch), `getProductCode`,
  `getProductPrice` — all available via `getShoptetDataLayer()`.
- **B2 ⚠️** custom breakpoints 550/767/1020/1380 (main.js `BREAKPOINTS`,
  widget.css media queries) instead of Shoptet breakpoints.
- **B4 ⚠️** `typeof shoptet/dataLayer` guards (linter catches the mechanical
  part; AI judges the pattern).
- **B5 ❌** main.js: `waitForCore` polling via `setTimeout(…, 50)`,
  `setTimeout(fn, 0)` hack, `setTimeout('rrInitAll()', 250)` at parse time,
  `bindEvents` re-registers `ShoptetDOMContentLoaded` inside its own handler
  (non-idempotent, listener pileup), `watchCart` polls the cart DOM with
  `setInterval` instead of `ShoptetDOMCartContentLoaded`.
- **B6 ❌** core overwrites (see linter) + **B6 ⚠️** slider.js reimplements
  the gallery/colorbox Shoptet already ships (category overlap — adds a badge
  overlay, so ⚠️ per the gate, not ❌).
- **B7 ❌** `[data-testid=…]` binding in JS and CSS (linter catches all 3).
- **B8 ❌** widget.css bare-element selectors (`a`, `button`, `body`
  font-family override); theme-overrides.scss `!important` on eshop theme
  classes (`.header`, `.cart-count`, `.price-final strong`); z-index war
  (99999/100000); main.js `window.dispatchEvent(new Event('resize'))`;
  main.js `shoptet.helpers.updateCartCount` rewrites an eshop element's text.
- **B8 ⚠️** slider.js document-level `keydown` handler added per lightbox
  open and never removed.

### C — Structure
- **C1 ❌** main.js: 400+-line monolith mixing API calls, rendering, carousel,
  cart watching, storage and core overwrites (unreviewable-mix gate, not mere
  length).
- **C2 ⚠️** `processReviewData` (statements/complexity/length),
  `detectPageType` switch hell.
- **C3 ❌/⚠️** duplicated functions: `formatDateCZ` ≡ `formatDateSK`
  (main.js), `formatPriceCZK` ≈ `formatPriceEUR` (utils.js),
  `slideNext` ≈ `slidePrev` (slider.js).
- **C5 ⚠️** scattered `var` declarations, loop-body work in `watchCart`.
- **C6 ⚠️** slider.js module-level pseudo-object `slider` standing in for a
  class.

### D — Scope & dependencies
- **D3 ⚠️** main.js shares state via globals (`config`, `settings_cache`,
  `badge_count`) instead of parameters.
- **D4 ❌** generic, unprefixed names: localStorage keys `settings`,
  `lastSync` (main.js), `uid` (analytics.js); element ids `overlay`
  (slider.js), `tooltip` (main.js).

### E — JS best practices
- **E3 ⚠️** slider.js `bindThumbnails`: repeated `$(this)`, `.each` in `.each`.
- **E5 💡** unthrottled `resize` (main.js), `scroll` (slider.js parallax,
  analytics.js scroll tracking) — while an unused `debounce_helper` sits in
  utils.js.
- **E6 ⚠️** listener accumulation: `openLightbox` keydown, `bindEvents`
  self-rebinding, `bindThumbnails` re-binding clicks.
- **E7 ⚠️** localStorage without try/catch: main.js `loadSettings`/
  `saveSettings`, analytics.js `getVisitorId`.
- **E8 ⚠️** reviews.js `fetchReviews` ignores `res.ok`; analytics.js only
  `.catch(console.error)`; main.js XHR non-200 → `console.log`.
- **E10 ⚠️** magic numbers: 30000, 3200, 2400, 280, 180, 120, 0.02, 250, 50…
- **E11 💡** utils.js `render()` computes an average (renders nothing);
  main.js `waitForCore` calls **undefined `startAddon()`** (genuine crash —
  also a correctness bug the AI must surface); `formatDateCZ`/`SK` names
  promise a difference that does not exist.

### F — Production cleanliness
- **F1 ❌** commented-out `renderBadgeOld` block (main.js);
  old/main-backup.js is ~all commented-out code.
- **F2 ❌** dead file old/main-backup.js; empty modules/wishlist.js; unused
  vars `overlay`/`lastWidth`/`temp` (main.js — linter FN by design, see §1);
  dead exports `formatPriceEUR`, `debounce_helper`, `legacySupport`
  (utils.js).
- **F4 ⚠️** errors go to the visitor's console (analytics.js `.catch`),
  no error-reporting channel.
- **F5 ❌** `dist/` committed; **F5 ⚠️** empty `yarn.lock`, empty
  `wishlist.js`.
- **F6 💡** two lockfiles (`package-lock.json` + empty `yarn.lock`); unused
  deps `lodash`, `moment` (and `jquery` — the eshop provides jQuery globally,
  the npm dep is never imported).

### G — Build & tooling
- **G1 ❌** `npm run build` just concatenates (`cat … > dist/bundle.js`), no
  minification; unminified dist/bundle.js committed.
- **G3 ❌** main.js is a legacy script; the build depends on file
  concatenation order (main → utils → modules).
- **G5 ⚠️** foreign CDN (`cdn.snowly.dev`): @font-face in widget.css, images
  in promo.html, runtime script injection in analytics.js
  `loadHeatmapLibrary`, promo video.

### H — CSS (AI part beyond stylelint)
- **H1 ⚠️** widget.css `.price-old { display: none; width: 200px }`;
  inline `style="font-size: 9px"` in promo.html.

### I — Localization
- **I2 ❌** single-language hardwired texts: main.js `TEXTS` (40+ Czech
  strings), Czech literals in reviews.js and promo.html — no translation
  layer.
- **I4 ❌** utils.js `formatPrice` hardcodes Czech format + `Kč`; main.js
  `parsePrice` assumes `1 234,50 Kč` (breaks on `1,234.50 $` etc.);
  utils.js `parseDiscount`.

### J — Accessibility
- **J1 ❌** clickable `<div>`s: promo.html `onclick` cards, slider.js
  prev/next divs, reviews.js `onclick` review rows — no role/tabindex/
  keyboard support.
- **J2 ❌** `<video autoplay>` without controls/pause (reviews.js, promo.html);
  JS-built `<img>` tags without `alt` (reviews.js, slider.js — the HTML
  linter only sees .html files, so these are AI-side).

### P — Privacy / GDPR
- **P1 ❌** analytics.js: persistent visitor UUID in localStorage (`uid`),
  behavioral events (pageview, clicks, scroll) with URL + referrer sent to an
  external collector, heatmap library injection — no `shoptet.consent` check
  anywhere.

## Non-findings seeded as controls

Patterns that look suspicious but must **not** be reported (false-positive
bait):

- print.css `11pt` inside `@media print` — pt is correct there.
- reviews.js `counter !== null` — strict comparison, fine.
- utils.js `let out` is genuinely reassigned — `prefer-const` must not fire.
- eqeqeq: no `== null` guards were seeded (the tool ignores them); every
  seeded `==` is a real finding.
- slider.js listening on `document`/`window` per se is allowed — the finding
  is the accumulation/scope, not the listening itself (B8 gate NO-branch).
