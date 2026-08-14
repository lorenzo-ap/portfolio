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

## Architecture

A single-page React 18 + Vite + TypeScript portfolio site, deployed to Vercel (`vercel.json` rewrites all paths to `/` for client-side routing).

**Rendering chain:** `main.tsx` imports `./i18n` for its side effect (i18next init) before rendering `App`. `App.tsx` owns `BrowserRouter` and wraps `<Routes>` in framer-motion's `AnimatePresence` (keyed on `location.pathname`) so route changes cross-fade. Every route element is wrapped in `<Page titleKey='…' withHeader?>`, which is the single place that applies the page-transition motion, sets `document.title` via `usePageTitle`, and renders the shared `Header`/`Footer`. Add a new page by creating it in `src/pages/`, exporting it from `src/pages/index.ts`, and adding a `<Route>` whose element is a `<Page>` wrapper with a `titleKey` that exists under `pageTitles` in the locale files.

**Barrel files are intentional.** `src/components/index.ts`, `src/pages/index.ts`, `src/hooks/index.ts`, and `src/types/index.ts` re-export everything, and Biome's `noBarrelFile` rule is turned off for this reason. Import from the barrel (`import { Page } from '../components'`), not the concrete file, when the barrel exists.

**Theming** is CSS-variable based, not Tailwind-palette based. `src/index.scss` defines `--text`, `--bg-color`, `--faded-text`, `--faded-line`, `--faded-bg`, `--subfaded-text` on `html`, overridden inside `html.dark`. `tailwind.config.ts` maps those variables to utility names (`text-text`, `bg-faded-bg`, `border-faded-line`, …) with `darkMode: 'class'`. So for theme-aware colors use the mapped Tailwind classes, and add a new theme color by declaring the variable in both `html` and `html.dark` blocks *and* registering it in `tailwind.config.ts`.

Theme state is split across two places: `useTheme()` (called once in `App`) reads `localStorage.theme`, defaults it to `dark`, and adds the class to `<html>`; `Footer` owns the light/dark toggle buttons and does the class swap + persistence itself. Both write the same `localStorage` key — keep them in sync if you touch either.

Accent link styles (`.link`, `.link__purple`, `.link__yellow`, `.link__barca`, …) are hand-written SCSS with animated gradient underlines — they live only in `index.scss` and are applied as plain `className` strings.

## i18n

Three locales — `en`, `ro`, `ru` — in `src/i18n/locales/*.json`, all sharing one `translation` namespace. English is the fallback and the source of truth for types.

Language detection order is `localStorage` → `navigator`, cached under the `language` key. `src/i18n/index.ts` also keeps `document.documentElement.lang` in sync on `languageChanged`.

**Translation keys are type-checked.** `src/i18n/i18next.d.ts` declares `CustomTypeOptions.resources.translation = typeof en`, so `t('…')` autocompletes and fails to compile on typos. `src/types/i18n.ts` derives `PageTitleKey` and `ProjectDescriptionKey` from the same JSON. Consequences when adding content:

- Add the key to `en.json` **first**, then mirror it into `ro.json` and `ru.json` — a key missing from `en.json` is a type error at every call site.
- Keep the three files structurally identical; missing keys in `ro`/`ru` silently fall back to English at runtime with no type error.
- Rich text uses `<Trans>` with a `components` map (see `src/pages/Home.tsx`) — the locale string contains tags like `<hl>`, `<me>`, `<barca>` that map to React elements. Tag names must match across all three locale files.

Note that all user-facing copy is translated, but data in `src/data/projects.ts` is not: project `name`, `link`, and `skills` are literals there, while the prose lives in the locales under `projects.items.*` and is referenced by a typed `descriptionKey`.

## Adding a project

`src/data/projects.ts` exports four arrays — `projects`, `clientProjects`, `hackathonProjects`, `misc` — each rendered as its own section in `src/pages/Projects.tsx`. To add an entry:

1. Push a `ProjectModel` into the right array. `skills` must use members of the `Skill` const object in `src/types/skill.ts` (extend it if the technology is new).
2. If it needs a description, add the copy under `projects.items.<key>` in all three locale files and set `descriptionKey: '<key>'` — the key is type-checked against `en.json`.
3. `hackathonLink` is optional and renders an extra link labelled by `projects.hackathonLink`.

`misc` entries are rendered with `isMisc`, which moves the skill chips inline next to the title instead of below the description.

## Code standards (Ultracite / Biome)

Formatting and most lint rules are enforced by Ultracite (a Biome preset) — run `pnpm fix` rather than hand-formatting. Project-specific overrides in `biome.jsonc`: **tabs**, 120-column lines, **single quotes** in both JS and JSX, **no trailing commas**. `useBlockStatements`, `useFilenamingConvention`, and `noBarrelFile` are disabled.

Conventions Biome will not catch but this codebase follows consistently:

- Const-object-plus-type instead of TS `enum` (`Skill`, `Theme`, `Language` in `src/types/`) — `export const X = {…} as const; export type X = (typeof X)[keyof typeof X];`
- Function components only, named exports (`export const Foo = …`), no default exports outside config files.
- Type-only imports use `import type`.
- Props interfaces are declared inline above the component, extending `PropsWithChildren` when children are accepted.
- SVG icons are inlined in JSX with a `<title>` sourced from `t(…)` for accessibility, and `fill='currentColor'` or `var(--text)` so they follow the theme.
- External links use `<Link target='_blank' to='…'>` from react-router-dom rather than raw `<a>`.
- Prefer `unknown` over `any`, optional chaining and `??`, `for...of` over `.forEach`, early returns over nested conditionals, and stable IDs over array indices for `key`.
- No `console.log`, `debugger`, or `alert` in committed code; `rel='noopener'` on any raw `target='_blank'` anchor; avoid `dangerouslySetInnerHTML`.
