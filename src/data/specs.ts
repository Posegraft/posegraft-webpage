/**
 * Spec-sheet data for the engineer-facing sections. Same idea as tools.ts:
 * one source of truth so brand lists, formats, and spec values cannot drift
 * between sections.
 */

export type Brand = {
  name: string
  /** True when a robot from this vendor ships in the box today —
      flips a supported/roadmap badge on later without touching components. */
  bundled: boolean
}

export const BRANDS: Brand[] = [
  { name: 'Fairino', bundled: true },
  { name: 'ABB', bundled: false },
  { name: 'Universal Robots', bundled: false },
  { name: 'FANUC', bundled: false },
  { name: 'Yaskawa', bundled: false },
  { name: 'KUKA', bundled: false },
  { name: 'Dobot', bundled: false },
]

export const CAD_FORMATS = ['STEP', 'STL', 'URDF', 'SDF', 'OBJ', 'glTF', 'DAE', 'WRL', 'IGES']

export type SpecRow = { label: string; value: string; note?: string }

export const SPEC_ROWS: SpecRow[] = [
  {
    label: 'Motion solving',
    value: '~200 IK solves / sec / robot',
    note: 'real-time drag, benchmark-backed',
  },
  {
    label: 'Robot library',
    value: BRANDS.map((b) => b.name).join(' · '),
    note: 'plus any URDF you import',
  },
  {
    label: 'CAD import',
    value: CAD_FORMATS.join(' · '),
    note: `${CAD_FORMATS.length} formats, drag and drop`,
  },
  {
    label: 'Runtime',
    value: '100% on your machine',
    note: 'no cloud, no account, no upload',
  },
  {
    label: 'Programming',
    value: 'Flow Builder — visual blocks',
    note: 'no code, flows run in parallel',
  },
  {
    label: 'Teaching',
    value: 'Teach targets · saved poses · saved joints',
    note: 'P to teach, I for the marker',
  },
  {
    label: 'Projects',
    value: 'portable .pg files',
    note: 'scene + logic + meshes in one archive',
  },
]

export type Plugin = { name: string; line: string }

export const PLUGINS: Plugin[] = [
  {
    name: 'Reach analysis',
    line: 'Workspace heat maps — know what the arm can reach before anything is bolted down.',
  },
  {
    name: 'Palletization',
    line: 'Pattern wizard — layers, interlocks, and repeatable pattern moves from a few inputs.',
  },
  {
    name: 'Welding',
    line: 'Seam path programming with approach vectors and torch angles.',
  },
  {
    name: 'Collision checking',
    line: 'Flag contacts between arm, tool, and cell geometry during a run.',
  },
  {
    name: 'Cycle-time reports',
    line: 'Per-flow timing from simulated runs — compare layouts by the numbers.',
  },
]
