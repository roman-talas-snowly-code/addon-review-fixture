# Reviews Rocket — dummy Shoptet addon (review-tooling fixture)

> ⚠️ **This repository is an intentionally broken test fixture.** The addon
> code is seeded with dozens of classic Shoptet-addon defects on purpose —
> XSS sinks, hardcoded secrets, core overwrites, GDPR violations, dead code,
> CSS leaks and more. **Never install or reuse any of this code on a real
> e-shop.** It exists solely to exercise the addon code-review tooling
> (the deterministic linter gate and the AI review skill from
> `shoptet/addon-repository-actions-config`).

## What is inside

A fake partner addon ("Reviews Rocket" — product review badges and widgets)
with a realistic repository layout:

```
src/
  main.js               legacy-script monolith (the bulk of the seeded findings)
  utils.js              shared helpers (duplication, dead exports, format bugs)
  modules/reviews.js    review rendering (XSS, missing guards, a11y)
  modules/slider.js     custom lightbox (core reimplementation, jQuery idioms)
  modules/analytics.js  tracking without consent, hardcoded API key
  modules/wishlist.js   empty leftover file
  old/main-backup.js    dead backup file full of commented-out code
  styles/               CSS/SCSS with isolation leaks, invalid values, broken file
  templates/promo.html  deprecated tags, missing alt, autoplay
dist/bundle.js          unminified "build" committed to the repo
package-lock.json       npm lockfile…
yarn.lock               …next to an empty yarn lockfile
```

The complete inventory of seeded defects — both the machine-measured linter
findings and the AI-only catalog findings — lives in
[GROUND-TRUTH.md](GROUND-TRUTH.md).

## How to use it

**Linter (deterministic gate):** from a checkout of
`shoptet/addon-repository-actions-config` (branch with `linter_review_tool/`):

```bash
node linter_review_tool/review.js /path/to/addon-review-fixture/src
```

**PR gate end-to-end:** the branch `clean-base` holds the repo skeleton
without the addon code. Open a pull request **from `main` into `clean-base`**
— the diff then contains exactly the seeded source files, and the
`.github/workflows/checks.workflow.yml` caller runs the reusable PR review
over it.

**AI review skill:** point the `st-addon-review` skill at this repository (or
at the PR above) and compare its output against `GROUND-TRUTH.md`.

## Baseline

Measured with `linter_review_tool` at `feature/linter-review-tool`
(commit `3e2e677`): **267 findings — 168 blockers, 99 recommendations —
across 50 distinct rules.** Exact per-rule counts are in
[GROUND-TRUTH.md](GROUND-TRUTH.md); expect drift if rule sets or thresholds
change.
