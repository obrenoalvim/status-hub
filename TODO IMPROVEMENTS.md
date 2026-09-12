# TODO Improvements

> Queued by an autonomous improvement pass. Sensitive/judgment-call items only —
> safe fixes (dead code removal, missing tests, docs/config polish) were applied directly.

### Remove unused `@testing-library/jest-dom` devDependency
- **Category:** Dependency
- **What:** `@testing-library/jest-dom` is listed in `package.json` devDependencies but no test file imports it (`import "@testing-library/jest-dom"` or its matchers never appear anywhere in the repo). All existing tests use plain RTL assertions (`.toBeTruthy()`, etc.).
- **Where:** `package.json`, `package-lock.json`
- **Why:** Unused dependency adds install time and lockfile noise for no benefit. Left queued rather than applied directly since removing a dependency touches the lockfile and was out of scope for a "safe changes only" pass.
- **Risk:** Low — grep confirms zero usages — but worth a second look in case it's meant to be wired up (e.g. via a missing `vitest.setup.ts` that extends `expect`) rather than actually dead.
- **Effort:** Low.

### Add tests for `DashboardPage` and `SelectPage`
- **Category:** Test
- **What:** `app/page.tsx` (polling/refresh loop, grouping, all-clear vs. incident summary bar) and `app/select/page.tsx` (search/filter, toggle, select-all, clear, save-and-navigate) are both shipped, non-trivial client components with zero test coverage. `lib/`, `components/ServiceIcon.tsx`, and now `components/StatusCard.tsx` are covered; these two page components are the main gap.
- **Where:** `app/page.tsx`, `app/select/page.tsx` (would add `app/page.test.tsx`, `app/select/page.test.tsx`)
- **Why:** These hold the app's actual interactive logic (polling interval, category grouping, localStorage-backed draft/save flow). Skipped in this pass because it requires mocking `fetch`, `next/navigation`'s `useRouter`, and fake timers for the polling interval — more setup than a mechanical addition, so it's queued as a scoped follow-up rather than rushed.
- **Risk:** None (additive).
- **Effort:** Medium.

### PWA manifest icon sizes
- **Category:** UI-UX
- **What:** `app/manifest.ts` only declares one icon (`64x64`). Common PWA install prompts expect at least a `192x192` and a `512x512` icon.
- **Where:** `app/manifest.ts`, `app/icon.tsx` (would need an additional larger `ImageResponse` route)
- **Why:** Improves "add to home screen" quality on Android/desktop; not urgent since the app is a dashboard, not an installed-first product.
- **Risk:** Low, purely additive.
- **Effort:** Low.
