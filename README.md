# PoseGraft Landing Page

Marketing landing page for [PoseGraft](../posegraft) — the robot simulation studio
built for AI agents and the humans who work with them.

Stack: Vite + React + TypeScript + Tailwind CSS 4. No router, single page.

## Run

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # static output in dist/
```

## 3D head asset

The half-human/half-robot bust uses the Lee Perry-Smith head scan by
[Infinite Realities](https://ir-ltd.net) (CC-BY, via the three.js examples),
stored in `public/models/LeePerrySmith/`.

## Demo videos

The "See it move" section has three video slots. Drop ~10 second `.mp4` clips into
`public/videos/` (see `public/videos/README.md` for the expected filenames). Missing
videos automatically show a styled "coming soon" placeholder.
