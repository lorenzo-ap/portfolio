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

There are no tests and no test runner in this project. `pnpm build` (which runs `tsc --noEmit` first) is the closest thing to a verification step. Run it after non-trivial changes.

A lefthook `pre-commit` hook runs `lint-staged`, which runs `pnpx ultracite fix` on staged JS/TS/JSON/CSS/SCSS/MD files.

## What this site is

A conversion-focused personal site, not a CV. The positioning is: *Lorenzo builds custom software, internal tools and automation that solve business problems*, sold as outcomes rather than as a technology list. Every page ends in a contact CTA.

## Writing & copy standards

**These rules are binding for every piece of user-facing text in this repo**, in all three locales: headings, body copy, buttons, labels, eyebrows, navigation, page titles, meta descriptions, Open Graph text, JSON-LD, `aria-label`s, `title` attributes and image `alt` text. They also apply to any documentation written in this repo.

The target voice is **an experienced developer speaking plainly to a potential client**. Confident without trying to sound impressive. Not a copywriter, not an agency, not a LinkedIn post, not an AI trying to sound professional.

### 1. Sound human and specific, not generated

Write simple sentences with concrete detail. Contractions are fine and usually better. First person is fine. Say what actually happens rather than characterising it.

Bad: "An innovative AI-powered platform that delivers a seamless experience."
Good: "You describe what you want and you get an image. Everything you make stays in your account."

If a sentence could sit unchanged on 500 other developer portfolios, it is not good enough. Rewrite it with something only this site could say.

### 2. Never fabricate

No invented clients, metrics, revenue, user counts, results, performance numbers, dates, awards, testimonials, quotes or claims about scale. Copy may describe real work (what the situation was, what was built, what was hard) but must not assert outcomes that were never measured. If the repo does not establish something as true, do not write it as fact.

### 3. Banned phrasing

Do not use, and do not reach for near-variants of:

"I believe in", "I'm passionate about", "I bring", "unlock potential", "empowering businesses", "leveraging technology", "turning ideas into reality", "where technology meets", "seamlessly", "robust and scalable", "cutting-edge", "innovative solutions", "end-to-end solutions", "tailored solutions", "digital transformation", "drive growth", "streamline operations", "transform your business", "next-generation", "future-proof", "meaningful impact", "complex challenges", "unique needs", "at the intersection of", "more than just", "not just X, but Y", "whether you're X or Y", and "from X to Y" used as marketing rhetoric rather than a real range.

This is a default, not a word filter. If one of these is the plain factual word for something, it can stay.

### 4. No em dashes

**Never use the `—` character in user-facing copy or in documentation written here.** Do not swap every em dash for a comma either. Restructure the sentence: split it in two, use "because" or "so", or use a colon where a colon genuinely fits. Russian copy in particular tends to attract em dashes in `X — это Y` constructions; rewrite those as ordinary sentences.

Before finishing any copy work, run `grep -rn "—" src index.html CLAUDE.md` and clear every hit. The only legitimate occurrences in the repo are the ones in this section, which quote the character in order to ban it.

### 5. Watch the punctuation and the rhythm

Do not lean on semicolons, colons, parentheses, exclamation marks, rhetorical questions or slash-separated concepts. Vary sentence length. Avoid the generated-copy cadence of short, short, long explanatory sentence, tidy closer.

Be especially suspicious of **three-part parallel lists** and **symmetrical sentence pairs** ("Plenty of people can X. Fewer will Y."). One of those on a page is a flourish. Three is a tell. Concrete enumerations of real things are fine; rhetorical triples that exist to sound polished are not.

### 6. Stop when the point is made

Do not add a sentence explaining why the previous sentence matters. Over-explaining is one of the strongest signs of generated copy. Cut the closer.

### 7. Show the personality, don't assert it

The copy should leave the reader thinking Lorenzo is technically strong, comfortable with ambiguity, able to own a project and honest about tradeoffs. Get there through what is described. Never write "I'm a highly skilled problem solver" or any relative of it.

### 8. Don't repeat a beat across the page

The site has a few strong beats, such as "sometimes the answer isn't software and I'll say so". Each belongs in one or two places. Repeating it in six sections makes the whole page read as generated. When adding copy, check whether the point is already made elsewhere.

### 9. Keep the positioning

Business problem first, technology second. Do not drift back to a generic developer portfolio, a technology list, or CV-style writing.

### 10. Review before finishing

After any copy change:

1. `grep -rn "—" src index.html CLAUDE.md`. The only hits should be this section quoting the character.
2. Grep the locale files for the banned phrasing above.
3. Read the English copy start to finish as a business owner seeing it for the first time.
4. Flag any paragraph that reads as too polished, too symmetrical or too generic, and rewrite it.
5. Check every claim against what the repo actually establishes.
6. Confirm `en.json`, `ro.json` and `ru.json` are structurally identical.
7. Confirm `ro` and `ru` read naturally in their own language rather than tracking English sentence shapes.
8. Run `pnpm check` and `pnpm build`.

## Architecture

Single-page React 18 + Vite + TypeScript site, deployed to Vercel (`vercel.json` rewrites all paths to `/` for client-side routing).

**Shell:** `main.tsx` imports `./i18n` for its side effect before rendering `App`. `App.tsx` owns `BrowserRouter` and renders the persistent `Header`, `ScrollProgress` and `Footer` *outside* `AnimatePresence`, so only the route content cross-fades. `MotionConfig reducedMotion='user'` wraps everything. That is what makes the whole motion system respect `prefers-reduced-motion`, so don't bypass it with raw CSS transitions on large movements.

**Routes:** `/` (home), `/work`, `/about`, `*` (error). `/projects` is a permanent `<Navigate>` to `/work`. Keep it, old links point there.

The home page is Hero, Selected work, Capabilities, Positioning, Contact. Anything that explains how I work in detail lives on `/about` instead, so the home page stays a pitch and the about page is worth opening.

Each route element is wrapped in `<Page titleKey='…' descriptionKey='…'>`, which applies the page transition, renders the `#main` landmark, and calls `useSeo` (title, description, canonical and Open Graph tags, derived from the live origin so they're correct on any domain).

**Adding a page:** create it in `src/pages/`, export from `src/pages/index.ts`, add a `<Route>` whose element is a `<Page>` wrapper, and add the matching `pageTitles` / `meta` keys to all three locale files.

**Routes animate in and nothing animates out.** There's no `AnimatePresence` around the routes, on purpose. An exit transition makes the incoming page wait for the outgoing one, and anything that stops that outgoing animation completing leaves a page that has already faded to nothing sitting there permanently. That was a real intermittent blank screen. The entrance is what reads as a transition anyway, since every page header uncovers its headline word by word.

## Layout & design system

- `.shell` (in `index.scss`) is the page container, 1240px max plus a fluid `--shell-gutter`. Use it instead of ad-hoc `max-w-*` wrappers.
- `<Section>` adds the top hairline (which draws itself in on scroll) and the `--section-gap` vertical rhythm. `<SectionHeader>` is the editorial two-column header (statement left, supporting text right) used by most sections. Reuse it so sections stay on one grid.

**There are two typefaces doing two jobs.** IBM Plex Serif carries every statement on the site through the `.statement` class and the `<Statement>` component; IBM Plex Sans carries body and UI and never goes above `text-title`. IBM Plex Mono is reserved for eyebrows, labels, metadata and numbers. The size gap between the serif and the sans is most of the hierarchy, which is why sections rarely need a rule or a box to be readable.

Typography scale lives in `tailwind.config.ts` as named sizes: `text-display` (hero only), `text-statement` (section statements), `text-display-sm`, `text-headline`, `text-title`, `text-lede`, `text-body`, `text-body-sm`, `text-label`, `text-eyebrow`. Prefer these over one-off `text-[…]` for anything structural.

**Corners stay small.** `--radius-sm` through `--radius-xl` are 4/8/12/18px, and buttons are the only pill. The page is built from hairlines, type and whitespace rather than cards, so reach for a `.row` before reaching for a bordered box.

**Theming** is CSS-variable based. `src/index.scss` defines the palette on `html` and overrides it inside `html.dark`; `tailwind.config.ts` maps those variables to utility names (`text-text`, `bg-faded-bg`, `border-border`, `text-accent`, `text-wordmark`, …) with `darkMode: 'class'`. To add a theme colour, declare it in **both** blocks *and* register it in the Tailwind config.

**There is exactly one accent** (cobalt), expressed as `--accent` (text, icons, details), `--accent-solid` (fill behind white text), `--accent-strong` (hover), plus `--accent-line`, `--accent-soft` and `--accent-glow`. Don't introduce a second brand colour. The generated project posters take a `hue` in the 200-250 range so they stay in the same family. The accent is used for primary buttons, active nav, links on hover, index numbers, the availability dot, row hover rules, focus rings and selection, and nothing else.

**Interactive elements come in three tiers.** `.btn` (`ButtonLink`) is a real call to action; `.link-action` (`ActionLink`) is a standalone action that shouldn't shout, with an underline that draws in under the label and an icon that shifts; `.link` is an inline reference inside a paragraph. Reach for the smallest tier that fits, and don't hand-roll a fourth.

Three gotchas that have already caused bugs:

1. **Tailwind opacity modifiers don't work on these colours.** They're plain `var(--x)` values, so `bg-bg-color/80` produces nothing. Add an explicit token instead. That's why `--bg-translucent` and `--wordmark` exist.
2. **Custom classes live in `@layer components`.** `.btn`, `.link`, `.shell`, `.statement`, `.row` etc. are inside `@layer components` in `index.scss` so utilities like `hidden` and `w-full` still win. Because Tailwind tree-shakes that layer against source text, **never build those class names dynamically**, because `btn__${variant}` gets stripped. See `variantClass` in `Button.tsx`.
3. **`body` uses `overflow-x: clip`, not `hidden`.** `hidden` turns the body into a scroll container, and a scroll container that never scrolls silently kills every `position: sticky` inside it. The pinned work stage depends on that one word.

## Motion system

`src/lib/motion.ts` is the single source of easing, durations and variants (`fadeUp`, `uncover`, `wordStagger`, `ruleReveal`, `wipeUp`, `stagger`, `inView`). Everything decelerates on the same expo curve.

The site has one signature move: **type is uncovered, never faded in.**

- `<Statement>` (`src/components/Statement.tsx`) is every headline. It splits the string into words, gives each one its own clipping box, and releases them in sequence. `<StatementLine>` is the same idea for a line that must not rewrap, which is what the hero uses because its line breaks come from the locale files. Both fall back to a plain fade under `prefers-reduced-motion`, since a reveal made only of movement has nothing left once movement is off.
- `<Reveal>` / `<RevealGroup>` + `<RevealItem>` (`src/components/Reveal.tsx`) wrap the scroll-reveal pattern for everything that isn't a headline. Use them rather than hand-writing `whileInView`.
- `usePointerSpotlight` and `useMagnetic` write pointer position to CSS custom properties instead of React state, so cursor tracking never re-renders. Pair the first with `.spotlight`, the second with `.magnetic`.
- `useHeaderState` reads scroll position and direction in one listener and drives the header's three states.
- `<Cursor>` is a ring that trails the pointer and opens over anything actionable. It sits behind the real cursor, and it's off entirely without a fine pointer or under reduced motion.
- Keep entrances under ~0.9s and travel under ~28px.

**Three traps worth knowing before adding motion here:**

1. **A motion component nested inside a motion parent that has `variants` inherits that parent's animation state.** Giving the child its own `whileInView` does not reliably override it, and the symptom is an element stuck in its `hidden` state forever. Either let the child inherit (give it only `variants`) or keep it outside the parent's variant tree. This is why `<Page>` writes its transition as plain objects: it wraps every page, so making it a variant parent put the whole tree at its mercy.
2. **`style` motion values beat variant animations for the same property.** An element can't take a scroll-linked `y` from `style` and an entrance `y` from a variant; the scroll value wins and the entrance never plays. Split them across two nested elements. The hero poster does exactly this.
3. **Never put a clipping hidden state on the element `whileInView` is watching.** An IntersectionObserver measures the target's own clip, so an element sitting at `clip-path: inset(100% 0 0 0)` has no intersection area, is never reported as in view, and never receives the animation that would uncover it. It stays invisible for good, and because clip-path clips hit testing too, anything clickable inside it is unreachable. `wipeUp` is the variant this applies to: put it on a child and let the observed parent keep its box. `PosterFrame` is the worked example.

Scroll-linked transforms can't be softened, only removed, so every one of them is guarded with `useReducedMotion`.

## Content & i18n

Three locales (`en`, `ro`, `ru`) in `src/i18n/locales/*.json`, one `translation` namespace. English is the fallback and the source of truth for types: `src/i18n/i18next.d.ts` declares `CustomTypeOptions.resources.translation = typeof en`, and `src/types/i18n.ts` derives `PageTitleKey`, `CaseStudyKey`, `ProjectKindKey`, `CapabilityKey` and `ProcessStepKey` from the same JSON.

- Add the key to `en.json` **first**, then mirror it into `ro.json` and `ru.json`. The three files must stay structurally identical. Missing keys in `ro`/`ru` fall back silently with no type error.
- Rich text uses `<Trans>` with a `components` map (see `Positioning.tsx`); tag names like `<barca>` must match across all three files.
- Detection order is `localStorage` → `navigator`, cached under the `language` key; `src/i18n/index.ts` keeps `document.documentElement.lang` in sync.

**All user-facing copy is translated**, including `aria-label`s and page metadata. Only proper nouns stay in `src/data/`: project names, links, icons and hues.

## Adding work

`src/data/projects.ts` exports one list, `caseStudies`, in the order the story is told: real product, complex product, my own product, teaching. The piece that isn't software says so through its `kind`, not by living in a separate array.

To add a case study:

1. Add a `CaseStudyModel` to `caseStudies`. `hue` drives the generated poster and must stay in the 200-250 range.
2. Add `summary`, `situation`, `contribution`, `challenge`, `proof` and `role` under `work.cases.<key>` in **all three** locale files. The key is type-checked against `en.json`.
3. Optionally set `icon` (a file in `public/icons/`), `image`, `primaryLabelKey` and `secondaryLink`.
4. The home and work pages both say "four" in the copy. Change the counts in all three locales if the number of case studies changes.

`ProjectPoster` shows a real screenshot when `image` is set (put it in `public/`) and otherwise composes a poster from the product's own icon, its name in the editorial serif, and the address it lives at. It deliberately never mocks up a UI that doesn't exist, and it deliberately isn't dressed as a browser window.

**The home page shows the work as a pinned stage.** The poster column sticks while the four projects scroll past it, and each panel reports itself as active when it crosses the middle of the viewport (`WorkPanel` in `CaseStudy.tsx`). Below the pinning breakpoint there is no stage: each panel carries its own poster and the section degrades to four ordinary blocks. `/work` uses `CaseStudyArticle` instead, which tells the full Situation / What I did / Hard part / What this shows story under a full-width poster.

## Contact details

`src/data/site.ts` holds the name, email and social links; `mailto()` builds the prefilled enquiry links. Change the address there and every CTA follows.

## Code standards (Ultracite / Biome)

Formatting and most lint rules are enforced by Ultracite (a Biome preset). Run `pnpm fix` rather than hand-formatting. Project-specific overrides in `biome.jsonc`: **tabs**, 120-column lines, **single quotes** in both JS and JSX, **no trailing commas**. `useBlockStatements`, `useFilenamingConvention`, and `noBarrelFile` are disabled.

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
