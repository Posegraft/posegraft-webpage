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

/** trailing teaser item — render sites match on this to paint it accent blue */
export const MANY_MORE = 'And many more...'

export const BRANDS: Brand[] = [
  { name: 'Fairino', bundled: true },
  { name: 'ABB', bundled: false },
  { name: 'Universal Robots', bundled: false },
  { name: 'FANUC', bundled: false },
  { name: 'Yaskawa', bundled: false },
  { name: 'KUKA', bundled: false },
  { name: 'Dobot', bundled: false },
  { name: MANY_MORE, bundled: false },
]

export const CAD_FORMATS = ['STEP', 'STL', 'URDF', 'SDF', 'OBJ', 'glTF', 'DAE', 'WRL', 'IGES']

/**
 * Equipment library shown in the #equipment section (Mechanisms.tsx).
 * EDIT HERE to add/remove items. Mirrors roboviewer's "Add to Scene" catalog:
 *   grippers   → roboviewer/src/constants/robots.ts (AVAILABLE_GRIPPERS + PARAMETRIC_GRIPPERS)
 *   conveyors  → roboviewer/src/components/SceneTree.tsx (CONVEYOR_LIBRARY_ITEMS + static types)
 *   factory    → roboviewer/src/utils/factoryObjects.ts (FACTORY_OBJECT_DEFS)
 *   scene      → roboviewer/src/components/SceneTree.tsx (Scene tab)
 *   stations   → roboviewer/src/utils/stations/stationCatalog.ts (STATION_TEMPLATES)
 */
export const EQUIPMENT: { label: string; items: string[] }[] = [
  {
    label: 'Grippers',
    items: [
      'Parallel Gripper',
      'Vacuum Gripper',
      'Layer Gripper',
      'Welding Gun',
      MANY_MORE,
    ],
  },
  {
    label: 'Conveyors',
    items: [
      'Roller Conveyor',
      'Curved Conveyor',
      'Spiral Conveyor',
      'Telescopic Conveyor',
      'Incline Belt Conveyor',
      'Vertical Lift',
      'Bucket Elevator',
      MANY_MORE,
    ],
  },
  {
    label: 'Factory',
    items: [
      'Pallet',
      'Rack',
      'Bin',
      'Machine',
      'Fixture',
      'Vibro Sifter',
      'Welding Table',
      'Welding Curtain',
      'Fence Gate',
      'Part Tray',
      MANY_MORE,

    ],
  },
  {
    label: 'Scene items',
    items: ['Assembly', 'Warehouse', 'Box Object', 'Pedestal', 'Table', MANY_MORE],
  },
]

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
    line: 'know what the arm can reach before anything is bolted down.',
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
