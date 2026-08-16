# PoseGraft Landing Page

Marketing landing page for [PoseGraft](../posegraft) — the robot simulation studio
built for AI agents and the humans who work with them.

Stack: Vite + React + TypeScript + Tailwind CSS 4. No router, single page.

## Run

```bash
npm install
npm run dev          # local preview at http://localhost:5173
npm run build        # static output in dist/
npm run check:theme  # WCAG AA contrast audit of both themes (dev server must be up)
```

## Theming

Light/dark via the `html.dark` class — semantic tokens are remapped in
`src/index.css`, toggled from the nav, defaulting to the OS preference and
persisted in `localStorage` (`src/theme.ts`, boot script in `index.html`).

## Hero screenshot

The hero uses `public/studio.png`. The current capture shows a near-empty scene —
replace it with a screenshot of a populated workcell when one exists (same filename,
no code change needed).
