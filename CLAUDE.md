# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (pinned to `pnpm@11.10.0` via `packageManager` + `.npmrc`); Node version is pinned in `.nvmrc` (24.11.1).

| Task | Command |
| --- | --- |
| Install | `pnpm install` |
| Dev server | `pnpm dev` |
| Typecheck + production build | `pnpm build` (`tsc && vite build`) |
| Preview the built bundle | `pnpm preview` |
| Lint/format check | `pnpm check` (Ultracite/Biome) |
| Auto-fix lint/format | `pnpm fix` |

There are no tests and no test runner in this project. `pnpm build` (which runs `tsc --noEmit` first) is the closest thing to a verification step — run it after non-trivial changes.

A lefthook `pre-commit` hook runs `lint-staged`, which runs `pnpx ultracite fix` on staged JS/TS/JSON/CSS/SCSS/MD files.

## What this site is

A conversion-focused personal site, not a CV. The positioning is: *Lorenzo builds custom software, internal tools and automation that solve business problems* — sold as outcomes, not as a technology list. Every page ends in a contact CTA.

**Never invent credibility.** No fabricated clients, metrics, testimonials, revenue, results or dates. Copy may frame real work (what the problem was, what was hard) but must not assert outcomes that weren't measured.

## Architecture

Single-page React 18 + Vite + TypeScript site, deployed to Vercel (`vercel.json` rewrites all paths to `/` for client-side routing).

**Shell:** `main.tsx` imports `./i18n` for its side effect before rendering `App`. `App.tsx` owns `BrowserRouter` and renders the persistent `Header`, `ScrollProgress` and `Footer` *outside* `AnimatePresence`, so only the route content cross-fades. `MotionConfig reducedMotion='user'` wraps everything — that is what makes the whole motion system respect `prefers-reduced-motion`, so don't bypass it with raw CSS transitions on large movements.

**Routes:** `/` (home), `/work`, `/about`, `*` (error). `/projects` is a permanent `<Navigate>` to `/work` — keep it, old links point there.

Each route element is wrapped in `<Page titleKey='…' descriptionKey='…'>`, which applies the page transition, renders the `#main` landmark, and calls `useSeo` (title, description, canonical and Open Graph tags, derived from the live origin so they're correct on any domain).

**Adding a page:** create it in `src/pages/`, export from `src/pages/index.ts`, add a `<Route>` whose element is a `<Page>` wrapper, and add the matching `pageTitles` / `meta` keys to all three locale files.

## Layout & design system

- `.shell` (in `index.scss`) is the page container — 1180px max plus a fluid `--shell-gutter`. Use it instead of ad-hoc `max-w-*` wrappers.
- `<Section>` adds the top hairline and the `--section-gap` vertical rhythm. `<SectionHeader>` is the editorial two-column header (statement left, supporting text right) used by every section — reuse it so sections stay on one grid.
- Typography scale lives in `tailwind.config.ts` as named sizes: `text-display`, `text-display-sm`, `text-headline`, `text-title`, `text-lede`, `text-eyebrow`. Prefer these over one-off `text-[…]` for anything structural.
- Body/UI is IBM Plex Sans; `font-mono` (IBM Plex Mono) is reserved for eyebrows, labels, metadata and numbers.

**Theming** is CSS-variable based. `src/index.scss` defines the palette on `html` and overrides it inside `html.dark`; `tailwind.config.ts` maps those variables to utility names (`text-text`, `bg-faded-bg`, `border-border`, `text-accent`, …) with `darkMode: 'class'`. To add a theme colour, declare it in **both** blocks *and* register it in the Tailwind config.

**There is exactly one accent** (cobalt), expressed as `--accent` (text, icons, details), `--accent-solid` (fill behind white text), `--accent-strong` (hover), plus `--accent-line`, `--accent-soft` and `--accent-glow`. Don't introduce a second brand colour. The generated project previews take a `hue` in the 200-250 range so they stay in the same family. The accent is used for primary buttons, active nav, links on hover, index numbers, the availability dot, focus rings and selection, and nothing else.

**Interactive elements come in three tiers.** `.btn` (`ButtonLink`) is a real call to action; `.link-action` (`ActionLink`) is a standalone action that shouldn't shout, with an underline that draws in under the label and an icon that shifts; `.link` is an inline reference inside a paragraph. Reach for the smallest tier that fits, and don't hand-roll a fourth.

Two gotchas that have already caused bugs:

1. **Tailwind opacity modifiers don't work on these colours.** They're plain `var(--x)` values, so `bg-bg-color/80` produces nothing. Add an explicit token instead — that's why `--bg-translucent` and `--wordmark` exist.
2. **Custom classes live in `@layer components`.** `.btn`, `.link`, `.shell` etc. are inside `@layer components` in `index.scss` so utilities like `hidden` and `w-full` still win. Because Tailwind tree-shakes that layer against source text, **never build those class names dynamically** — `btn__${variant}` gets stripped. See `variantClass` in `Button.tsx`.

## Motion system

`src/lib/motion.ts` is the single source of easing, durations and variants (`fadeUp`, `lineReveal`, `pageTransition`, `stagger`, `inView`). Everything decelerates on the same expo curve.

- `<Reveal>` / `<RevealGroup>` + `<RevealItem>` (`src/components/Reveal.tsx`) wrap the scroll-reveal pattern — use them rather than hand-writing `whileInView`.
- `usePointerSpotlight` writes pointer position to CSS custom properties instead of React state, so cursor tracking never re-renders. Pair it with `.spotlight` + `.grid-backdrop`.
- Keep entrances under ~0.8s and travel under ~28px.

## Content & i18n

Three locales — `en`, `ro`, `ru` — in `src/i18n/locales/*.json`, one `translation` namespace. English is the fallback and the source of truth for types: `src/i18n/i18next.d.ts` declares `CustomTypeOptions.resources.translation = typeof en`, and `src/types/i18n.ts` derives `PageTitleKey`, `CaseStudyKey`, `ArchiveDescriptionKey`, `ProjectKindKey`, `CapabilityKey` and `ProcessStepKey` from the same JSON.

- Add the key to `en.json` **first**, then mirror it into `ro.json` and `ru.json`. The three files must stay structurally identical — missing keys in `ro`/`ru` fall back silently with no type error.
- Rich text uses `<Trans>` with a `components` map (see `AboutTeaser.tsx`); tag names like `<barca>` must match across all three files.
- Detection order is `localStorage` → `navigator`, cached under the `language` key; `src/i18n/index.ts` keeps `document.documentElement.lang` in sync.

**All user-facing copy is translated.** Only proper nouns stay in `src/data/`: project names, links, skills and hues.

## Adding work

`src/data/projects.ts` exports `caseStudies` (narrative, strongest first — `featuredCaseStudies` takes the first three for the home page) and `archiveProjects` (compact list).

To add a case study:

1. Push a `CaseStudyModel`. `skills` must use members of the `Skill` const object in `src/types/skill.ts`. `hue` drives the generated preview.
2. Add `summary`, `problem`, `built`, `challenge` and `value` under `work.cases.<key>` in **all three** locale files — the key is type-checked against `en.json`.
3. Optionally set `secondaryLink` (`hackathonLink` or `sourceLink` label) and `image`.

`ProjectVisual` shows a real screenshot when `image` is set (put it in `public/`) and otherwise renders a generated composition inside a browser frame. It deliberately never mocks up a UI that doesn't exist.

## Contact details

`src/data/site.ts` holds the name, email and social links; `mailto()` builds the prefilled enquiry links. Change the address there and every CTA follows.

## Code standards (Ultracite / Biome)

Formatting and most lint rules are enforced by Ultracite (a Biome preset) — run `pnpm fix` rather than hand-formatting. Project-specific overrides in `biome.jsonc`: **tabs**, 120-column lines, **single quotes** in both JS and JSX, **no trailing commas**. `useBlockStatements`, `useFilenamingConvention`, and `noBarrelFile` are disabled.

Barrel files are intentional: `src/components/index.ts`, `src/pages/index.ts`, `src/hooks/index.ts` and `src/types/index.ts` re-export everything. Import from the barrel when one exists.

Conventions Biome will not catch but this codebase follows consistently:

- Const-object-plus-type instead of TS `enum` (`Skill`, `Theme`, `Language` in `src/types/`).
- Function components only, named exports (`export const Foo = …`), no default exports outside config files.
- Type-only imports use `import type`.
- Props interfaces are declared inline above the component, extending `PropsWithChildren` when children are accepted.
- SVG icons live in `src/components/icons.tsx`, always carry a `<title>`, and use `fill='currentColor'` so they follow the theme.
- External links use `<Link target='_blank' to='…'>` from react-router-dom; `mailto:` uses a plain `<a>`.
- Prefer `unknown` over `any`, optional chaining and `??`, `for...of` over `.forEach`, early returns over nested conditionals, and stable IDs over array indices for `key`.
- No `console.log`, `debugger`, or `alert` in committed code; avoid `dangerouslySetInnerHTML`.
